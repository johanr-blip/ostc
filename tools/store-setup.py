from pathlib import Path
import subprocess,os,json,sys
ROOT=Path(__file__).resolve().parents[1]
os.chdir(ROOT)
CONFIG=json.loads(Path('config/store.json').read_text())
STORE=CONFIG['store']
CLI=str(Path('node_modules/.bin/shopify').resolve())
BASE=Path('work/store')
ENV=dict(os.environ,OPT_OUT_INSTRUMENTATION='true')
QUERIES={p.stem:p.read_text() for p in Path('tools').glob('*.graphql')}
def prepare():
    BASE.mkdir(parents=True,exist_ok=True)
    for key,q in QUERIES.items():
        (BASE/(key+'.graphql')).write_text(q)
    statepath=BASE/'state.json'
    if not statepath.exists():
        statepath.write_text(Path('config/shopify-resources.json').read_text())

def execute(key,variables=None):
 dest=BASE/(key+'-last.json')
 args=[CLI,'store','execute','--store',STORE,'--query-file',str(BASE/(key+'.graphql')),'--json','--output-file',str(dest),'--version',CONFIG['api_version']]
 if variables is not None:
  varpath=BASE/(key+'-variables.json');varpath.write_text(json.dumps(variables));args+=['--variable-file',str(varpath)]
 if 'mutation' in QUERIES[key]:args+=['--allow-mutations']
 p=subprocess.run(args,env=ENV,capture_output=True,text=True)
 if p.returncode:raise RuntimeError(key+' '+p.stdout+p.stderr)
 data=json.loads(dest.read_text())
 if data.get('errors'):raise RuntimeError(str(data['errors']))
 data=data.get('data',data)
 payload=data.get(key,data)
 if payload.get('userErrors'):raise RuntimeError(key+' '+str(payload['userErrors']))
 return payload
definitions=json.loads(Path('content/metaobject-definitions.json').read_text())
metafields=json.loads(Path('content/product-metafield-definitions.json').read_text())
def run(stage):
 statepath=BASE/'state.json';state=json.loads(statepath.read_text()) if statepath.exists() else {'definitions':{},'metafields':{},'pages':{},'products':{},'collections':{}}
 def save():statepath.write_text(json.dumps(state,ensure_ascii=False,indent=2))
 if stage=='definitions':
  existing=execute('inspect');(BASE/'before.json').write_text(json.dumps(existing,indent=2))
  for d in definitions:
   found=next((o for o in existing['metaobjectDefinitions']['nodes'] if o['type']==d['type']),None)
   if found:state['definitions'][d['type']]=found
   else:state['definitions'][d['type']]=execute('metaobjectDefinitionCreate',{'definition':d})['metaobjectDefinition']
   save();print('Definition',d['type'],flush=True)
  for f in metafields:
   if f['key'] in state['metafields']:continue
   d={k:v for k,v in f.items() if k!='required'};d.update({'namespace':'ost','ownerType':'PRODUCT','access':{'storefront':'PUBLIC_READ'}})
   if f['key'] in ['line','sale_mode']:d['validations']=[{'name':'choices','value':json.dumps(['ostmann','ostfrau','unisex'] if f['key']=='line' else ['waitlist','preorder','live','sold_out','archived'])}]
   state['metafields'][f['key']]=execute('metafieldDefinitionCreate',{'definition':d})['createdDefinition'];save();print('Metafield',f['key'],flush=True)
  if 'archive_link' not in state['metafields']:
   d={'name':'Archive Link','namespace':'ost','key':'archive_link','ownerType':'PRODUCT','type':'metaobject_reference','access':{'storefront':'PUBLIC_READ'},'validations':[{'name':'metaobject_definition_id','value':state['definitions']['ost_archive_person']['id']}]}
   state['metafields']['archive_link']=execute('metafieldDefinitionCreate',{'definition':d})['createdDefinition'];save()
 elif stage=='content':
  before=execute('inspect')
  for p in json.loads(Path('content/pages.json').read_text()):
   if p['handle'] in state['pages']:continue
   if any(x['handle']==p['handle'] for x in before['pages']['nodes']):raise RuntimeError('Existing page collision '+p['handle'])
   state['pages'][p['handle']]=execute('pageCreate',{'page':p})['page'];save();print('Draft page',p['handle'],flush=True)
  for p in json.loads(Path('content/products.json').read_text()):
   if p['handle'] in state['products']:continue
   data={'title':p['title'],'handle':p['handle'],'descriptionHtml':p['description'],'vendor':'OST.','productType':p['type'],'status':'DRAFT','tags':['ost-drop-001','ost-line-'+p['line'],'ost-waitlist'],'productOptions':[{'name':'Größe','position':1,'values':[{'name':s} for s in p['sizes']]}],'variants':[{'optionValues':[{'optionName':'Größe','name':s}],'price':str(p['price']/100),'inventoryPolicy':'DENY','inventoryItem':{'sku':'OST-001-'+p['handle'].upper()+'-'+s,'tracked':True,'requiresShipping':True}} for s in p['sizes']]}
   created=execute('productSet',{'input':data})['product'];state['products'][p['handle']]=created;save()
   execute('metafieldsSet',{'metafields':[{'ownerId':created['id'],'namespace':'ost','key':key,'type':'single_line_text_field','value':value} for key,value in [('line',p['line']),('drop','001'),('sale_mode','waitlist')]]})
   print('Draft product',p['handle'],flush=True)
  for line in ['ostmann','ostfrau','drop-001']:
   if line in state['collections']:continue
   if any(x['handle']==line for x in before['collections']['nodes']):raise RuntimeError('Existing collection collision '+line)
   c=execute('collectionCreate',{'input':{'title':line.upper(),'handle':line,'descriptionHtml':'<p>Der erste Drop entsteht. Noch nicht bestellbar.</p>','templateSuffix':line if line!='drop-001' else ''}})['collection']
   state['collections'][line]=c;save()
   ids=[p['id'] for h,p in state['products'].items() if line=='drop-001' or h.startswith(line+'-')]
   execute('collectionAddProducts',{'id':c['id'],'productIds':ids});print('Collection',line,flush=True)
 elif stage=='verify':
  data=execute('read');(BASE/'after.json').write_text(json.dumps(data,indent=2));print(json.dumps(data,ensure_ascii=False))
 else:raise RuntimeError('Unknown stage')
if __name__=='__main__':
    import argparse
    parser=argparse.ArgumentParser(description='OST store operations. Read-only unless --apply is explicit.')
    parser.add_argument('stage',choices=['status','definitions','content'],nargs='?',default='status')
    parser.add_argument('--apply',action='store_true')
    args=parser.parse_args()
    if args.stage!='status' and not args.apply:
        parser.error('Write stages require --apply. Inspect config/shopify-resources.json and remote state first.')
    prepare()
    run('verify' if args.stage=='status' else args.stage)
