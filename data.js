// DEMO MA’LUMOTLAR — haqiqiy emas. Backend ulanganda API bilan almashtiring.
const UPDATED='2026-11-24';
const CATS=[
['it','Dasturlash va IT','💻','dasturlash it python frontend backend javascript java c++'],
['en','Ingliz tili','🇬🇧','ingliz english ielts general'],['ru','Rus tili','🇷🇺','rus'],['ko','Koreys tili','🇰🇷','koreys topik'],['de','Nemis tili','🇩🇪','nemis'],
['mat','Matematika','➗',''],['fiz','Fizika','⚛️',''],['kim','Kimyo','🧪',''],['bio','Biologiya','🧬',''],['tar','Tarix','🏛️',''],
['huq','Huquq','⚖️',''],['iqt','Iqtisodiyot','📈',''],['diz','Dizayn va grafik dizayn','🎨','ui ux grafik'],['smm','SMM va marketing','📣','marketing'],
['vid','Video montaj','🎬',''],['kom','Kompyuter savodxonligi','🖥️',''],['tib','Tibbiyot','🩺',''],['arx','Arxitektura','🏗️',''],
['muh','Muhandislik','⚙️',''],['boshqa','Boshqa yo‘nalishlar','✨','']];
// nom, shahar, yo‘nalishlar, reyting, narx(oyiga), format(0 oflayn,1 onlayn,2 ikkalasi), davomiylik(oy)
const C=[
['Demo IT Akademiya','Toshkent',['it','diz'],4.6,900000,2,6],['Demo Til Markazi','Toshkent',['en','ru','ko'],4.4,600000,0,4],
['Demo Dasturchi Maktabi','Samarqand',['it','kom'],4.2,700000,2,5],['Demo Lingva Center','Samarqand',['en','de'],4.0,500000,0,4],
['Demo Kreativ Studiya','Buxoro',['diz','smm','vid'],4.7,800000,1,3],['Demo Ilm Markazi','Urganch',['en','mat','fiz'],3.9,350000,0,8],
['Demo Texno Kurslar','Farg‘ona',['it','muh','kom'],4.1,550000,2,6],['Demo Marketing Hub','Andijon',['smm','iqt'],4.3,650000,1,3],
['Demo Tibbiyot Tayyorlov','Namangan',['bio','kim','tib'],4.5,450000,0,10],['Demo Koreys Uyi','Qarshi',['ko','en'],4.0,480000,0,5]];
// nom, shahar, tur, kontrakt(yiliga), yo‘nalishlar, shakl
const U=[
['Demo Davlat Universiteti','Toshkent','davlat',14000000,['it','mat','fiz','iqt','huq'],'Kunduzgi, sirtqi'],
['Demo Texnika Universiteti','Toshkent','davlat',16000000,['muh','it','arx'],'Kunduzgi'],
['Demo Xususiy Universitet','Toshkent','xususiy',32000000,['iqt','huq','it','diz'],'Kunduzgi, masofaviy'],
['Demo Samarqand Universiteti','Samarqand','davlat',12000000,['tar','bio','kim','tib'],'Kunduzgi, sirtqi'],
['Demo Xorazm Universiteti','Urganch','davlat',11000000,['mat','fiz','en'],'Kunduzgi']];
