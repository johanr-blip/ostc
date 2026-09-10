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
const pages=JSON.parse(await read('content/pages.json'));assert.equal(new Set(pages.map(p=>p.handle)).size,pages.length);
assert(pages.every(p=>p.isPublished===false),'Source import pages should be drafts');
const productTemplate=await read('theme/sections/ost-product.liquid');
assert(productTemplate.includes("mode == 'preorder'"));assert(productTemplate.includes("when '@app'"));
assert(productTemplate.includes("settings.commerce_ready == false"));
for(const f of files.filter(p=>/\.(liquid|js|json|css)$/.test(p))){const s=await read(f);assert(!/(?:shpat_|shpca_|ghp_)[A-Za-z0-9]{20,}/.test(s),`Potential credential in ${f}`);}
console.log(`Project checks passed: ${files.length} theme files, ${products.length} product concepts, ${pages.length} pages, private rights schema.`);
