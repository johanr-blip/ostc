import fs from 'node:fs/promises';import path from 'node:path';import assert from 'node:assert/strict';
const root=path.resolve('preview/dist');
const walk=async d=>(await Promise.all((await fs.readdir(d,{withFileTypes:true})).map(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]))).flat();
const pages=(await walk(root)).filter(p=>p.endsWith('index.html'));let references=0;
for(const p of pages){const html=await fs.readFile(p,'utf8');
 assert.equal((html.match(/<h1[ >]/g)??[]).length,1,`One h1 expected: ${p}`);
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length,`Duplicate IDs: ${p}`);
 assert(!/<form\b[^>]*action="(?:\/contact|\/cart\/add)/.test(html),'Preview must not submit real customer/cart forms');
 assert(!/<input\b[^>]*type="email"/.test(html),'Disabled preview must not collect emails');
 assert(!html.includes('name="checkout"'),'Preview must not offer checkout');
 assert(html.includes('noindex,nofollow'));
 for(const m of html.matchAll(/\b(?:href|src)="([^"]*)"/g)){
  const value=m[1];if(!value.startsWith('/')||value.startsWith('//'))continue;
  const [url,hash]=value.split('#');const clean=url.split('?')[0];let target=path.join(root,clean);if(!path.extname(target))target=path.join(target,'index.html');
  await fs.access(target).catch(()=>{throw new Error(`Missing reference ${value} in ${p}`)});references++;
  if(hash&&target.endsWith('.html')){const dest=await fs.readFile(target,'utf8');assert(dest.includes(`id="${hash}"`),`Missing anchor ${value}`);}
 }
 for(const m of html.matchAll(/<img\b[^>]*>/g))assert(/\balt="/.test(m[0]),`Missing image alt in ${p}`);
}
console.log(`Preview passed: ${pages.length} routes; ${references} local references; unique IDs, headings, image alt text and commerce/form gates.`);
