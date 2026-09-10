import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const read=p=>fs.readFile(p,'utf8');
const walk=async d=>(await Promise.all((await fs.readdir(d,{withFileTypes:true})).map(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]))).flat();
const files=await walk('theme');
for(const p of files){if(p.endsWith('.json'))JSON.parse(await read(p));if(p.endsWith('.liquid')){const s=await read(p);const schema=s.match(/{% schema %}([\s\S]*?){% endschema %}/);if(schema)JSON.parse(schema[1]);}}
const settings=JSON.parse(await read('theme/config/settings_data.json')).current;
assert.equal(settings.sale_mode,'waitlist','Repository baseline must remain in waitlist mode');
for(const key of ['commerce_ready','newsletter_ready','preorder_ready','contact_ready'])assert.equal(settings[key],false,`${key} requires a documented launch decision before changing this check`);
assert.equal(settings.concept_mode,true);
const definitions=JSON.parse(await read('content/metaobject-definitions.json'));
assert.equal(definitions.find(x=>x.type==='ost_rights_record').access.storefront,'NONE');
for(const d of definitions.filter(x=>x.type!=='ost_rights_record'))assert(!d.fieldDefinitions.some(f=>f.key.startsWith('rights_')||f.key==='consent_reference'),'Private rights fields must not be public');
const products=JSON.parse(await read('content/products.json'));
assert.equal(new Set(products.map(p=>p.handle)).size,products.length);
assert(products.every(p=>p.price>0&&p.sizes.length));
const productMaster=JSON.parse(await read('content/product-master.json'));
assert.equal(productMaster.currency,'EUR');
assert.equal(productMaster.assumptions.vat_rate,0.19);
assert.equal(new Set(productMaster.products.map(p=>p.internal_product_id)).size,productMaster.products.length);
assert.equal(new Set(productMaster.products.map(p=>p.handle)).size,productMaster.products.length);
assert(productMaster.products.every(p=>p.variants.length&&p.retail_price_gross>0));
assert(productMaster.products.every(p=>['IDEA','SOURCING','SAMPLE','APPROVED','WAITLIST','PREORDER','LIVE','SOLD OUT','ARCHIVED'].includes(p.status)));
assert(productMaster.products.every(p=>['waitlist','preorder','live','sold_out','archived'].includes(p.sale_mode)));
for(const product of products){const master=productMaster.products.find(p=>p.handle===product.handle);assert(master,`Missing master row for ${product.handle}`);assert.equal(product.price,Math.round(master.retail_price_gross*100),`Price mismatch for ${product.handle}`);}
const pages=JSON.parse(await read('content/pages.json'));assert.equal(new Set(pages.map(p=>p.handle)).size,pages.length);
assert(pages.every(p=>p.isPublished===false),'Source import pages should be drafts');
const productTemplate=await read('theme/sections/ost-product.liquid');
assert(productTemplate.includes("mode == 'preorder'"));assert(productTemplate.includes("mode == 'sold_out'"));assert(productTemplate.includes("mode == 'archived'"));assert(productTemplate.includes("when '@app'"));
assert(productTemplate.includes("settings.commerce_ready == false"));
for(const f of files.filter(p=>/\.(liquid|js|json|css)$/.test(p))){const s=await read(f);assert(!/(?:shpat_|shpca_|ghp_)[A-Za-z0-9]{20,}/.test(s),`Potential credential in ${f}`);}
console.log(`Project checks passed: ${files.length} theme files, ${products.length} product concepts, ${pages.length} pages, private rights schema.`);
