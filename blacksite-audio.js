/* Additive Blacksite Run sound controller. Original gameplay remains unchanged. */
(()=>{'use strict';
const A='assets/';const tracks={island:'Island Groove',hardcore:'Hardcore',chiptune:'Chiptune',ambient:'Ambient'};
let enabled=true,unlocked=false,volume=.72,track='hardcore',lastHover=0,lastStep=0,lastUI=0;
const music=new Audio(A+'music-'+track+'.wav');music.loop=true;music.preload='auto';
const effects={};for(const name of ['hover','click','fire','reload','pickup','hit','footstep','success','pause','ui']){effects[name]=Array.from({length:name==='fire'?5:3},()=>{const a=new Audio(A+name+'.wav');a.preload='auto';return a});}
const positions={};const controls=document.createElement('div');controls.id='blacksite-audio-controls';controls.setAttribute('aria-label','Sound settings');controls.innerHTML='<button type="button" id="bs-sound" aria-pressed="true">♫ SOUND: ON</button><select id="bs-track" aria-label="Music style"><option value="island">Island Groove</option><option value="hardcore">Hardcore</option><option value="chiptune">Chiptune</option><option value="ambient">Ambient</option></select><input id="bs-volume" type="range" min="0" max="100" value="72" aria-label="Audio volume">';
document.getElementById('shell').appendChild(controls);const toggle=document.getElementById('bs-sound'),select=document.getElementById('bs-track'),slider=document.getElementById('bs-volume');select.value=track;
function sync(){toggle.textContent=enabled?'♫ SOUND: ON':'♫ SOUND: OFF';toggle.setAttribute('aria-pressed',String(enabled));music.volume=enabled?volume*.66:0;for(const group of Object.values(effects))for(const a of group)a.volume=enabled?volume*.8:0;}
function playSafe(a){const p=a.play();if(p&&typeof p.catch==='function')p.catch(()=>{});}
function startMusic(){if(!enabled||!unlocked||document.hidden)return;music.volume=volume*.66;if(music.paused)playSafe(music)}
function unlock(){if(unlocked)return;unlocked=true;startMusic()}
function effect(name){if(!enabled||!unlocked||document.hidden)return;const group=effects[name]||effects.ui;let idx=positions[name]||0;positions[name]=(idx+1)%group.length;let a=group[idx];try{a.pause();a.currentTime=0;a.volume=volume*.8;playSafe(a)}catch(e){}}
function setEnabled(value){enabled=!!value;if(!enabled){music.pause();for(const group of Object.values(effects))for(const a of group){a.pause();try{a.currentTime=0}catch(e){}}}sync();if(enabled)startMusic()}
// The capture listener unlocks playback in the *actual user gesture*, not a delayed callback.
document.addEventListener('pointerdown',e=>{if(e.target.closest('#bs-sound'))return;unlock()},{capture:true});document.addEventListener('keydown',()=>unlock(),{capture:true});
toggle.addEventListener('click',()=>{if(!unlocked)unlocked=true;setEnabled(!enabled);if(enabled)effect('click')});
select.addEventListener('change',()=>{track=select.value;music.pause();music.src=A+'music-'+track+'.wav';music.load();startMusic();effect('click')});
slider.addEventListener('input',()=>{volume=Number(slider.value)/100;sync()});
document.addEventListener('pointerover',e=>{if(!e.target.closest('button,a,select,input,.blacksite-brand-logo,.blacksite-title-logo,.blacksite-panel-logo'))return;let now=performance.now();if(now-lastHover>85){lastHover=now;effect('hover')}},{passive:true});
document.addEventListener('click',e=>{if(e.target.closest('#bs-sound,#bs-track,#bs-volume'))return;if(e.target.closest('button,a'))effect('click')},{capture:true});
// Replace only the legacy synthesized sound function; all original call sites remain intact.
if(typeof tone==='function')tone=function(f,d,type,level){if(!enabled)return;const n=f<100?'hit':f<180?'fire':f>780?'pickup':f>550?'reload':'ui';effect(n)};
// Match sounds to gameplay without altering the game's update loop.
let lastAmmo=null,lastCores=null,lastHP=null,lastMode=null,lastSteps=0;
function watch(){try{if(typeof mode!=='undefined'&&mode!==lastMode){if(lastMode!==null){if(mode==='pause')effect('pause');if(mode==='end')effect('success');}lastMode=mode;}
if(typeof player!=='undefined'&&player&&typeof mode!=='undefined'&&mode==='play'){
if(lastAmmo!==null&&player.ammo<lastAmmo)effect('fire');
if(lastCores!==null&&player.cores>lastCores)effect('pickup');
if(lastHP!==null&&player.hp<lastHP)effect('hit');
if(player.steps-lastSteps>.65&&performance.now()-lastStep>230){lastStep=performance.now();effect('footstep');lastSteps=player.steps;}
lastAmmo=player.ammo;lastCores=player.cores;lastHP=player.hp;
}else{lastAmmo=null;lastCores=null;lastHP=null;lastSteps=0;}
}catch(e){}requestAnimationFrame(watch)}requestAnimationFrame(watch);
document.addEventListener('visibilitychange',()=>{if(document.hidden)music.pause();else startMusic()});
window.addEventListener('pagehide',()=>music.pause());sync();
})();