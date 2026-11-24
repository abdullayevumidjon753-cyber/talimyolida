-- DEMO ma’lumotlar: is_demo=true. Haqiqiy emas.
INSERT INTO regions(name) VALUES('Toshkent shahri'),('Toshkent viloyati'),('Qoraqalpog‘iston Respublikasi'),('Andijon'),('Buxoro'),('Farg‘ona'),('Jizzax'),('Xorazm'),('Namangan'),('Navoiy'),('Qashqadaryo'),('Samarqand'),('Sirdaryo'),('Surxondaryo') ON CONFLICT DO NOTHING;
INSERT INTO categories(id,name) VALUES('it','Dasturlash va IT'),('en','Ingliz tili'),('ru','Rus tili'),('ko','Koreys tili'),('mat','Matematika'),('tib','Tibbiyot'),('diz','Dizayn'),('smm','SMM va marketing'),('vid','Video montaj'),('iqt','Iqtisodiyot'),('huq','Huquq'),('muh','Muhandislik'),('boshqa','Boshqa') ON CONFLICT DO NOTHING;
INSERT INTO institutions(kind,name,region_id,city,ownership,price_min,format,is_demo) VALUES
('center','Demo IT Akademiya',1,'Toshkent','private',900000,'both',true),
('center','Demo Til Markazi',1,'Toshkent','private',600000,'offline',true),
('university','Demo Davlat Universiteti',1,'Toshkent','public',14000000,'offline',true);
INSERT INTO institution_categories VALUES(1,'it'),(1,'diz'),(2,'en'),(2,'ru'),(3,'it'),(3,'iqt') ON CONFLICT DO NOTHING;
