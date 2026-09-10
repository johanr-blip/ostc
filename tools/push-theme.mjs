import fs from 'node:fs/promises';import {spawnSync} from 'node:child_process';
const c=JSON.parse(await fs.readFile('config/store.json','utf8'));
const bin=process.platform==='win32'?'shopify.cmd':'shopify';
function run(args){const p=spawnSync(bin,args,{encoding:'utf8',env:process.env});if(p.status!==0){process.stderr.write(p.stderr??'');process.stdout.write(p.stdout??'');throw new Error(`Shopify command failed (${p.status})`);}return p.stdout;}
const raw=run(['theme','list','--store',c.store,'--json']);
const data=JSON.parse(raw);const theme=data.find(t=>String(t.id)===String(c.theme_id));
if(!theme||!['unpublished','development'].includes(theme.role))throw new Error('Refusing upload: expected non-live OST theme not found. Inspect remote theme state.');
run(['theme','check','--path','theme']);
process.stdout.write(run(['theme','push','--store',c.store,'--theme',String(c.theme_id),'--path','theme','--json']));
