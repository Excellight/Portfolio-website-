import * as THREE from 'three';

const canvas = document.querySelector('#universe');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x050711, 0.012);
const camera = new THREE.PerspectiveCamera(65, innerWidth / innerHeight, 0.1, 1800);
camera.position.set(0, 0, 34);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;

const clock = new THREE.Clock();
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2(9, 9);
let travelling = false, reducedMotion = false, activeWorld = null, targetCamera = new THREE.Vector3(0,0,34);
let pointerX = 0, pointerY = 0;

// Deep-space starfield: layered particles create the feeling of forward travel.
function makeStars(count, spread, zMin, zMax, size, opacity) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const palette = [new THREE.Color('#d9e7ff'), new THREE.Color('#aaa8ff'), new THREE.Color('#82cfff'), new THREE.Color('#fff0d7')];
  for (let i=0;i<count;i++) {
    positions[i*3] = (Math.random()-.5)*spread;
    positions[i*3+1] = (Math.random()-.5)*spread;
    positions[i*3+2] = zMin + Math.random()*(zMax-zMin);
    const c = palette[Math.floor(Math.random()*palette.length)];
    colors[i*3]=c.r; colors[i*3+1]=c.g; colors[i*3+2]=c.b;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions,3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors,3));
  const mat = new THREE.PointsMaterial({size, sizeAttenuation:true, vertexColors:true, transparent:true, opacity, depthWrite:false, blending:THREE.AdditiveBlending});
  const points = new THREE.Points(geo,mat); scene.add(points); return points;
}
const farStars = makeStars(5500, 250, -900, 40, .72, .8);
const nearStars = makeStars(1300, 100, -220, 20, 1.15, .9);

const ambient = new THREE.AmbientLight(0x8795ff, .65); scene.add(ambient);
const pointLight = new THREE.PointLight(0x9993ff, 65, 130); pointLight.position.set(0,0,15); scene.add(pointLight);

const worlds = [
  {id:'student',name:'The Growing World',short:'Student Management System',type:'WORLD 01 / IN PROGRESS',color:0x76d9a7,position:new THREE.Vector3(-13,4,-48),description:'This student management system is more than an admin dashboard. It is the starting point of a larger learning experience, where student activity, progress and performance can help mentors understand how learners grow. The bigger vision is still being developed.',tags:['React','Python · Flask','Learning analytics'],link:'',linkLabel:''},
  {id:'mech',name:'The Mech Lab',short:'AI Mech Lab',type:'WORLD 02 / AI & LEARNING',color:0x87bfff,position:new THREE.Vector3(12,6,-90),description:'AI Mech Lab is an AI-powered learning environment built around practical engineering education. Excellence contributes to database design and Gemini AI adaptation and integration. The wider platform is being developed collaboratively.',tags:['AI integration','Database design','Engineering education'],link:'',linkLabel:''},
  {id:'cyber',name:'The Cyber Realm',short:'Cybersecurity & Cloud',type:'WORLD 03 / SECURITY',color:0xb29bff,position:new THREE.Vector3(-10,-7,-135),description:'A space dedicated to building safer digital experiences. Explore Excellence’s interests and training in cybersecurity, cloud security and the role of security-minded thinking in AI-powered products.',tags:['Cybersecurity','Cloud security','Secure AI'],link:'',linkLabel:''},
  {id:'design',name:'The Creative Orbit',short:'Product & Graphic Design',type:'WORLD 04 / DESIGN',color:0xffc28a,position:new THREE.Vector3(14,-5,-180),description:'Good technology should be useful and understandable. This world represents Excellence’s product design practice, visual thinking and interest in creating clear, thoughtful digital experiences.',tags:['Product design','Visual design','Problem solving'],link:'',linkLabel:''},
  {id:'about',name:'The Origin',short:'Meet Excellence',type:'WORLD 05 / ABOUT',color:0xffe7a1,position:new THREE.Vector3(0,8,-230),description:'Excellence Odimegwu is a Computer Science student at the University of Nigeria, Nsukka, exploring AI engineering, cybersecurity, product design and web development. He enjoys learning, building ideas and solving practical problems with technology.',tags:['Computer Science','AI enthusiast','Builder of ideas'],link:'',linkLabel:''}
];

function makeGlowTexture(){
  const c=document.createElement('canvas');c.width=c.height=128;const ctx=c.getContext('2d');
  const g=ctx.createRadialGradient(64,64,2,64,64,62);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.12,'rgba(255,255,255,.95)');g.addColorStop(.3,'rgba(180,180,255,.42)');g.addColorStop(1,'rgba(120,120,255,0)');ctx.fillStyle=g;ctx.fillRect(0,0,128,128);return new THREE.CanvasTexture(c);
}
const glowTexture=makeGlowTexture();
const clickable=[];
worlds.forEach((w,i)=>{
  const group=new THREE.Group();group.position.copy(w.position);group.userData.world=w;scene.add(group);
  const core=new THREE.Mesh(new THREE.SphereGeometry(1.0+(i%2)*.18,32,32),new THREE.MeshStandardMaterial({color:w.color,emissive:w.color,emissiveIntensity:1.3,roughness:.28,metalness:.1}));group.add(core);
  const halo=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTexture,color:w.color,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,opacity:.8}));halo.scale.set(9,9,1);group.add(halo);
  const ring=new THREE.Mesh(new THREE.TorusGeometry(2.1,.018,8,100),new THREE.MeshBasicMaterial({color:w.color,transparent:true,opacity:.5}));ring.rotation.x=1.05;ring.rotation.y=.3;group.add(ring);
  const ring2=new THREE.Mesh(new THREE.TorusGeometry(2.7,.009,6,100),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.2}));ring2.rotation.x=.65;ring2.rotation.y=1.1;group.add(ring2);
  core.userData.world=w;core.userData.group=group;clickable.push(core);
  // Small orbiting satellites make each destination feel alive.
  const sat=new THREE.Mesh(new THREE.SphereGeometry(.07,12,12),new THREE.MeshBasicMaterial({color:0xffffff}));group.add(sat);sat.userData.orbit=true;
  w.group=group;w.core=core;w.halo=halo;w.ring=ring;w.satellite=sat;
});

const intro=document.querySelector('#intro'), hud=document.querySelector('.hud'), legend=document.querySelector('#legend');
const card=document.querySelector('#worldCard'), closeCard=document.querySelector('#closeCard');
const hudStatus=document.querySelector('#hudStatus');
function begin(){travelling=true;intro.classList.add('is-hidden');hud.classList.add('visible');legend.classList.add('visible');hudStatus.textContent='DEEP SPACE // SELECT A WORLD';}
document.querySelector('#exploreBtn').addEventListener('click',begin);
function openWorld(w){begin();activeWorld=w;targetCamera.set(w.position.x*.68,w.position.y*.68,w.position.z+13);hudStatus.textContent=`${w.type} // DESTINATION FOUND`;document.querySelector('#worldType').textContent=w.type;document.querySelector('#worldTitle').textContent=w.name;document.querySelector('#worldDescription').textContent=w.description;const meta=document.querySelector('#worldMeta');meta.innerHTML='';w.tags.forEach(t=>{const s=document.createElement('span');s.textContent=t;meta.appendChild(s)});const link=document.querySelector('#worldLink');link.hidden=!w.link;link.href=w.link||'#';link.textContent=(w.linkLabel||'Explore project')+' ↗';card.classList.add('open');card.setAttribute('aria-hidden','false');}
function closeWorld(){activeWorld=null;card.classList.remove('open');card.setAttribute('aria-hidden','true');targetCamera.set(0,0,-4);hudStatus.textContent='DEEP SPACE // SELECT A WORLD';}
closeCard.addEventListener('click',closeWorld);

function setPointer(e){pointer.x=(e.clientX/innerWidth)*2-1;pointer.y=-(e.clientY/innerHeight)*2+1;pointerX=pointer.x;pointerY=pointer.y;}
addEventListener('pointermove',setPointer);
addEventListener('pointerdown',()=>{if(!travelling)begin();raycaster.setFromCamera(pointer,camera);const hits=raycaster.intersectObjects(clickable,false);if(hits.length)openWorld(hits[0].object.userData.world)});
addEventListener('keydown',e=>{if(e.key==='Escape')closeWorld();if(e.key==='Enter'&&!travelling)begin()});

const motionBtn=document.querySelector('#motionToggle');motionBtn.addEventListener('click',()=>{reducedMotion=!reducedMotion;motionBtn.setAttribute('aria-pressed',String(reducedMotion));motionBtn.innerHTML=reducedMotion?'◉ <span>Motion reduced</span>':'◌ <span>Reduce motion</span>';});

// Litex: a deliberately transparent local FAQ prototype. Replace with a secure API later.
const facts=[
  {keys:['who','excellence','about'],answer:'Excellence Odimegwu is a Computer Science student at the University of Nigeria, Nsukka. He is exploring AI engineering, cybersecurity, product design and web development, and enjoys turning ideas into useful technology.'},
  {keys:['student','management','stat'],answer:'The Student Management System is an ongoing React and Python Flask project. It began as an admin-focused student management tool and is intended as a foundation for a broader learning and student-progress experience. It is still in development.'},
  {keys:['mech','lab','gemini'],answer:'AI Mech Lab is an AI-powered engineering learning platform. Excellence’s responsibility is database design and Gemini AI adaptation and integration. Other team members handle the wider API development.'},
  {keys:['cyber','security','cloud'],answer:'Excellence has pursued cybersecurity and cloud-security training and is interested in building secure, trustworthy digital products, including AI-powered applications.'},
  {keys:['skill','technology','stack','code'],answer:'His areas of interest include Python, JavaScript, React, Flask, database design, AI integration, cybersecurity, product design and web development.'},
  {keys:['design','graphic','product'],answer:'Excellence works across product and graphic design, with an interest in making digital products clear, useful and visually engaging.'},
  {keys:['contact','hire','email'],answer:'You can add your preferred professional email and LinkedIn URL to the contact section before publishing this portfolio.'}
];
function answerFor(q){const s=q.toLowerCase();for(const f of facts)if(f.keys.some(k=>s.includes(k)))return f.answer;return 'I’m still learning the details of this universe. Try asking about Excellence, the Student Management System, AI Mech Lab, cybersecurity, design or his technical skills.';}
const chatPanel=document.querySelector('#chatPanel'),chatMessages=document.querySelector('#chatMessages');
function toggleChat(force){const open=force??!chatPanel.classList.contains('open');chatPanel.classList.toggle('open',open);chatPanel.setAttribute('aria-hidden',String(!open));if(open)document.querySelector('#chatInput').focus();}
document.querySelector('#litexLaunch').addEventListener('click',()=>toggleChat());document.querySelector('#chatClose').addEventListener('click',()=>toggleChat(false));
function addBubble(text,who){const b=document.createElement('div');b.className='bubble '+who;b.textContent=text;chatMessages.appendChild(b);chatMessages.scrollTop=chatMessages.scrollHeight;}
function ask(q){if(!q.trim())return;addBubble(q,'user');addBubble(answerFor(q),'bot');}
document.querySelector('#chatForm').addEventListener('submit',e=>{e.preventDefault();const input=document.querySelector('#chatInput');ask(input.value);input.value='';});
document.querySelectorAll('[data-question]').forEach(b=>b.addEventListener('click',()=>ask(b.dataset.question)));

function animate(){requestAnimationFrame(animate);const dt=Math.min(clock.getDelta(),.04),t=clock.elapsedTime;
  if(!reducedMotion){farStars.rotation.y+=dt*.0018;farStars.rotation.x=Math.sin(t*.035)*.018;nearStars.rotation.y-=dt*.0028;nearStars.rotation.x=Math.cos(t*.04)*.025;}
  if(travelling&&!reducedMotion&&!activeWorld){camera.position.z-=dt*1.1;if(camera.position.z < -12)camera.position.z=-12;}
  if(!reducedMotion){camera.position.x+=(targetCamera.x+pointerX*.9-camera.position.x)*Math.min(1,dt*.65);camera.position.y+=(targetCamera.y+pointerY*.55-camera.position.y)*Math.min(1,dt*.65);}
  else{camera.position.x+=(targetCamera.x-camera.position.x)*.04;camera.position.y+=(targetCamera.y-camera.position.y)*.04;}
  camera.position.z+=(targetCamera.z-camera.position.z)*Math.min(1,dt*.75);
  camera.lookAt(camera.position.x*.12,camera.position.y*.12,camera.position.z-24);
  worlds.forEach((w,i)=>{w.group.rotation.y=t*(.12+i*.018);w.ring.rotation.z=t*(.12+i*.02);w.halo.material.opacity=.62+Math.sin(t*1.8+i)*.18;w.satellite.position.set(Math.cos(t*.8+i)*3.2,Math.sin(t*.8+i)*1.5,Math.sin(t*.8+i)*1.3);});
  raycaster.setFromCamera(pointer,camera);const hits=raycaster.intersectObjects(clickable,false);document.body.style.cursor=hits.length?'pointer':'default';
  renderer.render(scene,camera);
}
animate();
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));});
