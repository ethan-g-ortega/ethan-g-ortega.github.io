"""Run before publishing after changing CSS or JavaScript."""
from pathlib import Path
import hashlib,re
root=Path(__file__).resolve().parents[1]
p=root/'index.html';s=p.read_text()
for name in ['style.css','content.js','app.js','drums.js']:
 digest=hashlib.sha256((root/name).read_bytes()).hexdigest()[:12]
 s=re.sub(r'(["\'])'+re.escape(name)+r'(?:\?v=[^"\']*)?(["\'])',lambda m:m[1]+name+'?v='+digest+m[2],s)
p.write_text(s)
