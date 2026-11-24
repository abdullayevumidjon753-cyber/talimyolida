# TalimYolida (Node.js + Express + PostgreSQL)
## Ishga tushirish
1. `npm install`
2. `.env.example` ni `.env` ga nusxalang va qiymatlarni to‘ldiring (JWT_SECRET — uzun tasodifiy qator).
3. PostgreSQL’da `talimyolida` bazasini yarating, so‘ng `npm run migrate -- --seed` (seed — faqat DEMO ma’lumot).
4. `node --env-file=.env src/server.js` (Node 20+) → http://localhost:3000
## Holat (halol hisobot)
- Yozilgan, lekin **hali ishga tushirib sinalmagan**: backend (autentifikatsiya, qidiruv/filtr API, sevimlilar, sharhlar), DB sxema.
- `public/` dagi frontend hozircha **demo ma’lumot** bilan ishlaydi va API’ga ulanmagan.
- **Hali yo‘q:** Three.js/GSAP, Leaflet xarita, AI yordamchi, ru/en tillari, email tasdiqlash va parol tiklash, hamkor kabineti, reklama/premium UI, to‘lov, avtomatik testlar, zaxira nusxa (backup) skriptlari, SEO fayllari.
## API
GET /api/regions, /api/categories, /api/institutions?q=&kind=&ownership=&region=&category=&format=&maxPrice=&minRating=&sort=, /api/institutions/:id
POST /api/auth/register, /api/auth/login; GET /api/me; GET/PUT/DELETE /api/favorites/:id; POST/DELETE /api/institutions/:id/reviews
## Zaxira nusxa (tavsiya)
`pg_dump -Fc $DATABASE_URL > backup_$(date +%F).dump`; tiklash: `pg_restore -d $DATABASE_URL backup.dump`. Jadvalga (cron) qo‘ymaguningizcha avtomatik emas.
## Ma’lumot yig‘ish
Faqat rasmiy API/ruxsat etilgan ochiq manbalar; har bir yozuv uchun `data_sources` (url, checked_at, verified).
