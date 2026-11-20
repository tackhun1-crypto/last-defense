// Run with THREE_MODULE=/absolute/path/to/three.module.mjs node tests/logic.mjs.
// Real Three.js math/scene graph, stubbed DOM, GPU and audio. No visual assertions.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const THREE=await import(process.env.THREE_MODULE);
class Element {
 constructor(){this.style={setProperty(){}};this.dataset={};this.children=[];this.classList={toggle(){},add(){},remove(){}};this.hidden=false;this.textContent='';}
 set innerHTML(value){this.children=[]} get innerHTML(){return ''} appendChild(item){this.children.push(item);return item}
 append(...items){this.children.push(...items)} prepend(...items){this.children.unshift(...items)}
 replaceChildren(...items){this.children=items} setAttribute(){} addEventListener(){} remove(){} focus(){} showModal(){this.open=true} close(){this.open=false}
 getContext(){return new Proxy({measureText(){return {width:100}},createLinearGradient(){return {addColorStop(){}}}}, {get:(o,k)=>o[k]??(()=>{})})}
 getBoundingClientRect(){return {left:0,top:0,width:390,height:844}}
}
const ids=new Map();const document={body:new Element(),createElement:()=>new Element(),getElementById:id=>{if(!ids.has(id))ids.set(id,new Element());return ids.get(id)},querySelectorAll:()=>[]};
class Renderer{constructor(){this.domElement=new Element();this.shadowMap={}}setSize(){}setPixelRatio(){}render(){}}
const memory=new Map();
for(const [width,height] of [[390,844],[844,390]]){
 const context=vm.createContext({THREE:{...THREE,WebGLRenderer:Renderer},document,innerWidth:width,innerHeight:height,devicePixelRatio:3,window:{addEventListener(){}},localStorage:{setItem:(k,v)=>memory.set(k,v),getItem:k=>memory.get(k),removeItem:k=>memory.delete(k)},requestAnimationFrame(){},setTimeout(){},clearTimeout(){},console,assert});
 let code=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8').split('<script type="module">')[1].split('</script>')[0];
 code=code.replace(/^\s*import .*?;\s*/,'');
 code=code.replace('async function loadFemale(){','async function loadFemale(){return;');
 vm.runInContext(code,context);
 vm.runInContext(`
 assert.equal(avatar,'female');
 reset(); assert.equal(playing,true);assert.equal(wave,1);assert.equal(hp,100);
 makeEnemy(); assert.equal(enemies.length,1);
 const victim=enemies[0]; damageEnemy(victim,999,victim.position);assert.equal(kills,1);assert.equal(coins,8);
 nextShop();assert.equal(playing,false);assert.equal($('panel').dataset.screen,'shop');
 coins=1000;showShop();const before=damage;$('choices').children[0].children[1].children[1].onclick();assert.equal(damage,before+12);
 ownedWeapons.add(1);equipWeapon(1);assert.equal(level,1);equipWeapon(0);assert.equal(level,2);
 for(let i=0;i<weapons.length;i++){ownedWeapons.add(i);equipWeapon(i);assert.ok(damage>0);assert.ok(fireRate>0);}
 saveCheckpoint();const cp=loadCheckpoint();assert.ok(cp);assert.equal(cp.wave,1);
 for(const number of [5,10]){enemies.slice().forEach(removeEnemy);wave=number;spawned=toSpawn-1;makeEnemy();assert.equal(enemies.filter(e=>e.userData.big).length,number===10?3:1);updateDesignPilot();assert.equal(designPilot.visible,true);}
 reset();beginWave();camera.position.set(9,25,24);camera.lookAt(0,0,-10);camera.updateMatrixWorld();
 pointer({type:'pointerdown',clientX:innerWidth/2,clientY:innerHeight*.75});pointer({type:'pointermove',clientX:innerWidth*.7,clientY:innerHeight*.75});assert.ok(targetX>0&&targetX<=5.4);
 console.log('PASS',innerWidth+'x'+innerHeight,'initialization, combat reward, shop upgrade, weapon isolation, checkpoint, bosses, all-wave art, drag projection');
 `,context);
}
