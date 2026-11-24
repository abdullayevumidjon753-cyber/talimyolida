const express=require('express'),helmet=require('helmet'),rate=require('express-rate-limit'),path=require('path');
if(!process.env.JWT_SECRET||!process.env.DATABASE_URL){console.error('.env da JWT_SECRET va DATABASE_URL kerak');process.exit(1)}
const app=express();
app.use(helmet({contentSecurityPolicy:{directives:{defaultSrc:["'self'"],styleSrc:["'self'","'unsafe-inline'"],scriptSrc:["'self'"],imgSrc:["'self'","data:"]}}}));
app.use(express.json({limit:'50kb'}));
app.use('/api',rate({windowMs:60000,limit:120}));
app.use('/api/auth',rate({windowMs:15*60000,limit:20}));
app.use('/api',require('./api'));
app.use(express.static(path.join(__dirname,'../public')));
app.use('/api',(req,res)=>res.status(404).json({error:'Topilmadi'}));
app.use((e,req,res,next)=>{console.error(e);res.status(500).json({error:'Server xatosi'})});
app.listen(process.env.PORT||3000,()=>console.log('TalimYolida ishga tushdi'));
