'use strict';
const content = window.SITE_CONTENT;
const el = (tag, text, className) => { const n = document.createElement(tag); if(text !== undefined) n.textContent = text; if(className) n.className = className; return n; };
const safeURL = value => { try { const url = new URL(value, location.href); return ['https:', 'http:', 'file:'].includes(url.protocol) ? url.href : ''; } catch { return ''; } };
document.querySelector('#about-copy').textContent = content.about;
const tabs = document.querySelector('#career-tabs');
function selectCareer(index, focus = false) {
  [...tabs.children].forEach((button, i) => { button.setAttribute('aria-selected', i === index); button.tabIndex = i === index ? 0 : -1; });
  const c = content.career[index], panel = document.querySelector('#career-detail');
  panel.replaceChildren(); panel.setAttribute('aria-labelledby', `career-${index}`);
  panel.append(el('div', `GET ${c.path}`, 'method'), el('h3', c.company), el('p', c.role), el('div', c.dates, 'small'), el('p', c.summary));
  if(c.metrics){const metrics=el('div',undefined,'career-metrics');c.metrics.forEach(([value,label])=>{const m=el('div');m.append(el('strong',value),el('span',label));metrics.append(m);});panel.append(metrics);}
  const highlights=el('div',undefined,'career-highlights');
  (c.highlights||[]).forEach(([title,body])=>{const item=el('section',undefined,'career-highlight');item.append(el('h4',title),el('p',body));highlights.append(item);});
  panel.append(highlights);
  if(c.story){const details=el('details',undefined,'career-story');details.append(el('summary',c.storyTitle),el('p',c.story));panel.append(details);}
  panel.append(el('p', c.stack, 'small'));
  if(focus) tabs.children[index].focus();
}
content.career.forEach((c, i) => { const b = el('button', `${String(i+1).padStart(2,'0')}  ${c.company}`, 'trace-tab'); b.id = `career-${i}`; b.setAttribute('role','tab'); b.setAttribute('aria-controls','career-detail'); b.append(el('span','↗')); b.onclick = () => selectCareer(i); b.onkeydown = e => { let next = i; if(e.key==='ArrowDown'||e.key==='ArrowRight') next=(i+1)%content.career.length; else if(e.key==='ArrowUp'||e.key==='ArrowLeft') next=(i-1+content.career.length)%content.career.length; else if(e.key==='Home') next=0; else if(e.key==='End') next=content.career.length-1; else return; e.preventDefault(); selectCareer(next,true); }; tabs.append(b); });
selectCareer(0);
content.books.forEach((b,i) => { const row=el('div',undefined,'book'), details=el('div'); details.append(el('strong',b.title),el('p',b.author)); if(b.note) details.append(el('p',b.note)); row.append(el('span',String(i+1).padStart(2,'0'),'book-num'),details); document.querySelector('#books').append(row); });
const gallery=el('div',undefined,'photo-grid');
content.places.forEach(p => { const figure=el('figure',undefined,'photo'); if(p.image && safeURL(p.image)){ const img=el('img'); img.src=safeURL(p.image); img.alt=p.name; img.loading='lazy'; figure.append(img); }else{const empty=el('div',undefined,'photo-empty'); empty.append(el('b','＋'),el('span','A moment to keep')); figure.append(empty);} figure.append(el('figcaption',`${p.name} / ${p.caption}`));gallery.append(figure); });
document.querySelector('#places').append(gallery);
const videoSlot=document.querySelector('#video-slot');
if(content.drummingVideo && safeURL(content.drummingVideo)){const v=el('video');v.controls=true;v.preload='metadata';v.src=safeURL(content.drummingVideo);v.setAttribute('aria-label',content.videoCaption);videoSlot.append(v,el('p',content.videoCaption,'small'));}else{const empty=el('div',undefined,'video-empty'); empty.append(el('div','Ⅱ','disc'),el('p','FROM BEHIND THE KIT'),el('small','A drumming video is on its way.'));videoSlot.append(empty);}
const contact=document.querySelector('#contact-links');
if(content.email){const a=el('a','Say hello ↗');a.href=`mailto:${content.email}`;contact.append(a);}
for(const key of ['github','linkedin']){if(content[key] && safeURL(content[key])){const a=el('a',key==='github'?'GitHub ↗':'LinkedIn ↗');a.href=safeURL(content[key]);contact.append(a);}}

