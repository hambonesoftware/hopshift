// HopShift deterministic gameplay regression tests — no browser dependencies.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const html = fs.readFileSync(path.join(__dirname, '..', 'course-concept.html'), 'utf8');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
assert.equal(scripts.length, 2, 'Expected renderer and gameplay scripts.');
const nodes = new Map();
function node(id) {
  if (!nodes.has(id)) {
    nodes.set(id, {
      id, width:1280, height:720, textContent:'', hidden:true, dataset:{}, style:{},
      classList:{toggle(){},add(){},remove(){}}, addEventListener(){}, setPointerCapture(){},
      getContext(){return {};}
    });
  }
  return nodes.get(id);
}
const controls = ['game','hero3d','chapter','zoneTag','bar','combo','moveHint','left','right','jump','flip','reset'];
controls.forEach(node);
const sceneButtons = [0,1,2,3].map(i=>{const n=node('scene'+i);n.dataset.scene=String(i);return n;});
const scope = {
  console, Math, Date, URLSearchParams,
  location:{search:'?debug'}, requestAnimationFrame(){},
  window:{innerWidth:1280,createKip3D(){return {ready:true,render(){}};},addEventListener(){}},
  document:{getElementById:node,querySelectorAll(selector){return selector==='[data-scene]'?sceneButtons:[];}}
};
vm.createContext(scope);
vm.runInContext(scripts[1][1],scope,{filename:'course-gameplay.js'});
const game=scope.window.hopshiftDebug;
assert.ok(game,'Enable gameplay test API with ?debug');
const p=game.player,k=game.keys;
function tick(count=1){for(let i=0;i<count;i++)game.step(1);}
function reset(scene=0){k.left=k.right=k.jump=k.flip=false;game.setScene(scene);}
function pass(name){console.log('PASS: '+name);}

// Elevated platforms support actual character feet and allow jumping again.
reset(0);p.x=383;p.y=410;p.vy=0;p.onGround=false;p.supportId=null;tick(40);
assert.equal(p.y,466);assert.equal(p.supportId,'platform-0');
p.jumpBuffer=8;k.jump=true;tick();assert.ok(p.vy<0&&!p.onGround);
pass('Raised-platform landing and next jump');

// Full player-input chain: run → jump → inverted landing → slide through low roof.
reset(2);k.right=true;k.jump=true;k.flip=true;p.jumpBuffer=8;
let slide=false,exit=false,launch=false,catchLift=false;
for(let i=0;i<230;i++){
  if(i===8)k.jump=false;
  if(!launch&&p.x>game.roof.right+22&&p.slide){
    k.flip=false;k.jump=true;p.jumpBuffer=8;launch=true;
  }
  if(launch&&i>118)k.jump=false;
  tick();
  if(p.flipLanded&&p.slide)slide=true;
  if(p.x>game.roof.right)exit=true;
  if(launch&&p.onGround&&p.supportId==='lift'){catchLift=true;break;}
}
assert.ok(slide,'Must land inverted');
assert.ok(exit,'Must travel through tunnel');
assert.ok(launch,'Must initiate slide cancel');
assert.ok(catchLift,'Must catch moving lift');
assert.ok(Math.abs(p.y-game.lift.y)<1,'Feet must align to lift top');
const previousX=p.x;tick(20);
assert.equal(p.supportId,'lift');
assert.ok(Math.abs(p.x-previousX)>0.1,'Lift must carry player');
pass('Full flip → head slide → slide-jump → moving-lift catch and carry');

// Low-ceiling collision and recovery clearance.
reset(2);p.x=game.roof.left-22;p.y=565;p.vx=6.5;p.onGround=true;p.supportId='ground';k.right=true;tick(8);
assert.ok(p.x<=game.roof.left-20,'Standing cannot enter 39px tunnel');
reset(2);p.x=game.roof.left-22;p.y=565;p.vx=6.5;p.onGround=true;p.supportId='ground';
p.slide=true;k.flip=true;k.right=true;tick(26);
assert.ok(p.x>game.roof.left+50,'Compressed slide must enter');
k.flip=false;tick(2);
assert.ok(p.slide,'Must remain compressed under ceiling');
tick(75);assert.equal(p.slide,false,'Recover in open space');
pass('Upright blocking, slide collision and safe recovery');

// Checkpoint resets stale state.
reset(2);assert.equal(p.x,1800);assert.equal(p.slide,false);assert.equal(p.supportId,'ground');
pass('Reset behavior');
console.log('ALL HOPSHIFT GAMEPLAY REGRESSION TESTS PASSED');