-- San Carlos Tourism Blog - Fix Script
-- This script will create missing tables and policies without errors

-- ============================================================================
-- 1. CREATE TABLES (IF NOT EXISTS)
-- ============================================================================

CREATE TABLE IF NOT EXISTS destinations (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  activities TEXT[] DEFAULT '{}',
  opening_hours TEXT,
  rating NUMERIC(2,1),
  lat NUMERIC(10,7),
  lng NUMERIC(10,7),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  date DATE,
  category TEXT,
  excerpt TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS gallery (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS page_backgrounds (
  page_id TEXT PRIMARY KEY,
  label TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 2. ENABLE RLS
-- ============================================================================

ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_backgrounds ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 3. DROP EXISTING POLICIES (to avoid conflicts)
-- ============================================================================

DROP POLICY IF EXISTS "Public read access for destinations" ON destinations;
DROP POLICY IF EXISTS "Public insert access for destinations" ON destinations;
DROP POLICY IF EXISTS "Public update access for destinations" ON destinations;
DROP POLICY IF EXISTS "Public delete access for destinations" ON destinations;

DROP POLICY IF EXISTS "Public read access for blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Public insert access for blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Public update access for blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Public delete access for blog_posts" ON blog_posts;

DROP POLICY IF EXISTS "Public read access for gallery" ON gallery;
DROP POLICY IF EXISTS "Public insert access for gallery" ON gallery;
DROP POLICY IF EXISTS "Public update access for gallery" ON gallery;
DROP POLICY IF EXISTS "Public delete access for gallery" ON gallery;

DROP POLICY IF EXISTS "Public read access for page_backgrounds" ON page_backgrounds;
DROP POLICY IF EXISTS "Public insert/update access for page_backgrounds" ON page_backgrounds;
DROP POLICY IF EXISTS "Public update access for page_backgrounds" ON page_backgrounds;
DROP POLICY IF EXISTS "Public delete access for page_backgrounds" ON page_backgrounds;

DROP POLICY IF EXISTS "Public read access for images" ON storage.objects;
DROP POLICY IF EXISTS "Public insert access for images" ON storage.objects;
DROP POLICY IF EXISTS "Public update access for images" ON storage.objects;
DROP POLICY IF EXISTS "Public delete access for images" ON storage.objects;

-- ============================================================================
-- 4. CREATE NEW POLICIES
-- ============================================================================

-- Destinations policies
CREATE POLICY "Public read access for destinations"
ON destinations FOR SELECT TO public USING (true);

CREATE POLICY "Public insert access for destinations"
ON destinations FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Public update access for destinations"
ON destinations FOR UPDATE TO public USING (true);

CREATE POLICY "Public delete access for destinations"
ON destinations FOR DELETE TO public USING (true);

-- Blog posts policies
CREATE POLICY "Public read access for blog_posts"
ON blog_posts FOR SELECT TO public USING (true);

CREATE POLICY "Public insert access for blog_posts"
ON blog_posts FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Public update access for blog_posts"
ON blog_posts FOR UPDATE TO public USING (true);

CREATE POLICY "Public delete access for blog_posts"
ON blog_posts FOR DELETE TO public USING (true);

-- Gallery policies
CREATE POLICY "Public read access for gallery"
ON gallery FOR SELECT TO public USING (true);

CREATE POLICY "Public insert access for gallery"
ON gallery FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Public update access for gallery"
ON gallery FOR UPDATE TO public USING (true);

CREATE POLICY "Public delete access for gallery"
ON gallery FOR DELETE TO public USING (true);

-- Page backgrounds policies
CREATE POLICY "Public read access for page_backgrounds"
ON page_backgrounds FOR SELECT TO public USING (true);

CREATE POLICY "Public insert/update access for page_backgrounds"
ON page_backgrounds FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Public update access for page_backgrounds"
ON page_backgrounds FOR UPDATE TO public USING (true);

CREATE POLICY "Public delete access for page_backgrounds"
ON page_backgrounds FOR DELETE TO public USING (true);

-- ============================================================================
-- 5. STORAGE BUCKET
-- ============================================================================

-- Create images bucket if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage policies
CREATE POLICY "Public read access for images"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'images');

CREATE POLICY "Public insert access for images"
ON storage.objects FOR INSERT TO public
WITH CHECK (bucket_id = 'images');

CREATE POLICY "Public update access for images"
ON storage.objects FOR UPDATE TO public
USING (bucket_id = 'images');

CREATE POLICY "Public delete access for images"
ON storage.objects FOR DELETE TO public
USING (bucket_id = 'images');

-- ============================================================================
-- 6. INSERT DEFAULT PAGE BACKGROUNDS
-- ============================================================================

INSERT INTO page_backgrounds (page_id, label, image_url)
VALUES 
  ('home', 'Home', NULL),
  ('blog', 'Blog', NULL),
  ('destinations', 'Destinations', NULL),
  ('about', 'About', NULL),
  ('contact', 'Contact', NULL),
  ('gallery', 'Photo Gallery', NULL)
ON CONFLICT (page_id) DO NOTHING;

-- ============================================================================
-- DONE! Your database is ready.
-- ============================================================================
