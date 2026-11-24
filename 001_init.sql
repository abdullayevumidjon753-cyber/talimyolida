CREATE TABLE IF NOT EXISTS regions(id serial PRIMARY KEY, name text UNIQUE NOT NULL);
CREATE TABLE IF NOT EXISTS categories(id text PRIMARY KEY, name text NOT NULL);
CREATE TABLE IF NOT EXISTS institutions(
 id serial PRIMARY KEY, kind text NOT NULL CHECK(kind IN('university','center')),
 name text NOT NULL, region_id int REFERENCES regions(id), city text, ownership text CHECK(ownership IN('public','private')),
 description text, address text, phone text, website text, telegram text, instagram text,
 price_min int CHECK(price_min>=0), format text CHECK(format IN('offline','online','both')),
 lat numeric(9,6), lng numeric(9,6), verified_at date, is_demo boolean NOT NULL DEFAULT false, published boolean NOT NULL DEFAULT true);
CREATE TABLE IF NOT EXISTS institution_categories(institution_id int REFERENCES institutions ON DELETE CASCADE, category_id text REFERENCES categories, PRIMARY KEY(institution_id,category_id));
CREATE TABLE IF NOT EXISTS courses(id serial PRIMARY KEY, institution_id int NOT NULL REFERENCES institutions ON DELETE CASCADE, category_id text REFERENCES categories, title text NOT NULL, price int CHECK(price>=0), duration_months int, starts_on date);
CREATE TABLE IF NOT EXISTS users(id serial PRIMARY KEY, email text UNIQUE NOT NULL, name text NOT NULL, password_hash text NOT NULL, email_verified boolean NOT NULL DEFAULT false, created_at timestamptz DEFAULT now());
CREATE TABLE IF NOT EXISTS favorites(user_id int REFERENCES users ON DELETE CASCADE, institution_id int REFERENCES institutions ON DELETE CASCADE, PRIMARY KEY(user_id,institution_id));
CREATE TABLE IF NOT EXISTS reviews(id serial PRIMARY KEY, user_id int NOT NULL REFERENCES users ON DELETE CASCADE, institution_id int NOT NULL REFERENCES institutions ON DELETE CASCADE, rating int NOT NULL CHECK(rating BETWEEN 1 AND 5), body text CHECK(length(body)<=2000), created_at timestamptz DEFAULT now(), UNIQUE(user_id,institution_id));
CREATE TABLE IF NOT EXISTS data_sources(id serial PRIMARY KEY, institution_id int REFERENCES institutions ON DELETE CASCADE, url text NOT NULL, checked_at date, verified boolean NOT NULL DEFAULT false);
CREATE TABLE IF NOT EXISTS partner_requests(id serial PRIMARY KEY, user_id int REFERENCES users, institution_id int REFERENCES institutions, note text, status text NOT NULL DEFAULT 'pending', created_at timestamptz DEFAULT now());
CREATE TABLE IF NOT EXISTS promotions(id serial PRIMARY KEY, institution_id int REFERENCES institutions ON DELETE CASCADE, type text CHECK(type IN('ad','premium','featured')), starts_on date, ends_on date);
CREATE INDEX IF NOT EXISTS ix_inst_region ON institutions(region_id);
CREATE INDEX IF NOT EXISTS ix_inst_kind ON institutions(kind);
CREATE INDEX IF NOT EXISTS ix_courses_inst ON courses(institution_id);
