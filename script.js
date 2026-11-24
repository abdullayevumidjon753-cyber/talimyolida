const $=s=>document.querySelector(s),app=$('#app');
const LS=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}},SV=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
let fav=LS('fav',[]),cmp=LS('cmp',[]),user=LS('user',null);
const NA='Ma’lumot mavjud emas',cn=id=>CATS.find(c=>c[0]==id)[1];
const ALL=[...C.map((c,i)=>({id:'c'+(i+1),k:'c',name:c[0],city:c[1],cats:c[2],rating:c[3],price:c[4],mode:c[5],dur:c[6]})),
...U.map((u,i)=>({id:'u'+(i+1),k:'u',name:u[0],city:u[1],type:u[2],price:u[3],cats:u[4],form:u[5],rating:0}))];
const COURSES=ALL.filter(x=>x.k=='c').flatMap(c=>c.cats.map((t,j)=>({id:c.id+'-'+t,cat:t,title:cn(t)+' kursi',center:c,price:c.price+j*50000,dur:c.dur,mode:c.mode})));
const money=n=>n?n.toLocaleString('ru')+' so‘m':NA,MODE=['Oflayn','Onlayn','Onlayn + oflayn'];
const stars=r=>r?`<span class=star>${'★'.repeat(Math.round(r))}${'☆'.repeat(5-Math.round(r))}</span> ${r}`:'Reyting: '+NA;
const DEMO='<span class="tag demo">Demo ma’lumot</span>';
const cnt=id=>COURSES.filter(c=>c.cat==id).length;
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('on');setTimeout(()=>e.classList.remove('on'),1800)}
function tog(key,id){const a=key=='fav'?fav:cmp,i=a.indexOf(id);
 if(i>=0)a.splice(i,1);else{if(key=='cmp'&&a.length>=4)return toast('Taqqoslash uchun ko‘pi bilan 4 ta tanlang');a.push(id)}
 SV(key,a);toast(i>=0?'Ro‘yxatdan olib tashlandi':'Qo‘shildi');document.querySelectorAll(`[data-${key}="${id}"]`).forEach(b=>b.classList.toggle('on',i<0));bar()}
function bar(){let b=$('#bar');if(cmp.length<2){b&&b.remove();return}if(!b){b=document.createElement('div');b.id='bar';b.className='bar';document.body.append(b)}
 b.innerHTML=`Taqqoslash: ${cmp.length} ta tanlandi <a class=btn href="#/compare">Taqqoslash</a>`}
const ibtn=x=>`<button class="ib ${cmp.includes(x.id)?'on':''}" data-cmp="${x.id}" title="Taqqoslash" onclick="tog('cmp','${x.id}')">⚖️</button><button class="ib ${fav.includes(x.id)?'on':''}" data-fav="${x.id}" title="Sevimli" onclick="tog('fav','${x.id}')">♥</button>`;
const card=x=>`<article class="card reveal"><div class=ico>${x.name.split(' ').pop()[0]}</div><h3>${x.name}</h3><div class=mut>📍 ${x.city}${x.type?' · '+(x.type=='davlat'?'Davlat':'Xususiy')+' universiteti':''}</div>
<div>${x.cats.slice(0,3).map(c=>`<span class=tag>${cn(c)}</span>`).join('')}</div><div>${stars(x.rating)}</div>
<div class=mut>${x.k=='c'?x.cats.length+' ta kurs · '+(x.price?'dan '+money(x.price)+'/oy':NA):x.cats.length+' ta yo‘nalish · '+money(x.price)+'/yil'}</div>${DEMO}
<div class=row><a class=btn href="#/d/${x.id}">Batafsil ko‘rish</a>${ibtn(x)}</div></article>`;
const opts=(a,p)=>`<option value="">${p}</option>`+a.map(o=>`<option value="${o[0]}">${o[1]}</option>`).join('');
const cities=[...new Set(ALL.map(x=>x.city))].map(c=>[c,c]);
function norm(s){return s.toLowerCase().replace(/[‘’'`ʻ]/g,'')}
function listPage(kind,q){
 const isC=kind=='c';app.innerHTML=`<section class=wrap><h2>${isC?'O‘quv markazlari':'Universitetlar'}</h2><p class=sub>Filtrlang, saralang va o‘zingizga mosini toping.</p>
 <div class=filters><input id=fq placeholder="Nom bo‘yicha qidirish"><select id=fc>${opts(cities,'Barcha viloyat/shahar')}</select><select id=fy>${opts(CATS,'Barcha yo‘nalish')}</select>
 ${isC?`<select id=fm><option value="">Onlayn/oflayn</option><option value=0>Oflayn</option><option value=1>Onlayn</option><option value=2>Ikkalasi</option></select><select id=fr><option value=0>Har qanday reyting</option><option value=4>4★ va yuqori</option></select><select id=fd><option value=0>Har qanday davomiylik</option><option value=3>3 oygacha</option><option value=6>6 oygacha</option><option value=12>12 oygacha</option></select>`:
 `<select id=fm><option value="">Davlat va xususiy</option><option value=davlat>Davlat</option><option value=xususiy>Xususiy</option></select>`}
 <select id=fp><option value=0>Har qanday narx</option><option value=${isC?500000:15000000}>${isC?'500 000':'15 mln'} so‘mgacha</option><option value=${isC?800000:30000000}>${isC?'800 000':'30 mln'} so‘mgacha</option></select>
 <select id=fs><option value=r>Reyting bo‘yicha</option><option value=p>Narx: arzonidan</option><option value=n>Nom bo‘yicha</option></select></div><p id=cnt class=mut></p><div id=res class=grid></div></section>`;
 if(q.cat)$('#fy').value=q.cat;if(q.city)$('#fc').value=q.city;
 const g=id=>$('#'+id)?.value,upd=()=>{let l=ALL.filter(x=>x.k==kind);const t=norm(g('fq')||'');
  l=l.filter(x=>(!t||norm(x.name).includes(t))&&(!g('fc')||x.city==g('fc'))&&(!g('fy')||x.cats.includes(g('fy')))&&(!+g('fp')||x.price<=+g('fp')));
  if(isC)l=l.filter(x=>(g('fm')===''||x.mode==g('fm'))&&x.rating>=+g('fr')&&(!+g('fd')||x.dur<=+g('fd')));else if(g('fm'))l=l.filter(x=>x.type==g('fm'));
  const s=g('fs');l.sort((a,b)=>s=='p'?a.price-b.price:s=='n'?a.name.localeCompare(b.name):b.rating-a.rating);
  $('#cnt').textContent=l.length+' ta natija topildi';$('#res').innerHTML=l.length?l.map(card).join(''):'<div class=empty style="grid-column:1/-1"><h3>Hech narsa topilmadi 😕</h3><p>Filtrlarni o‘zgartirib ko‘ring.</p></div>';reveal()};
 document.querySelectorAll('.filters input,.filters select').forEach(e=>e.oninput=upd);upd()}
const row=(a,b)=>`<tr><th style="width:38%">${a}</th><td>${b||NA}</td></tr>`;
function detail(id){const x=ALL.find(a=>a.id==id);if(!x)return location.hash='#/';const map=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(x.name+' '+x.city)}`;
 const cs=COURSES.filter(c=>c.center.id==id);
 app.innerHTML=`<section class=wrap><div class=box><div class=dh><div class=ico>${x.name.split(' ').pop()[0]}</div><div style="flex:1"><h2>${x.name}</h2><div class=mut>📍 ${x.city}</div><div>${stars(x.rating)}</div>${DEMO}</div><div class=row>${ibtn(x)}</div></div></div>
 <div class=box><h3>Asosiy ma’lumotlar</h3><p class=mut>Manba: demo to‘plam · Yangilangan: ${UPDATED}</p><table>
 ${row('Tavsif',NA)}${row('Manzil',x.city+' (aniq manzil: '+NA+')')}${row('Telefon',NA)}${row('Telegram',NA)}${row('Instagram',NA)}${row('Rasmiy sayt',NA)}${row('Ish vaqti',NA)}
 ${x.k=='c'?row('Format',MODE[x.mode])+row('Davomiylik',x.dur+' oy')+row('Boshlang‘ich narx',money(x.price)+' / oy')+row('Qabul shartlari',NA)+row('O‘qitish tili',NA):
 row('Turi',x.type=='davlat'?'Davlat':'Xususiy')+row('Kontrakt narxi',money(x.price)+' / yil')+row('Ta’lim shakli',x.form)+row('Bakalavriat yo‘nalishlari',x.cats.map(cn).join(', '))+row('Magistratura',NA)+row('Qabul muddatlari',NA)+row('Kirish imtihonlari',NA)+row('Yotoqxona',NA)+row('Tarix',NA)}
 </table><div class=row><a class=btn href="${map}" target=_blank rel=noopener>🗺 Xaritada ko‘rish</a><button class="btn g" onclick="toast('Telefon raqami mavjud emas')">📞 Telefon qilish</button><button class="btn g" onclick="toast('Telegram manzili mavjud emas')">✈️ Telegram orqali bog‘lanish</button></div></div>
 ${x.k=='c'?`<div class=box><h3>Kurslar</h3><div class=tw><table><tr><th>Kurs</th><th>Narxi</th><th>Davomiyligi</th><th>Dastur</th></tr>${cs.map(c=>`<tr><td>${c.title}</td><td>${money(c.price)}</td><td>${c.dur} oy</td><td>${NA}</td></tr>`).join('')}</table></div></div>`:''}
 <div class=box><h3>Foydalanuvchi fikrlari</h3><p class=mut>Hozircha fikrlar yo‘q.</p></div></section>`}
function compare(){const l=cmp.map(i=>ALL.find(a=>a.id==i)).filter(Boolean);
 app.innerHTML=`<section class=wrap><h2>Taqqoslash</h2><p class=sub>2–4 ta markaz yoki universitetni yonma-yon ko‘ring.</p>${l.length<2?'<div class=empty><h3>Kamida 2 ta tanlang</h3><p>Ro‘yxatlarda ⚖️ tugmasini bosing.</p><br><a class=btn href="#/centers">Markazlarga o‘tish</a></div>':
 `<div class=tw><table><tr><th></th>${l.map(x=>`<th>${x.name}</th>`).join('')}</tr>${[['Narx',x=>money(x.price)],['Joylashuv',x=>x.city],['Davomiylik',x=>x.dur?x.dur+' oy':NA],['Yo‘nalishlar',x=>x.cats.map(cn).join(', ')],['Reyting',x=>x.rating||NA],['Format',x=>x.k=='c'?MODE[x.mode]:x.form],['Telefon',x=>NA],['Qo‘shimcha',x=>x.k=='u'?(x.type=='davlat'?'Davlat':'Xususiy'):NA]].map(r=>`<tr><th>${r[0]}</th>${l.map(x=>`<td>${r[1](x)}</td>`).join('')}</tr>`).join('')}</table></div><p class=mut>${DEMO}</p>`}</section>`}
function search(q){const t=norm(q.q||'').split(/\s+/).filter(w=>w&&!/^(kurs|markaz|universitet)/.test(w)),uni=/universitet/i.test(q.q||''),pr=/xususiy/i.test(q.q||'');
 const hit=x=>{const h=norm(x.name+' '+x.city+' '+x.cats.map(c=>cn(c)+' '+CATS.find(a=>a[0]==c)[3]).join(' ')+(x.type||''));return t.every(w=>h.includes(w.length>5?w.slice(0,5):w))};
 let r=ALL.filter(hit);if(uni)r=r.filter(x=>x.k=='u');if(pr)r=r.filter(x=>x.type=='xususiy');
 app.innerHTML=`<section class=wrap><h2>Qidiruv: “${(q.q||'').replace(/</g,'')}”</h2><p class=sub>${r.length} ta natija</p><div class=grid>${r.length?r.map(card).join(''):''}</div>${r.length?'':'<div class=empty><h3>Hech narsa topilmadi 😕</h3><p>Boshqa kalit so‘z yoki shahar nomini sinab ko‘ring.</p></div>'}</section>`}
function courses(q){const l=COURSES.filter(c=>!q.cat||c.cat==q.cat);
 app.innerHTML=`<section class=wrap><h2>Kurslar</h2><p class=sub>${l.length} ta kurs ${DEMO}</p><div class=filters><select onchange="location.hash='#/courses?cat='+this.value">${opts(CATS,'Barcha yo‘nalish')}</select></div><div class=tw><table><tr><th>Kurs</th><th>Markaz</th><th>Narx</th><th>Davomiylik</th><th>Format</th><th>Boshlanishi</th></tr>${l.map(c=>`<tr><td>${c.title}</td><td><a href="#/d/${c.center.id}" style="color:var(--ac)">${c.center.name}</a></td><td>${money(c.price)}</td><td>${c.dur} oy</td><td>${MODE[c.mode]}</td><td>${NA}</td></tr>`).join('')}</table></div></section>`;if(q.cat)document.querySelector('.filters select').value=q.cat}
const dirs=()=>`<div class=grid>${CATS.map(c=>`<a class="card reveal" href="#/centers?cat=${c[0]}"><div class=ico>${c[2]}</div><h3>${c[1]}</h3><div class=mut>${cnt(c[0])} ta kurs mavjud</div><p class=mut>${c[1]} bo‘yicha markaz va kurslarni toping.</p></a>`).join('')}</div>`;
function home(){app.innerHTML=`<div class=hero><i class="orb o1"></i><i class="orb o2"></i><div class=wrap><h1>Kelajagingiz uchun eng to‘g‘ri ta’lim yo‘lini tanlang.</h1><p>O‘zbekiston bo‘ylab universitetlar, o‘quv markazlari va professional kurslarni bir joydan toping.</p>
 <div class=sbox><input id=hs placeholder="Masalan: Toshkent Python kurslari" autocomplete=off><button class=btn onclick="go()">Qidirish</button><div id=sg class=sug hidden></div></div></div></div>
 <section class=wrap><h2>Ta’lim yo‘nalishlari</h2><p class=sub>Qiziqqan yo‘nalishingizni tanlang.</p>${dirs()}</section>
 <section class=wrap><h2>Mashhur o‘quv markazlari</h2><p class=sub>Demo ma’lumotlar asosida</p><div class=grid>${ALL.filter(x=>x.k=='c').slice(0,4).map(card).join('')}</div></section>`;
 const i=$('#hs');i.onkeydown=e=>e.key=='Enter'&&go();i.oninput=()=>{const t=norm(i.value);const s=t?[...CATS.map(c=>[c[1],'#/centers?cat='+c[0]]),...ALL.map(x=>[x.name,'#/d/'+x.id])].filter(a=>norm(a[0]).includes(t)).slice(0,6):[];$('#sg').hidden=!s.length;$('#sg').innerHTML=s.map(a=>`<a href="${a[1]}">${a[0]}</a>`).join('')}}
const go=()=>location.hash='#/search?q='+encodeURIComponent($('#hs').value);
function support(){app.innerHTML=`<section class=wrap><h2>Qo‘llab-quvvatlash</h2><p class=sub>Savol, taklif yoki xatolik bo‘lsa, yozing.</p><div class=grid>
 <div class=card><h3>Telegram</h3><p class=mut>@moggerrrrrrr</p><a class=btn href="https://t.me/moggerrrrrrr" target=_blank rel=noopener>Telegramga o‘tish</a></div>
 <div class=card><h3>Instagram</h3><p class=mut>moggerr.gg</p><a class=btn href="https://www.instagram.com/moggerr.gg/" target=_blank rel=noopener>Instagramga o‘tish</a></div>
 <div class=card><h3>Sayt haqida</h3><p class=mut>TalimYolida — O‘zbekistondagi ta’lim muassasalarini bir joyda topish va taqqoslash platformasi.</p></div>
 <div class=card><h3>Taklif, shikoyat va xatolik</h3><p class=mut>Telegram orqali yozing va “Taklif”, “Shikoyat” yoki “Xatolik” deb belgilang.</p><a class="btn g" href="https://t.me/moggerrrrrrr" target=_blank rel=noopener>Xabar yuborish</a></div></div></section>`}
function me(){if(!user){app.innerHTML=`<section class=wrap><h2>Kirish / Ro‘yxatdan o‘tish</h2><p class=sub>Demo rejim: ma’lumotlar faqat shu brauzerda saqlanadi.</p><div class=box style="max-width:420px"><div class=filters style="border:0;padding:0"><input id=un placeholder="Ism"><input id=uf placeholder="Familiya"></div><br><button class=btn onclick="user={n:$('#un').value||'Foydalanuvchi',f:$('#uf').value};SV('user',user);authUI();me()">Davom etish</button></div></section>`;return}
 const L=a=>a.map(i=>ALL.find(x=>x.id==i)).filter(Boolean);app.innerHTML=`<section class=wrap><div class=box><div class=dh><div class=ico>${user.n[0]}</div><div><h2>${user.n} ${user.f||''}</h2><p class=mut>Demo profil</p></div><button class="btn g" onclick="user=null;SV('user',null);authUI();me()">Chiqish</button></div></div>
 <h3>Sevimlilar</h3><br><div class=grid>${L(fav).map(card).join('')||'<p class=mut>Hozircha bo‘sh.</p>'}</div><br><h3>Taqqoslash ro‘yxati</h3><br><div class=grid>${L(cmp).map(card).join('')||'<p class=mut>Hozircha bo‘sh.</p>'}</div></section>`}
const authUI=()=>$('#auth').innerHTML=user?`<a class="btn g" href="#/me">👤 ${user.n}</a>`:`<a class="btn g" href="#/me">Kirish</a><a class=btn href="#/me">Ro‘yxatdan o‘tish</a>`;
function reveal(){const o=new IntersectionObserver(e=>e.forEach(a=>a.isIntersecting&&(a.target.classList.add('in'),o.unobserve(a.target))),{threshold:.08});document.querySelectorAll('.reveal:not(.in)').forEach(e=>o.observe(e))}
function route(){const[p,qs]=(location.hash.slice(2)||'home').split('?'),q=Object.fromEntries(new URLSearchParams(qs||'')),[pg,id]=p.split('/');
 ({home,dirs:()=>{app.innerHTML=`<section class=wrap><h2>Ta’lim yo‘nalishlari</h2><p class=sub>20 ta yo‘nalish</p>${dirs()}</section>`},centers:()=>listPage('c',q),unis:()=>listPage('u',q),courses:()=>courses(q),compare,support,me,search:()=>search(q),d:()=>detail(id)}[pg]||home)();
 window.scrollTo(0,0);$('nav').classList.remove('open');document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')=='#/'+pg||(pg=='home'&&a.getAttribute('href')=='#/')));reveal();bar()}
addEventListener('hashchange',route);addEventListener('load',()=>{authUI();route();$('#loader').style.opacity=0;setTimeout(()=>$('#loader').remove(),500)});
