'use strict';
(() => {
  const room=document.querySelector('.drum-app'), status=document.querySelector('#kit-status');
  const volume=document.querySelector('#kit-volume'), bpm=document.querySelector('#kit-bpm'), metro=document.querySelector('#metronome');
  const pads=[...document.querySelectorAll('[data-drum]')];
  let ctx, master, noise, clock, beat=0, running=false, next=0;
  const keys={KeyF:'snare',KeyJ:'hat',KeyK:'open',KeyR:'high',KeyU:'low',KeyE:'crash',KeyI:'ride',Space:'kick'};
  async function ready(){
    if(!ctx){ctx=new (window.AudioContext||window.webkitAudioContext)();master=ctx.createGain();master.gain.value=Number(volume.value)/100*.7;const limiter=ctx.createDynamicsCompressor();master.connect(limiter);limiter.connect(ctx.destination);noise=ctx.createBuffer(1,ctx.sampleRate*2,ctx.sampleRate);const a=noise.getChannelData(0);for(let i=0;i<a.length;i++)a[i]=Math.random()*2-1;}
    if(ctx.state!=='running') await ctx.resume();
  }
  function tone(freq,end,duration,level,t,type='sine'){
    const o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.setValueAtTime(freq,t);o.frequency.exponentialRampToValueAtTime(end,t+duration*.65);g.gain.setValueAtTime(.001,t);g.gain.exponentialRampToValueAtTime(level,t+.002);g.gain.exponentialRampToValueAtTime(.001,t+duration);o.connect(g);g.connect(master);o.start(t);o.stop(t+duration+.01);o.onended=()=>{o.disconnect();g.disconnect();};
  }
  function hiss(duration,level,freq,t){const src=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),g=ctx.createGain();src.buffer=noise;filter.type='highpass';filter.frequency.value=freq;g.gain.setValueAtTime(level,t);g.gain.exponentialRampToValueAtTime(.001,t+duration);src.connect(filter);filter.connect(g);g.connect(master);src.start(t);src.stop(t+duration);src.onended=()=>{src.disconnect();filter.disconnect();g.disconnect();};}
  function sound(kind,t){switch(kind){case 'kick':tone(160,43,.38,.9,t);hiss(.018,.1,2200,t);break;case 'snare':tone(190,100,.14,.25,t,'triangle');hiss(.19,.55,1300,t);break;case 'high':tone(260,115,.29,.65,t);break;case 'low':tone(170,65,.43,.7,t);break;case 'hat':hiss(.055,.31,7500,t);tone(6200,6000,.04,.035,t,'square');break;case 'open':hiss(.42,.33,6500,t);break;case 'crash':hiss(1.25,.43,2800,t);[311,503,727,1093].forEach(f=>tone(f,f*.98,.8,.035,t,'square'));break;case 'ride':hiss(.6,.16,6000,t);[2100,3350,4770].forEach(f=>tone(f,f,.55,.06,t));break;}}
  async function hit(kind){try{await ready();sound(kind,ctx.currentTime);const p=pads.find(p=>p.dataset.drum===kind);p.classList.remove('hit');void p.offsetWidth;p.classList.add('hit');setTimeout(()=>p.classList.remove('hit'),130);status.textContent=p.querySelector('strong').textContent+' — keep it going.';}catch{status.textContent='Audio unavailable. Try a browser with Web Audio support.';}}
  pads.forEach(p=>{p.addEventListener('pointerdown',e=>{if(e.button!==0)return;e.preventDefault();p.focus({preventScroll:true});hit(p.dataset.drum);});p.addEventListener('click',e=>{if(e.detail===0)hit(p.dataset.drum);});});
  room.addEventListener('pointerdown',e=>{if(!e.target.closest('button,input,label'))room.focus({preventScroll:true});});
  room.addEventListener('keydown',e=>{
    if(e.key==='Escape'){e.preventDefault();document.activeElement.blur();status.textContent='Keyboard play paused. Click the kit to play again.';return;}
    if(e.repeat||e.ctrlKey||e.metaKey||e.altKey||e.target.closest('input,textarea,select,[contenteditable=true]'))return;
    // Keep Space and Enter native on toolbar buttons; pads use Space for kick.
    if(e.target.closest('.kit-toolbar'))return;
    const kind=keys[e.code];if(kind){e.preventDefault();hit(kind);}
  });
  volume.addEventListener('input',()=>{if(master)master.gain.setTargetAtTime(Number(volume.value)/100*.7,ctx.currentTime,.02);});
  function tempo(){return Math.min(240,Math.max(40,Number(bpm.value)||100));}
  bpm.addEventListener('change',()=>{bpm.value=tempo();});
  const lights=[...document.querySelectorAll('.beat-lights i')];
  function stop(){running=false;clearInterval(clock);metro.textContent='Start metronome';metro.setAttribute('aria-pressed','false');lights.forEach(l=>l.classList.remove('on'));}
  function tick(){if(!running)return;while(next<ctx.currentTime+.08){const index=beat++%4;const when=next;tone(index===0?1500:1000,index===0?1500:1000,.035,.2,when);setTimeout(()=>{if(running)lights.forEach((l,i)=>l.classList.toggle('on',i===index));},Math.max(0,(when-ctx.currentTime)*1000));next+=60/tempo();}}
  metro.addEventListener('click',async()=>{if(running){stop();status.textContent='Metronome stopped.';return;}try{await ready();running=true;beat=0;next=ctx.currentTime+.04;metro.textContent='Stop metronome';metro.setAttribute('aria-pressed','true');tick();clock=setInterval(tick,25);status.textContent='Metronome on. Play along.';}catch{status.textContent='Audio unavailable in this browser.';}});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
  window.addEventListener('pagehide',stop);
})();
