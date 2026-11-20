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
 replaceChildren(...items){this.children=items} setAttribute(){} addEventListener(){} remove(){} querySelector(){return null} focus(){} showModal(){this.open=true} close(){this.open=false}
 getContext(){return new Proxy({measureText(){return {width:100}},createLinearGradient(){return {addColorStop(){}}}}, {get:(o,k)=>o[k]??(()=>{})})}
 getBoundingClientRect(){return {left:0,top:0,width:390,height:844}}
}
const ids=new Map();const document={body:new Element(),createElement:()=>new Element(),getElementById:id=>{if(!ids.has(id))ids.set(id,new Element());return ids.get(id)},querySelectorAll:()=>[]};
class Renderer{constructor(){this.domElement=new Element();this.shadowMap={}}setSize(){}setPixelRatio(){}render(){}}
const memory=new Map();
for(const [width,height] of [[320,960],[390,844],[630,900],[844,390]]){
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
 const wallet=coins;
 $('choices').children[0].children[0].children[1].onclick();
 assert.equal($('purchaseDialog').open,true);
 $('purchaseConfirm').onclick();
 assert.equal(weaponIndex,1);assert.equal(coins,wallet-weapons[1].cost);
 assert.equal(level,1);equipWeapon(0);assert.equal(level,2);
 openItems();
 for(const i of [0,1])$('itemOptions').children[i].onclick();
 assert.equal(inventoryItems.barrier,1);assert.equal(inventoryItems.mat,1);
 $('itemsDialog').close();
 for(let i=0;i<weapons.length;i++){ownedWeapons.add(i);equipWeapon(i);assert.ok(damage>0);assert.ok(fireRate>0);}
 saveCheckpoint();const cp=loadCheckpoint();assert.ok(cp);assert.equal(cp.wave,1);
 for(const number of [5,10]){enemies.slice().forEach(removeEnemy);wave=number;spawned=toSpawn-1;makeEnemy();assert.equal(enemies.filter(e=>e.userData.big).length,number===10?3:1);updateDesignPilot();assert.equal(designPilot.visible,true);}
 restoreCheckpoint(cp);
 assert.equal(inventoryItems.barrier,1);assert.equal(inventoryItems.mat,1);
 beginWave();
 for(const kind of ['barrier','mat']){
   useItem(kind);assert.equal(inventoryItems[kind],0);
 }
 assert.equal(deployed.length,2);
 const testEnemy=new THREE.Group();
 testEnemy.position.set(0,0,-4.25);testEnemy.userData.speed=3;
 for(let i=0;i<12;i++)updateEnemyAction(testEnemy,.25);
 assert.ok(deployed.every(obstacle=>obstacle.active));
 tickObstacles(10);assert.equal(deployed.length,0);
 equipWeapon(0);fire();
 assert.equal(muzzleTime,.075);
 assert.equal(bullets.at(-1).userData.vel.x,0);
 assert.ok(bullets.at(-1).userData.vel.z<0);
 const hit=new THREE.Mesh(new THREE.BoxGeometry(),hostileMaterial);
 hit.position.set(player.position.x,1.5,player.position.z-.25);
 hostileShots.push(hit);updateHostileShots(.05);assert.equal(playerHp,88);
 pointer({type:'pointerdown',pointerId:1,clientX:innerWidth/2,clientY:innerHeight*.75});
 pointer({type:'pointermove',pointerId:2,clientX:innerWidth*.95,clientY:0});
 assert.equal(targetX,0);
 endDrag({pointerId:2});assert.equal(dragPointer,1);
 pointer({type:'pointermove',pointerId:1,clientX:innerWidth*.7,clientY:innerHeight*.75});
 assert.ok(targetX>0&&targetX<=5.4);
 endDrag({pointerId:1});assert.equal(dragPointer,null);
 for(const x of [-5.4,5.4])for(const y of [0,2.6]){
   const point=new THREE.Vector3(x,y,player.position.z).project(camera);
   assert.ok(Math.abs(point.x)<.95&&Math.abs(point.y)<.9,JSON.stringify(point));
 }
 console.log('PASS',innerWidth+'x'+innerHeight,'camera, multitouch, combat, shop, purchases, items, checkpoint, bosses');
 `,context);
}
