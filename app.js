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
  const results = el('div', undefined, 'result');
  c.result.split('\n').forEach(line => results.append(el('div', `✓ ${line}`)));
  panel.append(results, el('p', c.stack, 'small'));
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

// A tiny, opt-in acoustic sketch. No audio files or autoplay.
let audioContext;
document.querySelectorAll('[data-sound]').forEach(button => {
  button.addEventListener('click', async () => {
    try {
      audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
      await audioContext.resume();
      const ctx = audioContext, t = ctx.currentTime, kind = button.dataset.sound;
      const gain = ctx.createGain(); gain.connect(ctx.destination);
      if(kind === 'kick') {
        const osc = ctx.createOscillator(); osc.frequency.setValueAtTime(145,t); osc.frequency.exponentialRampToValueAtTime(45,t+.2);
        gain.gain.setValueAtTime(.45,t); gain.gain.exponentialRampToValueAtTime(.001,t+.3);
        osc.connect(gain); osc.start(t); osc.stop(t+.31);
      } else {
        const duration = kind === 'hat' ? .07 : .17;
        const buffer = ctx.createBuffer(1,Math.ceil(ctx.sampleRate*duration),ctx.sampleRate);
        const data = buffer.getChannelData(0); for(let i=0;i<data.length;i++) data[i]=Math.random()*2-1;
        const source=ctx.createBufferSource();source.buffer=buffer;
        const filter=ctx.createBiquadFilter();filter.type='highpass';filter.frequency.value=kind==='hat'?7000:1100;
        source.connect(filter);filter.connect(gain);gain.gain.setValueAtTime(kind==='hat'?.13:.23,t);gain.gain.exponentialRampToValueAtTime(.001,t+duration);
        source.start(t); source.stop(t+duration);
      }
      button.classList.add('hit'); setTimeout(()=>button.classList.remove('hit'),120);
      document.querySelector('#sound-note').textContent = `${button.querySelector('b').textContent}. Your turn to find the groove.`;
    } catch { document.querySelector('#sound-note').textContent = 'Audio isn’t available in this browser.'; }
  });
});
