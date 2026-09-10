from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import json

root=Path('theme');out=Path('release');out.mkdir(exist_ok=True)
allowed={'assets','config','layout','locales','sections','snippets','templates','blocks'}
target=out/'ost-founding-theme.zip'
with ZipFile(target,'w',ZIP_DEFLATED) as z:
    for p in sorted(root.rglob('*')):
        if p.is_file() and p.relative_to(root).parts[0] in allowed:
            z.write(p,p.relative_to(root))
with ZipFile(target) as z:
    assert z.testzip() is None
    assert 'layout/theme.liquid' in z.namelist()
    assert 'templates/index.json' in z.namelist()
print(target)
