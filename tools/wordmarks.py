"""Optional: create outlined wordmarks. Requires fonttools and brotli; no account/API needed."""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen

font=TTFont('theme/assets/archivo-latin.woff2')
font=instantiateVariableFont(font,{'wght':700},inplace=False)
glyphs=font.getGlyphSet();cmap=font.getBestCmap();units=font['head'].unitsPerEm
dest=Path('assets/wordmarks');dest.mkdir(exist_ok=True)
for name,label in [('ost','OST.'),('ostmann','OSTMANN'),('ostfrau','OSTFRAU')]:
    cursor=0;paths=[]
    for char in label:
        glyph=cmap[ord(char)];pen=SVGPathPen(glyphs);glyphs[glyph].draw(pen)
        paths.append(f'<path transform="translate({cursor},0)" d="{pen.getCommands()}"/>')
        cursor+=glyphs[glyph].width+units*.075
    width=cursor-units*.075
    for color,value in [('white','#ffffff'),('black','#050505')]:
        svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="100mm" height="25mm" viewBox="0 0 {width} {units}"><title>{label} — typographic design concept</title><g fill="{value}" transform="translate(0,{units*.8}) scale(1,-1)">'+''.join(paths)+'</g></svg>'
        (dest/(name+'-'+color+'.svg')).write_text(svg)
print('Outlined wordmarks written. Verify print dimensions with the supplier before production.')
