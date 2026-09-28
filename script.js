const categories=[
['🧱','Construction ka kaam','Raj Mistri (Mason)','#f3e6df'],
['🎨','Paint karna','Painter / Paint Mistri','#f3e8fb'],
['🧩','Tiles lagana','Tile Mistri / Tile Installer','#e6f0f7'],
['🚰','Paani aur pipe fitting','Plumber / Nal Mistri','#e4eefb'],
['🔌','Bijli ka kaam','Electrician','#fdf6d8'],
['🪚','Lakdi aur furniture','Carpenter (Badhai)','#fbedcf'],
['🔲','False Ceiling (POP/Gypsum)','False Ceiling Mistri / POP Mistri','#eef0f2'],
['🪟','Aluminium door-window','Aluminium Fabricator','#e7f1fb'],
['🔷','Glass lagana','Glass Installer / Glazier','#e6f6fb'],
['🔩','Steel grill, gate, railing','Welder / Fabricator','#efeef0'],
['🪨','Marble aur Granite','Marble Mistri / Granite Installer','#f2ede6'],
['❄️','AC lagana aur repair','AC Technician','#e3f4fb'],
['📹','CCTV lagana','CCTV Technician','#eceef2'],
['🌞','Solar panel lagana','Solar Technician','#fdf3d6'],
['🛋️','Interior design','Interior Designer','#f6e9f1'],
['🏗️','Ghar ka naksha aur planning','Architect','#e9f0eb'],
['🧹','House Cleaning','House Cleaner','#e5f7ec'],
['🚽','Bathroom and Toilet Cleaning','Bathroom Cleaning Specialist','#e6f7f3'],
['🛢️','Water Tank Cleaning','Tank Cleaning Technician','#e3f0f9']
];

const providers=[
{name:'Aman Kumar',service:'Electrician',rating:'4.8',icon:'⚡',phone:'9876543210',city:'Patna',bio:'Electrical installation, wiring and home electrical repair.'},
{name:'Rahul Sharma',service:'Plumber',rating:'4.7',icon:'🔧',phone:'9876543211',city:'Patna',bio:'Plumbing repair, leakage fixing and bathroom work.'},
{name:'Neha Singh',service:'House Cleaning',rating:'4.9',icon:'🧹',phone:'9876543212',city:'Patna',bio:'Home and office cleaning services.'},
{name:'Vikash Kumar',service:'AC Repair',rating:'4.6',icon:'❄️',phone:'9876543213',city:'Patna',bio:'AC service, installation and cooling repair.'},
{name:'Pooja Devi',service:'Beauty Service',rating:'4.8',icon:'💇',phone:'9876543214',city:'Patna',bio:'At-home beauty and grooming services.'},
{name:'Ravi Raj',service:'Carpenter',rating:'4.7',icon:'🪚',phone:'9876543215',city:'Patna',bio:'Furniture repair, fitting and carpentry work.'}
];

const state={
 logged:localStorage.getItem('servoLoggedIn')==='true',
 name:localStorage.getItem('servoName')||'User',
 email:localStorage.getItem('servoEmail')||'',
 role:localStorage.getItem('servoRole')||'Customer'
};
const $=s=>document.querySelector(s);

function showTab(id){
 document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
 const el=document.getElementById(id); if(el) el.classList.add('active');
 window.scrollTo({top:0,behavior:'smooth'});
 if(id==='providers')renderProviders($('#providerSearch')?.value||'');
}

function renderCategories(target,arr=categories){
 $(target).innerHTML=arr.map((c,i)=>`
 <button class="category-card" style="animation-delay:${i*35}ms" onclick="findService(${i})">
  <div class="category-icon" style="background:${c[3]}">${c[0]}</div>
  <h3>${c[1]}</h3><p>${c[2]}</p>
 </button>`).join('');
}
function findService(i){
 const term=categories[i][1];
 showTab('providers');
 $('#providerSearch').value=term;
 renderProviders(term);
}
function searchHome(){
 const q=$('#homeSearch').value.trim();
 showTab('providers');
 $('#providerSearch').value=q;
 renderProviders(q);
}
function renderProviders(q=''){
 const term=q.toLowerCase();
 const list=providers.filter(p=>(p.name+' '+p.service+' '+p.city+' '+p.bio).toLowerCase().includes(term));
 $('#providerGrid').innerHTML=list.map((p,i)=>`
 <article class="provider-card" style="animation-delay:${i*50}ms">
  <div class="provider-top"><div class="provider-avatar">${p.icon}</div><div><h3>${p.name}</h3><div class="provider-meta">${p.service} • ${p.city}</div></div></div>
  <div class="rating">⭐ ${p.rating}</div><div class="provider-bio">${p.bio}</div>
  <div class="actions"><button class="view-btn" onclick="viewProvider('${p.name}')">View Profile</button><button class="contact-btn" onclick="contactProvider('${p.name}')">Call / Message</button></div>
 </article>`).join('') || '<p style="grid-column:1/-1;text-align:center;color:#777">No providers found.</p>';
}
function viewProvider(name){
 const p=providers.find(x=>x.name===name); if(!p)return;
 openModal(`<button class="close" onclick="closeModal()">×</button>
 <div class="profile-avatar-large">${p.icon}</div><h2 style="text-align:center">${p.name}</h2>
 <p style="text-align:center"><b>${p.service}</b> • ${p.city}<br>⭐ ${p.rating}</p>
 <p>${p.bio}</p>
 <button class="modal-main-btn" onclick="contactProvider('${p.name}')">Call / Message</button>`);
}
function contactProvider(name){
 const p=providers.find(x=>x.name===name); if(!p)return;
 if(!state.logged){login(name);return}
 openModal(`<button class="close" onclick="closeModal()">×</button><h2>Contact ${p.name}</h2>
 <p>Choose how you want to contact this provider.</p>
 <button class="modal-main-btn" onclick="location.href='tel:${p.phone}'">📞 Call ${p.phone}</button>
 <button class="modal-secondary" onclick="location.href='sms:${p.phone}'">💬 Message</button>`);
}
function openProfile(){
 if(!state.logged){login();return}
 openModal(`<button class="close" onclick="closeModal()">×</button>
 <div class="profile-avatar-large">👤</div><h2 style="text-align:center">${state.name}</h2>
 <p style="text-align:center">${state.email}</p>
 <button class="modal-main-btn" onclick="chooseRole()">👨‍🔧 Provider / Worker</button>
 <button class="modal-secondary" onclick="editProfile()">✏️ Edit Profile</button>
 <button class="modal-secondary" onclick="logout()">Logout</button>`);
}
function login(returnName=''){
 openModal(`<button class="close" onclick="closeModal()">×</button><h2>Login to Servo</h2>
 <p>Login is required before you can call or message a provider.</p>
 <input id="loginEmail" type="email" placeholder="Email">
 <input id="loginPassword" type="password" placeholder="Password">
 <button class="modal-main-btn" onclick="doLogin()">Login</button>
 <button class="modal-secondary" onclick="signup()">Create new account</button>
 <div class="notice">OTP verification is skipped. This web demo stores login locally.</div>`);
}
function signup(){
 openModal(`<button class="close" onclick="closeModal()">×</button><h2>Create account</h2>
 <input id="signupName" placeholder="Full name"><input id="signupEmail" type="email" placeholder="Email">
 <input id="signupPassword" type="password" placeholder="Password">
 <button class="modal-main-btn" onclick="doSignup()">Create Account</button>
 <div class="notice">OTP verification is skipped as requested.</div>`);
}
function doLogin(){
 const email=$('#loginEmail').value.trim(); if(!email)return alert('Please enter your email.');
 state.logged=true;state.email=email;state.name=email.split('@')[0];state.role='Customer';save();closeModal();
}
function doSignup(){
 const name=$('#signupName').value.trim(),email=$('#signupEmail').value.trim();
 if(!name||!email)return alert('Please enter name and email.');
 state.logged=true;state.name=name;state.email=email;state.role='Customer';save();closeModal();
}
function chooseRole(){
 openModal(`<button class="close" onclick="closeModal()">×</button><h2>Choose your role</h2><p>You can use the same account as a customer or service provider.</p>
 <div class="role-grid"><button class="role-card" onclick="setRole('Customer')">👤<br><b>Customer</b><br><small>Find and contact services</small></button>
 <button class="role-card" onclick="setRole('Provider / Worker')">👨‍🔧<br><b>Provider / Worker</b><br><small>Offer your services</small></button></div>`);
}
function setRole(role){
 state.role=role;save();
 if(role==='Provider / Worker') workerProfile(); else openProfile();
}
function workerProfile(){
 openModal(`<button class="close" onclick="closeModal()">×</button><h2>Provider / Worker Profile</h2>
 <p>Create or edit the service information customers will see.</p>
 <input id="workerService" placeholder="Service name">
 <input id="workerCity" placeholder="City">
 <textarea id="workerBio" placeholder="About your service"></textarea>
 <button class="modal-main-btn" onclick="saveWorker()">Save Profile</button>`);
}
function saveWorker(){
 localStorage.setItem('servoWorkerService',$('#workerService').value.trim());
 localStorage.setItem('servoWorkerCity',$('#workerCity').value.trim());
 localStorage.setItem('servoWorkerBio',$('#workerBio').value.trim());
 alert('Provider profile saved.');closeModal();
}
function editProfile(){
 openModal(`<button class="close" onclick="closeModal()">×</button><h2>Edit Profile</h2>
 <input id="editName" value="${escapeHtml(state.name)}" placeholder="Full name">
 <input id="editEmail" value="${escapeHtml(state.email)}" placeholder="Email">
 <button class="modal-main-btn" onclick="saveProfile()">Save Changes</button>`);
}
function saveProfile(){
 state.name=$('#editName').value.trim()||state.name;state.email=$('#editEmail').value.trim()||state.email;save();closeModal();
}
function save(){
 localStorage.setItem('servoLoggedIn',String(state.logged));
 localStorage.setItem('servoName',state.name);
 localStorage.setItem('servoEmail',state.email);
 localStorage.setItem('servoRole',state.role);
}
function logout(){state.logged=false;state.role='Customer';save();closeModal()}
function openModal(html){$('#modal').innerHTML=html;$('#overlay').classList.add('show')}
function closeModal(){$('#overlay').classList.remove('show')}
function overlayClose(e){if(e.target.id==='overlay')closeModal()}
function toggleFaq(i){const answers=document.querySelectorAll('.faq-answer');answers[i].classList.toggle('open')}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}

renderCategories('#categoryGrid');
renderCategories('#serviceGrid');
renderProviders();
