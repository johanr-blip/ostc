import fs from 'node:fs/promises';
import path from 'node:path';
import {Liquid} from 'liquidjs';
const theme=path.resolve('theme');
const output=path.resolve('preview/dist');
const engine=new Liquid({root:[theme+'/snippets',theme+'/sections'],extname:'.liquid',strictFilters:false,jsTruthy:false});
const escape=s=>String(s??'').replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const locales=JSON.parse(await fs.readFile(theme+'/locales/de.default.json','utf8'));
engine.registerFilter('t',k=>k.split('.').reduce((o,s)=>o?.[s],locales)??k);
engine.registerFilter('asset_url',s=>'/assets/'+s);
engine.registerFilter('stylesheet_tag',s=>`<link rel="stylesheet" href="${s}">`);
engine.registerFilter('image_url',o=>o?.src??o);
engine.registerFilter('image_tag',(url,...args)=>{let a=Object.fromEntries(args.filter(Array.isArray));return `<img src="${escape(url)}" alt="KI-generiertes Produktkonzept" width="1254" height="1254" ${a.class?`class="${a.class}"`:''} loading="${a.loading??'lazy'}">`;});
engine.registerFilter('money',v=>new Intl.NumberFormat('de-DE',{style:'currency',currency:'EUR'}).format(Number(v)/100));
engine.registerFilter('default_errors',()=> '');engine.registerFilter('default_pagination',()=> '');
engine.registerFilter('metafield_tag',v=>v?.value??'');engine.registerFilter('structured_data',()=> '{}');
engine.registerTag('doc',{parse(tag,tokens){const stream=this.liquid.parser.parseStream(tokens).on('tag:enddoc',()=>stream.stop()).on('template',()=>{});stream.start();},render(){return '';}});
engine.registerTag('schema',{parse(tag,tokens){const stream=this.liquid.parser.parseStream(tokens).on('tag:endschema',()=>stream.stop()).on('template',()=>{});stream.start();},render(){return '';}});
engine.registerTag('paginate',{parse(tag,tokens){this.templates=[];const stream=this.liquid.parser.parseStream(tokens).on('tag:endpaginate',()=>stream.stop()).on('template',t=>this.templates.push(t));stream.start();},*render(ctx,emitter){ctx.push({paginate:{pages:1}});yield this.liquid.renderer.renderTemplates(this.templates,ctx,emitter);ctx.pop();}});
engine.registerTag('form',{parse(tag,tokens){this.args=tag.args;this.templates=[];const stream=this.liquid.parser.parseStream(tokens).on('tag:endform',()=>stream.stop()).on('template',t=>this.templates.push(t));stream.start();},*render(ctx,emitter){ctx.push({form:{}});emitter.write('<form class="newsletter-form" data-preview-form>');yield this.liquid.renderer.renderTemplates(this.templates,ctx,emitter);emitter.write('</form>');ctx.pop();}});
const productData=JSON.parse(await fs.readFile('content/products.json','utf8'));
const pages=JSON.parse(await fs.readFile('content/pages.json','utf8'));
const settings=JSON.parse(await fs.readFile(theme+'/config/settings_data.json','utf8')).current;
const products=productData.map((p,i)=>{
 let src=p.handle.includes('heavy-tee')?(p.line==='ostfrau'?'ostfrau-tee.webp':'ostmann-tee.webp'):p.handle.includes('hoodie')?'ost-hoodie.webp':p.type==='Cap'?'ost-cap.webp':null;
 const image=src?{src:'/assets/'+src}:null;
 const variants=p.sizes.map((s,j)=>({id:i*10+j+1,title:s,price:p.price,available:false}));
 return {...p,id:i+1,url:'/products/'+p.handle,featured_image:image,images:image?[image]:[],variants,selected_or_first_available_variant:variants[0],metafields:{ost:{line:{value:p.line},drop:{value:'001'},sale_mode:{value:'waitlist'}}}};
});
const collections={};
for(const line of ['ostmann','ostfrau','all']) collections[line]={handle:line,title:line==='all'?'DROP 001.':line.toUpperCase(),url:'/collections/'+line,products:products.filter(p=>line==='all'||p.line===line),products_count:products.filter(p=>line==='all'||p.line===line).length,description:'<p>Schwarz auf weiß. Der erste Drop entsteht.</p>',default_sort_by:'manual',sort_options:[{value:'manual',name:'Empfohlen'},{value:'price-ascending',name:'Preis aufsteigend'},{value:'price-descending',name:'Preis absteigend'}]};
settings.line_a_collection=collections.ostmann;settings.line_b_collection=collections.ostfrau;
const base={settings,request:{locale:{iso_code:'de'}},routes:{root_url:'/',cart_url:'/cart',all_products_collection_url:'/collections/all',search_url:'/search'},shop:{name:'OST.'},metaobjects:{ost_archive_person:{values:[]},ost_voice:{values:[]},ost_place:{values:[]}},cart:{item_count:0,items:[]},content_for_header:'',page_description:'OST. Kleidung, Kultur und Herkunft. Private Konzeptvorschau zum ersten Drop.',template:{name:'index',suffix:''},collection:{},product:{}};
const defs={};
async function renderSection(type,data,ctx,id){
 const source=await fs.readFile(theme+'/sections/'+type+'.liquid','utf8');
 const schema=defs[type]??(defs[type]=JSON.parse(source.match(/{% schema %}([\s\S]*?){% endschema %}/)[1]));
 const defaults=Object.fromEntries((schema.settings??[]).filter(s=>'default'in s).map(s=>[s.id,s.default]));
 engine.options.globals = ctx;
 const blocks=(data.block_order??Object.keys(data.blocks??{})).map(id=>({id,...data.blocks[id],shopify_attributes:''}));
 return engine.parseAndRender(source,{...ctx,section:{id,type,settings:{...defaults,...data.settings},blocks}});
}
async function renderRoute(url,templateName,extra={}){
 const ctx={...base,...extra,canonical_url:'http://localhost:4173'+url};
 const tmpl=JSON.parse(await fs.readFile(theme+'/templates/'+templateName+'.json','utf8'));
 let content='';for(const id of tmpl.order){const d=tmpl.sections[id];content+=await renderSection(d.type,d,ctx,id);}
 let layout=await fs.readFile(theme+'/layout/theme.liquid','utf8');
 layout=layout.replace("{% sections 'header-group' %}",await renderSection('ost-header',{},ctx,'header')).replace("{% sections 'footer-group' %}",await renderSection('ost-footer',{},ctx,'footer'));
 let html=await engine.parseAndRender(layout,{...ctx,content_for_layout:content});
 html=html.replace('<body>','<body><div class="preview-banner">PRIVATE KONZEPTVORSCHAU · Seite im Aufbau · Keine Bestellungen oder Anmeldungen</div>');
 html=html.replace('</body>','<script src="/assets/preview.js" defer></script></body>');
 const dest=url==='/'?output+'/index.html':output+url+'/index.html';await fs.mkdir(path.dirname(dest),{recursive:true});await fs.writeFile(dest,html);
}
await fs.mkdir(output+'/assets',{recursive:true});
await fs.cp(theme+'/assets',output+'/assets',{recursive:true});
await fs.writeFile(output+'/assets/preview.js',`document.querySelectorAll('[data-preview-form]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();alert('Private Konzeptvorschau. Es werden keine Daten übermittelt.');}));document.querySelectorAll('.collection-toolbar form').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();const g=document.querySelector('.product-grid');const cards=[...g.children];const direction=f.elements.sort_by.value==='price-descending'?-1:1;cards.sort((a,b)=>direction*(Number(a.querySelector('.price').textContent.replace(/[^0-9,]/g,'').replace(',','.'))-Number(b.querySelector('.price').textContent.replace(/[^0-9,]/g,'').replace(',','.'))));cards.forEach(c=>g.append(c));}));`);
await renderRoute('/','index',{page_title:'VOM OSTEN. NACH VORN.'});
for(const [name,collection] of Object.entries(collections))await renderRoute(collection.url,name==='all'?'collection':'collection.'+name,{collection,template:{name:'collection',suffix:name==='all'?'':name},page_title:collection.title});
for(const p of products)await renderRoute(p.url,'product',{product:p,page_title:p.title,template:{name:'product',suffix:''}});
for(const p of pages)await renderRoute('/pages/'+p.handle,'page'+(p.templateSuffix?'.'+p.templateSuffix:''),{page:{...p,content:p.body},page_title:p.title,template:{name:'page',suffix:p.templateSuffix}});
await renderRoute('/cart','cart',{page_title:'Warenkorb'});
await renderRoute('/404','404',{page_title:'Seite nicht gefunden'});
await fs.copyFile(output+'/404/index.html',output+'/404.html');
await fs.writeFile(output+'/robots.txt','User-agent: *\nDisallow: /\n');
console.log('Rendered 29 local routes from Shopify Liquid sections');
