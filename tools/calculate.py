"""Portable calculation reference; standard Python only. Does not modify the workbook."""
import json
from pathlib import Path
from math import ceil

data=json.loads(Path('tools/finance-inputs.json').read_text())
result=[]
for p in data['products']:
    net=p.get('pod_net')
    if 'pod_gross' in p:
        net=p['pod_gross']/(1+data['vat'])
    if net is None:
        result.append({'product':p['name'],'status':'Kosten fehlen'})
        continue
    gross=p['retail_gross']+data['customer_shipping_gross']
    revenue=gross/(1+data['vat'])
    payment=gross*data['payment_rate']+data['payment_fixed']
    reserve=p['retail_gross']/(1+data['vat'])*data['reserve_rate']
    db=revenue-net-p['shipping_net']-p['branding_net']-payment-reserve
    after=db-data['cac']
    result.append({'product':p['name'],'db_before_ads':round(db,2),'db_after_ads':round(after,2),'orders_to_break_even':ceil(data['initial_cost']/after) if after>0 else None})
print(json.dumps(result,ensure_ascii=False,indent=2))
