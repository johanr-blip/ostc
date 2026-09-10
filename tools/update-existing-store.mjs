import fs from "node:fs/promises";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const apply = process.argv.includes("--apply");
const root = process.cwd();
const store = JSON.parse(await fs.readFile("config/store.json", "utf8"));
const resources = JSON.parse(await fs.readFile("config/shopify-resources.json", "utf8"));
const master = JSON.parse(await fs.readFile("content/product-master.json", "utf8"));
const productCopy = JSON.parse(await fs.readFile("content/products.json", "utf8"));
const pages = JSON.parse(await fs.readFile("content/pages.json", "utf8"));
const queryDir = path.join(root, "tools");
const workDir = path.join(root, "work", "store-update");
const cli = path.join(root, "node_modules", ".bin", "shopify");
const productPlans = productCopy.map(copy => {
  const plan = master.products.find(product => product.handle === copy.handle);
  const remote = resources.products[copy.handle];
  if (!plan || !remote) throw new Error("Missing product mapping for " + copy.handle);
  if (plan.shopify_product_id !== remote.id) throw new Error("Conflicting product ID for " + copy.handle);
  const variants = plan.variants.map(variant => {
    if (!variant.shopify_variant_id) throw new Error("Missing Shopify variant ID for " + variant.internal_sku);
    return { id: variant.shopify_variant_id, price: String(plan.retail_price_gross.toFixed(2)) };
  });
  return { handle: copy.handle, id: remote.id, descriptionHtml: copy.description, variants };
});
const pagePlans = pages.map(page => {
  const remote = resources.pages[page.handle];
  if (!remote) throw new Error("Missing page mapping for " + page.handle);
  return {
    id: remote.id,
    page: {
      title: page.title,
      body: page.body,
      templateSuffix: page.templateSuffix || null,
      isPublished: false
    }
  };
});

if (!apply) {
  console.log(JSON.stringify({
    mode: "dry-run",
    store: store.store,
    products: productPlans.length,
    variants: productPlans.reduce((sum, product) => sum + product.variants.length, 0),
    pages: pagePlans.length,
    metafield_definition: resources.metafields.sale_mode.id,
    note: "Run with --apply only after Shopify store authorization succeeds."
  }, null, 2));
  process.exit(0);
}

await fs.mkdir(workDir, { recursive: true });
let operation = 0;
function execute(queryName, variables) {
  operation += 1;
  const variableFile = path.join(workDir, String(operation).padStart(2, "0") + "-" + queryName + "-variables.json");
  const outputFile = path.join(workDir, String(operation).padStart(2, "0") + "-" + queryName + "-output.json");
  writeFileSync(variableFile, JSON.stringify(variables ?? {}, null, 2));
  const args = [
    "store", "execute",
    "--store", store.store,
    "--query-file", path.join(queryDir, queryName + ".graphql"),
    "--json",
    "--output-file", outputFile,
    "--version", store.api_version
  ];
  if (variables) args.push("--variable-file", variableFile);
  const query = requireQuery(queryName);
  if (query.includes("mutation")) args.push("--allow-mutations");
  const result = spawnSync(cli, args, {
    cwd: root,
    encoding: "utf8",
    env: {
      ...process.env,
      SHOPIFY_CLI_AGENT_INFO: "n:Codex|v:desktop|p:OpenAI",
      SHOPIFY_CLI_AGENT_IDS: "s:01a08b8e-fb4d-7130-8546-ddfe11a1148f|r:ostolz-complete|i:root"
    }
  });
  if (result.status !== 0) throw new Error(result.stdout + result.stderr);
  return JSON.parse(requireOutput(outputFile));
}
function requireQuery(queryName) {
  return requireText(path.join(queryDir, queryName + ".graphql"));
}
function requireOutput(outputFile) {
  return requireText(outputFile);
}
function requireText(file) {
  return readFileSync(file, "utf8");
}
function checkPayload(response, key) {
  if (response.errors?.length) throw new Error(JSON.stringify(response.errors));
  const payload = response.data?.[key];
  if (!payload) throw new Error("Missing payload " + key);
  if (payload.userErrors?.length) throw new Error(JSON.stringify(payload.userErrors));
  return payload;
}

const current = execute("read");
const currentData = current.data ?? current;
for (const product of productPlans) {
  const found = currentData.products.nodes.find(item => item.id === product.id);
  if (!found || found.status !== "DRAFT") throw new Error("Refusing product update outside known DRAFT product: " + product.handle);
}
for (const pagePlan of pagePlans) {
  const found = currentData.pages.nodes.find(item => item.id === pagePlan.id);
  if (!found || found.isPublished) throw new Error("Refusing page update outside known unpublished page: " + pagePlan.id);
}

for (const product of productPlans) {
  checkPayload(execute("productUpdateDetails", { product: { id: product.id, descriptionHtml: product.descriptionHtml } }), "productUpdate");
  checkPayload(execute("productVariantsBulkUpdate", { productId: product.id, variants: product.variants }), "productVariantsBulkUpdate");
}
for (const page of pagePlans) checkPayload(execute("pageUpdate", page), "pageUpdate");
checkPayload(execute("metafieldDefinitionUpdate", {
  definition: {
    id: resources.metafields.sale_mode.id,
    validations: [{
      name: "choices",
      value: JSON.stringify(["waitlist", "preorder", "live", "sold_out", "archived"])
    }]
  }
}), "metafieldDefinitionUpdate");

console.log(JSON.stringify({
  mode: "applied",
  products: productPlans.length,
  variants: productPlans.reduce((sum, product) => sum + product.variants.length, 0),
  pages: pagePlans.length,
  sale_modes: ["waitlist", "preorder", "live", "sold_out", "archived"]
}, null, 2));
