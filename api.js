const r=require('express').Router(),db=require('./db'),bcrypt=require('bcryptjs'),jwt=require('jsonwebtoken');
const wrap=f=>(q,s,n)=>Promise.resolve(f(q,s,n)).catch(n);
const auth=(q,s,n)=>{try{q.uid=jwt.verify((q.headers.authorization||'').replace('Bearer ',''),process.env.JWT_SECRET).uid;n()}catch{s.status(401).json({error:'Kirish talab qilinadi'})}};
const tok=u=>jwt.sign({uid:u.id},process.env.JWT_SECRET,{expiresIn:'7d'});
const str=(v,max)=>typeof v=='string'&&v.trim().length>0&&v.length<=max;
r.get('/regions',wrap(async(q,s)=>s.json((await db.query('SELECT * FROM regions ORDER BY id')).rows)));
r.get('/categories',wrap(async(q,s)=>s.json((await db.query('SELECT * FROM categories ORDER BY name')).rows)));
r.get('/institutions',wrap(async(q,s)=>{const p=[],w=['i.published'],add=(sql,v)=>{p.push(v);w.push(sql.replaceAll('?','$'+p.length))},x=q.query;
 if(x.q)add('(i.name ILIKE ? OR i.city ILIKE ? OR EXISTS(SELECT 1 FROM courses c WHERE c.institution_id=i.id AND c.title ILIKE ?))','%'+String(x.q).slice(0,100)+'%');
 if(['university','center'].includes(x.kind))add('i.kind=?',x.kind);
 if(['public','private'].includes(x.ownership))add('i.ownership=?',x.ownership);
 if(+x.region)add('i.region_id=?',+x.region);
 if(x.category)add('EXISTS(SELECT 1 FROM institution_categories ic WHERE ic.institution_id=i.id AND ic.category_id=?)',String(x.category));
 if(['offline','online','both'].includes(x.format))add('(i.format=? OR i.format=\'both\')',x.format);
 if(+x.maxPrice)add('i.price_min<=?',+x.maxPrice);
 if(+x.minRating)add('rt.avg>=?',+x.minRating);
 const ord={rating:'rt.avg DESC NULLS LAST',price:'i.price_min ASC NULLS LAST',name:'i.name'}[x.sort]||'rt.avg DESC NULLS LAST';
 const {rows}=await db.query(`SELECT i.*,rt.avg rating,rt.n reviews,(SELECT count(*) FROM institution_categories ic WHERE ic.institution_id=i.id) programs
  FROM institutions i LEFT JOIN LATERAL(SELECT round(avg(rating),1) avg,count(*) n FROM reviews WHERE institution_id=i.id) rt ON true
  WHERE ${w.join(' AND ')} ORDER BY ${ord} LIMIT 50`,p);s.json(rows)}));
r.get('/institutions/:id(\\d+)',wrap(async(q,s)=>{const id=+q.params.id,i=(await db.query('SELECT * FROM institutions WHERE id=$1 AND published',[id])).rows[0];
 if(!i)return s.status(404).json({error:'Topilmadi'});
 const [c,so,rv]=await Promise.all([db.query('SELECT * FROM courses WHERE institution_id=$1',[id]),db.query('SELECT url,checked_at,verified FROM data_sources WHERE institution_id=$1',[id]),
 db.query('SELECT r.id,r.rating,r.body,r.created_at,u.name FROM reviews r JOIN users u ON u.id=r.user_id WHERE institution_id=$1 ORDER BY r.created_at DESC LIMIT 50',[id])]);
 s.json({...i,courses:c.rows,sources:so.rows,reviews:rv.rows})}));
r.post('/auth/register',wrap(async(q,s)=>{const {email,name,password}=q.body||{};
 if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email||'')||!str(name,80)||!str(password,200)||password.length<8)return s.status(400).json({error:'Email, ism va kamida 8 belgili parol kerak'});
 try{const u=(await db.query('INSERT INTO users(email,name,password_hash) VALUES($1,$2,$3) RETURNING id,email,name',[email.toLowerCase(),name.trim(),await bcrypt.hash(password,12)])).rows[0];s.status(201).json({token:tok(u),user:u})}
 catch(e){if(e.code=='23505')return s.status(409).json({error:'Bu email band'});throw e}}));
r.post('/auth/login',wrap(async(q,s)=>{const {email,password}=q.body||{};
 const u=(await db.query('SELECT * FROM users WHERE email=$1',[String(email||'').toLowerCase()])).rows[0];
 if(!u||!(await bcrypt.compare(String(password||''),u.password_hash)))return s.status(401).json({error:'Email yoki parol noto‘g‘ri'});
 s.json({token:tok(u),user:{id:u.id,email:u.email,name:u.name}})}));
r.get('/me',auth,wrap(async(q,s)=>s.json((await db.query('SELECT id,email,name,email_verified FROM users WHERE id=$1',[q.uid])).rows[0])));
r.get('/favorites',auth,wrap(async(q,s)=>s.json((await db.query('SELECT i.* FROM favorites f JOIN institutions i ON i.id=f.institution_id WHERE f.user_id=$1',[q.uid])).rows)));
r.put('/favorites/:id(\\d+)',auth,wrap(async(q,s)=>{try{await db.query('INSERT INTO favorites VALUES($1,$2) ON CONFLICT DO NOTHING',[q.uid,+q.params.id]);s.status(204).end()}catch(e){if(e.code=='23503')return s.status(404).json({error:'Topilmadi'});throw e}}));
r.delete('/favorites/:id(\\d+)',auth,wrap(async(q,s)=>{await db.query('DELETE FROM favorites WHERE user_id=$1 AND institution_id=$2',[q.uid,+q.params.id]);s.status(204).end()}));
r.post('/institutions/:id(\\d+)/reviews',auth,wrap(async(q,s)=>{const {rating,body}=q.body||{};
 if(!Number.isInteger(rating)||rating<1||rating>5||(body!=null&&!str(body,2000)))return s.status(400).json({error:'Reyting 1–5 bo‘lishi kerak'});
 try{await db.query('INSERT INTO reviews(user_id,institution_id,rating,body) VALUES($1,$2,$3,$4) ON CONFLICT(user_id,institution_id) DO UPDATE SET rating=$3,body=$4',[q.uid,+q.params.id,rating,body||null]);s.status(204).end()}
 catch(e){if(e.code=='23503')return s.status(404).json({error:'Topilmadi'});throw e}}));
r.delete('/institutions/:id(\\d+)/reviews',auth,wrap(async(q,s)=>{await db.query('DELETE FROM reviews WHERE user_id=$1 AND institution_id=$2',[q.uid,+q.params.id]);s.status(204).end()}));
module.exports=r;
