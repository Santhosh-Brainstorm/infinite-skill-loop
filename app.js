const teachers = [
 {id:1,name:"Arjun K.",initial:"A",color:"purple",skill:"Python basics",category:"Technology",level:"Intermediate",language:"English, Tamil",time:"Today · 5:30 PM",bio:"Can help you write your first programs and understand loops.",rating:"4.9",sessions:12},
 {id:2,name:"Meera S.",initial:"M",color:"orange",skill:"Canva design",category:"Design",level:"Advanced",language:"Tamil, English",time:"Tomorrow · 6:00 PM",bio:"Learn poster layouts, typography and clean visual design.",rating:"4.8",sessions:18},
 {id:3,name:"Rahul P.",initial:"R",color:"blue",skill:"Video editing",category:"Design",level:"Intermediate",language:"English",time:"Today · 6:00 PM",bio:"Beginner-friendly editing workflow and storytelling basics.",rating:"4.7",sessions:9},
 {id:4,name:"Nila R.",initial:"N",color:"pink",skill:"Algebra",category:"Academics",level:"Advanced",language:"Tamil, English",time:"Friday · 5:00 PM",bio:"Breaks difficult algebra topics into simple steps.",rating:"5.0",sessions:15},
 {id:5,name:"Kavin D.",initial:"K",color:"green",skill:"Public speaking",category:"Communication",level:"Intermediate",language:"Tamil",time:"Saturday · 11:00 AM",bio:"Practice clear introductions, confidence and speech structure.",rating:"4.8",sessions:7},
 {id:6,name:"Divya M.",initial:"D",color:"purple",skill:"HTML & CSS",category:"Technology",level:"Advanced",language:"English, Tamil",time:"Today · 5:00 PM",bio:"Build a responsive webpage from scratch, step by step.",rating:"4.9",sessions:21}
];
let selectedTeacher = null;
let categoryFilter = "all";
let incoming = [
 {id:101,name:"Karthik V.",initial:"K",skill:"Wants to learn HTML",offer:"Can teach basic mathematics",color:"green"},
 {id:102,name:"Ananya P.",initial:"A",skill:"Wants to learn algebra",offer:"Teach-only request",color:"pink"}
];
let accepted = [];
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
function teacherCard(t){return `<article class="teacher-card"><div class="teacher-card-top"><div class="avatar ${t.color}">${t.initial}</div><div><strong>${t.name}</strong><small>★ ${t.rating} · ${t.sessions} sessions</small></div></div><div class="teacher-skill">${t.skill}</div><div class="teacher-meta"><span>${t.category}</span><span>${t.level}</span><span>${t.language}</span></div><p>${t.bio}</p><div class="match-time">◷ ${t.time} · Compatible time found</div><button class="primary-btn" onclick="openRequest(${t.id})">Request to learn →</button></article>`}
function miniTeacher(t){return `<div class="teacher-mini"><div class="avatar ${t.color}">${t.initial}</div><div><strong>${t.name}</strong><small>${t.skill}</small></div><span class="mini-time">${t.time.split("·")[0].trim()}</span></div>`}
function renderTeachers(){const q=($("#skill-search")?.value||"").toLowerCase();const level=$("#level-filter")?.value||"all";const list=teachers.filter(t=>(categoryFilter==="all"||t.category===categoryFilter)&&(level==="all"||t.level===level)&&(`${t.skill} ${t.name} ${t.category} ${t.bio}`).toLowerCase().includes(q));$("#teacher-grid").innerHTML=list.length?list.map(teacherCard).join(""):`<div class="panel-card">No matching teachers in this demo. Try another skill or filter.</div>`}
function renderHome(){$("#home-teachers").innerHTML=teachers.slice(0,3).map(miniTeacher).join("")}
function renderRequests(){
 $("#incoming-count").textContent=`${incoming.length} pending`;
 $("#request-count").textContent=incoming.length;
 $("#incoming-requests").innerHTML=incoming.length?incoming.map(r=>`<div class="request-item"><div class="avatar ${r.color}">${r.initial}</div><div class="request-info"><strong>${r.name}</strong><small>${r.skill}<br>${r.offer}</small></div><div class="request-actions"><button class="small-btn accept" onclick="respond(${r.id},'accept')">Accept</button><button class="small-btn reject" onclick="respond(${r.id},'decline')">×</button></div></div>`).join(""):`<p class="muted">No pending requests. You're all caught up.</p>`;
 $("#active-loops").innerHTML=(accepted.length?accepted.map(a=>`<div class="active-loop"><div class="avatar purple">${a.initial}</div><div><b>${a.name}</b><small>${a.mode} · ${a.skill}</small></div><span class="loop-status">Connected ✓</span></div>`).join(""):`<p class="muted">Your accepted connections will appear here.</p>`);
}
function openRequest(id){selectedTeacher=teachers.find(t=>t.id===id);$("#modal-person").innerHTML=`<div class="avatar ${selectedTeacher.color}">${selectedTeacher.initial}</div><div><b>${selectedTeacher.name} · ${selectedTeacher.skill}</b><small>${selectedTeacher.level} · ${selectedTeacher.language}</small></div>`;$("#modal-backdrop").classList.remove("hidden")}
function closeModal(){$("#modal-backdrop").classList.add("hidden")}
function toast(msg){const el=$("#toast");el.textContent=msg;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2600)}
function sendChoice(choice){if(choice==="decline"){closeModal();return}const mode=choice==="mutual"?"Mutual skill exchange":"Teach-only";toast(`Demo request sent to ${selectedTeacher.name}: ${mode}`);closeModal();accepted.push({name:selectedTeacher.name,initial:selectedTeacher.initial,skill:selectedTeacher.skill,mode:"Request sent"});renderRequests();go("loop")}
function respond(id,action){const r=incoming.find(x=>x.id===id);if(!r)return;if(action==="accept"){accepted.push({name:r.name,initial:r.initial,skill:r.skill.replace("Wants to learn ",""),mode:"Connection accepted"});toast(`Connected with ${r.name}. You can now plan a learning session.`)}else toast(`Request from ${r.name} declined.`);incoming=incoming.filter(x=>x.id!==id);renderRequests()}
function go(page){$$(".page").forEach(p=>p.classList.remove("active"));$(`#page-${page}`).classList.add("active");$$(".nav-btn").forEach(b=>b.classList.toggle("active",b.dataset.page===page));const titles={home:"Your learning loop",explore:"Explore skills",loop:"My learning loop",rank:"Community rank",profile:"My skill profile"};$("#page-title").textContent=titles[page];if(page==="loop")renderRequests();window.scrollTo({top:0,behavior:"smooth"})}
$$(".nav-btn").forEach(b=>b.addEventListener("click",()=>go(b.dataset.page)));
$$("[data-goto]").forEach(b=>b.addEventListener("click",()=>go(b.dataset.goto)));
$("#skill-search").addEventListener("input",renderTeachers);$("#level-filter").addEventListener("change",renderTeachers);
$$(".filter-chip").forEach(b=>b.addEventListener("click",()=>{categoryFilter=b.dataset.filter;$$(".filter-chip").forEach(x=>x.classList.toggle("active",x===b));renderTeachers()}));
$("#modal-close").addEventListener("click",closeModal);$("#modal-backdrop").addEventListener("click",e=>{if(e.target.id==="modal-backdrop")closeModal()});
$$(".choice-card").forEach(b=>b.addEventListener("click",()=>sendChoice(b.dataset.choice)));
$$(".like-btn").forEach(b=>b.addEventListener("click",()=>{const s=b.querySelector("span");const liked=b.classList.toggle("liked");s.textContent=Number(s.textContent)+(liked?1:-1);b.firstChild.textContent=liked?"♥ ":"♡ "}));
$$(".rank-tab").forEach(b=>b.addEventListener("click",()=>{$$(".rank-tab").forEach(x=>x.classList.toggle("active",x===b));toast(`${b.textContent} view selected (sample leaderboard)`)}));
const leaders=[["1","Meera S.","Design · 4 skills shared","1,240"],["2","Arjun K.","Technology · 3 skills shared","1,080"],["3","Nila R.","Academics · 3 skills shared","940"],["4","Divya M.","Technology · 2 skills shared","810"],["5","Kavin D.","Communication · 2 skills shared","720"]];
$("#leaderboard").innerHTML=leaders.map(x=>`<div class="leader-row"><span class="leader-position">#${x[0]}</span><div class="leader-avatar">${x[1][0]}</div><div class="leader-name">${x[1]}<small>${x[2]}</small></div><span class="leader-points">${x[3]} pts</span></div>`).join("");
renderHome();renderTeachers();renderRequests();


// ===== Interactive profile, local database and learning timeline =====
const DB_NAME = "InfiniteSkillLoopDB", DB_VERSION = 1;
let db = null, authMode = "signup", currentUser = null;
let profileData = {name:"Student Demo",institution:"Demo High School",grade:"Grade 10",languages:"English, Tamil",
  teach:["Basic HTML","Mathematics"],learn:["Python","Video editing","UI design"],availability:"Weekdays · 5:00 PM – 7:00 PM",
  skillsExplored:3,sessionsJoined:2,skillsShared:1,xp:120};
function openLocalDB(){
 return new Promise((resolve,reject)=>{
  if(!("indexedDB" in window)){resolve(null);return}
  const req=indexedDB.open(DB_NAME,DB_VERSION);
  req.onupgradeneeded=()=>{const d=req.result;if(!d.objectStoreNames.contains("accounts"))d.createObjectStore("accounts",{keyPath:"email"});if(!d.objectStoreNames.contains("profiles"))d.createObjectStore("profiles",{keyPath:"email"});if(!d.objectStoreNames.contains("connections"))d.createObjectStore("connections",{keyPath:"id"})};
  req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);
 });
}
function dbRequest(store,mode,action,value){
 return new Promise((resolve,reject)=>{if(!db){resolve(null);return}const tx=db.transaction(store,mode),req=tx.objectStore(store)[action](value);req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error)});
}
function persistProfile(){if(currentUser&&db)dbRequest("profiles","readwrite","put",{email:currentUser.email,...profileData}).catch(()=>{});}
function safeText(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function renderProfile(){
 $("#profile-name").textContent=profileData.name;$("#profile-avatar").textContent=(profileData.name[0]||"S").toUpperCase();
 $("#profile-meta").textContent=`${profileData.institution} · ${profileData.grade} · ${profileData.languages}`;
 $("#teach-tags").innerHTML=profileData.teach.map(x=>`<span>${safeText(x)}</span>`).join("")||'<small class="muted">Add a skill you can share.</small>';
 $("#learn-tags").innerHTML=profileData.learn.map(x=>`<span>${safeText(x)}</span>`).join("")||'<small class="muted">Add a learning goal.</small>';
 $("#availability-label").textContent=profileData.availability;
 $("#skills-count").textContent=profileData.skillsExplored;$("#sessions-count").textContent=profileData.sessionsJoined;$("#shared-count").textContent=profileData.skillsShared;
 const level=Math.floor(profileData.xp/100)+1,progress=profileData.xp%100;
 $("#xp-label").textContent=`Level ${level} · ${level<3?"Skill Explorer":level<5?"Knowledge Builder":"Loop Champion"}`;
 $("#xp-value").textContent=`${progress} / 100 XP`;$("#xp-fill").style.width=progress+"%";
 const badges=[["🌱","First steps",profileData.skillsExplored>0],["🤝","Skill sharer",profileData.skillsShared>0],["🔥","Consistent learner",profileData.sessionsJoined>=2],["♾️","Loop creator",accepted.length>=2]];
 $("#achievement-row").innerHTML=badges.map(([icon,label,earned])=>`<div class="achievement ${earned?"earned":""}"><span>${icon}</span><b>${label}</b><small>${earned?"Unlocked":"Keep learning to unlock"}</small></div>`).join("");
 $("#profile-completion").textContent=`PROFILE ${Math.min(100,50+(profileData.teach.length+profileData.learn.length)*5)}% COMPLETE`;
}
function renderTimeline(){
 const root=$("#active-loops");
 if(!accepted.length){root.innerHTML='<div class="timeline-empty"><div class="empty-orbit">∞</div><b>Your learning story begins here</b><p>Accept a request or connect with a teacher. Each new connection becomes a milestone in your timeline.</p><button class="outline-btn" onclick="go(&quot;explore&quot;)">Discover a skill partner →</button></div>';return}
 root.innerHTML=`<div class="timeline-track">${accepted.map((a,i)=>`<div class="timeline-event"><div class="timeline-dot">${i+1}</div><div class="timeline-card"><div class="timeline-top"><span class="timeline-kicker">LOOP MILESTONE ${String(i+1).padStart(2,"0")}</span><span class="loop-status">${safeText(a.mode||"Connected")} ✓</span></div><h4>${safeText(a.name)}</h4><p>Learning path: <b>${safeText(a.skill)}</b></p><div class="timeline-progress"><i style="width:${Math.min(100,25+i*20)}%"></i></div><small>${i===0?"Connection started · Next: agree on a roadmap":"Added to your growing skill network"}</small><button class="small-btn accept timeline-action" onclick="advanceLoop(${i})">Complete milestone +20 XP</button></div></div>`).join("")}</div>`;
}
window.advanceLoop=function(i){const a=accepted[i];if(!a)return;a.progress=(a.progress||0)+1;profileData.xp+=20;profileData.sessionsJoined+=1;persistProfile();renderProfile();renderTimeline();toast("Milestone completed! +20 XP earned.");};
function renderRequests(){
 $("#incoming-count").textContent=`${incoming.length} pending`;$("#request-count").textContent=incoming.length;
 $("#incoming-requests").innerHTML=incoming.length?incoming.map(r=>`<div class="request-item"><div class="avatar ${r.color}">${r.initial}</div><div class="request-info"><strong>${r.name}</strong><small>${r.skill}<br>${r.offer}</small></div><div class="request-actions"><button class="small-btn accept" onclick="respond(${r.id},'accept')">Accept</button><button class="small-btn reject" onclick="respond(${r.id},'decline')">×</button></div></div>`).join(""):'<p class="muted">No pending requests. You are all caught up.</p>';
 renderTimeline();
}
const originalSendChoice=sendChoice;
sendChoice=function(choice){
 if(choice==="decline"){closeModal();return}
 const mode=choice==="mutual"?"Mutual skill exchange":"Teach-only";
 accepted.push({name:selectedTeacher.name,initial:selectedTeacher.initial,skill:selectedTeacher.skill,mode:"Request sent"});
 profileData.xp+=10;persistProfile();renderProfile();renderRequests();closeModal();toast(`Request sent to ${selectedTeacher.name}. +10 XP`);go("loop");
};
const originalRespond=respond;
respond=function(id,action){
 const r=incoming.find(x=>x.id===id);if(!r)return;
 if(action==="accept"){accepted.push({name:r.name,initial:r.initial,skill:r.skill.replace("Wants to learn ",""),mode:"Connection accepted"});profileData.xp+=20;profileData.skillsShared+=1;persistProfile();toast(`Connected with ${r.name}. +20 XP`)}
 else toast(`Request from ${r.name} declined.`);
 incoming=incoming.filter(x=>x.id!==id);renderRequests();renderProfile();
};
function openQuick(kind){
 const isTeach=kind==="teach";$("#quick-title").textContent=isTeach?"Add a skill you can teach":"Add a learning goal";
 $("#quick-label").firstChild.textContent=isTeach?"Skill you can teach":"Skill you want to learn";
 $("#quick-input").value="";$("#quick-form").dataset.kind=kind;$("#quick-modal").classList.remove("hidden");$("#quick-input").focus();
}
function authSetMode(mode){
 authMode=mode;$$(".auth-tab").forEach(b=>b.classList.toggle("active",b.dataset.auth===mode));
 $("#auth-name").closest("label").style.display=mode==="signup"?"grid":"none";$("#auth-extra").style.display=mode==="signup"?"grid":"none";
 $("#auth-submit").textContent=mode==="signup"?"Create my account →":"Log in →";$("#auth-error").textContent="";
}
async function enterApp(account){
 currentUser=account;$("#auth-gate").classList.add("hidden");$("#auth-user-menu").classList.remove("hidden");
 $("#signed-in-label").textContent=`Signed in: ${account.name}`;
 const saved=await dbRequest("profiles","readonly","get",account.email);
 if(saved){profileData={...profileData,...saved};delete profileData.email}
 else {profileData.name=account.name;profileData.institution=account.institution||"Demo Institution";profileData.grade=account.grade||"Student";persistProfile()}
 renderProfile();renderRequests();
}
$("#auth-form").addEventListener("submit",async e=>{
 e.preventDefault();const email=$("#auth-email").value.trim().toLowerCase(),password=$("#auth-password").value;
 try{
  if(!db)db=await openLocalDB();
  if(authMode==="signup"){
   const exists=await dbRequest("accounts","readonly","get",email);if(exists){$("#auth-error").textContent="An account with this email already exists. Please log in.";return}
   const account={email,password,name:$("#auth-name").value.trim(),institution:$("#auth-institution").value.trim(),grade:$("#auth-grade").value.trim()};
   await dbRequest("accounts","readwrite","put",account);profileData={...profileData,name:account.name,institution:account.institution,grade:account.grade};await dbRequest("profiles","readwrite","put",{email,...profileData});await enterApp(account);
  }else{
   const account=await dbRequest("accounts","readonly","get",email);if(!account||account.password!==password){$("#auth-error").textContent="Email or password is incorrect.";return}await enterApp(account);
  }
 }catch(err){$("#auth-error").textContent="Could not access local database. Try a modern browser.";}
});
$$(".auth-tab").forEach(b=>b.addEventListener("click",()=>authSetMode(b.dataset.auth)));
$("#edit-profile-btn").addEventListener("click",()=>{
 $("#edit-name").value=profileData.name;$("#edit-institution").value=profileData.institution;$("#edit-grade").value=profileData.grade;$("#edit-languages").value=profileData.languages;$("#profile-modal").classList.remove("hidden");
});
$("#profile-modal-close").addEventListener("click",()=>$("#profile-modal").classList.add("hidden"));
$("#profile-edit-form").addEventListener("submit",e=>{
 e.preventDefault();profileData.name=$("#edit-name").value.trim();profileData.institution=$("#edit-institution").value.trim();profileData.grade=$("#edit-grade").value.trim();profileData.languages=$("#edit-languages").value.trim();persistProfile();renderProfile();$("#profile-modal").classList.add("hidden");toast("Profile updated and saved.");
});
$("#add-teach-btn").addEventListener("click",()=>openQuick("teach"));$("#add-learn-btn").addEventListener("click",()=>openQuick("learn"));
$("#quick-modal-close").addEventListener("click",()=>$("#quick-modal").classList.add("hidden"));
$("#quick-form").addEventListener("submit",e=>{
 e.preventDefault();const kind=e.currentTarget.dataset.kind,value=$("#quick-input").value.trim();if(!value)return;
 const arr=kind==="teach"?profileData.teach:profileData.learn;if(!arr.some(x=>x.toLowerCase()===value.toLowerCase()))arr.push(value);
 profileData.xp+=5;persistProfile();renderProfile();$("#quick-modal").classList.add("hidden");toast("Skill saved. +5 XP");
});
$("#availability-btn").addEventListener("click",()=>{
 const val=prompt("Enter your usual availability (example: Weekdays · 5:00 PM – 7:00 PM)",profileData.availability);
 if(val&&val.trim()){profileData.availability=val.trim();persistProfile();renderProfile();toast("Availability updated. Your exact schedule stays private.");}
});
$("#logout-btn").addEventListener("click",()=>{currentUser=null;$("#auth-gate").classList.remove("hidden");$("#auth-user-menu").classList.add("hidden");$("#auth-form").reset();authSetMode("login");});
(async()=>{try{db=await openLocalDB();}catch(e){db=null;}authSetMode("signup");})();
