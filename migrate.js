const fs=require('fs'),path=require('path'),db=require('./db');
(async()=>{try{const d=path.join(__dirname,'../db/migrations');
 for(const f of fs.readdirSync(d).sort())await db.query(fs.readFileSync(path.join(d,f),'utf8'));
 if(process.argv.includes('--seed'))await db.query(fs.readFileSync(path.join(__dirname,'../db/seed.sql'),'utf8'));
 console.log('Migratsiya tugadi');}catch(e){console.error(e.message);process.exitCode=1}finally{await db.end()}})();
