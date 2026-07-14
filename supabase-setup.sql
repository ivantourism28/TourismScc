-- San Carlos Tourism Blog Site - Supabase Database Schema
-- Run this SQL in your Supabase SQL Editor to create all necessary tables

-- ============================================================================
-- 1. DESTINATIONS TABLE
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

-- ============================================================================
-- 2. BLOG POSTS TABLE
-- ============================================================================
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

-- ============================================================================
-- 3. GALLERY TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS gallery (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 4. PAGE BACKGROUNDS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS page_backgrounds (
  page_id TEXT PRIMARY KEY,
  label TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_backgrounds ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all tables
CREATE POLICY "Public read access for destinations"
ON destinations FOR SELECT
TO public
USING (true);

CREATE POLICY "Public read access for blog_posts"
ON blog_posts FOR SELECT
TO public
USING (true);

CREATE POLICY "Public read access for gallery"
ON gallery FOR SELECT
TO public
USING (true);

CREATE POLICY "Public read access for page_backgrounds"
ON page_backgrounds FOR SELECT
TO public
USING (true);

-- Allow public write access (for admin operations)
-- Note: In production, you should implement proper authentication
CREATE POLICY "Public insert access for destinations"
ON destinations FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Public update access for destinations"
ON destinations FOR UPDATE
TO public
USING (true);

CREATE POLICY "Public delete access for destinations"
ON destinations FOR DELETE
TO public
USING (true);

CREATE POLICY "Public insert access for blog_posts"
ON blog_posts FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Public update access for blog_posts"
ON blog_posts FOR UPDATE
TO public
USING (true);

CREATE POLICY "Public delete access for blog_posts"
ON blog_posts FOR DELETE
TO public
USING (true);

CREATE POLICY "Public insert access for gallery"
ON gallery FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Public update access for gallery"
ON gallery FOR UPDATE
TO public
USING (true);

CREATE POLICY "Public delete access for gallery"
ON gallery FOR DELETE
TO public
USING (true);

CREATE POLICY "Public insert/update access for page_backgrounds"
ON page_backgrounds FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Public update access for page_backgrounds"
ON page_backgrounds FOR UPDATE
TO public
USING (true);

CREATE POLICY "Public delete access for page_backgrounds"
ON page_backgrounds FOR DELETE
TO public
USING (true);

-- ============================================================================
-- 6. STORAGE BUCKET
-- ============================================================================
-- Create the images bucket (if not already created via UI)
-- You need to run this in the Supabase dashboard Storage section or via SQL:

INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to images bucket
CREATE POLICY "Public read access for images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'images');

CREATE POLICY "Public insert access for images"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'images');

CREATE POLICY "Public update access for images"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'images');

CREATE POLICY "Public delete access for images"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'images');

-- ============================================================================
-- 7. SAMPLE DATA (OPTIONAL)
-- ============================================================================
-- Insert default page background entries
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
-- DONE!
-- ============================================================================
-- Your database is now ready to use with the Tourism Blog Site.
-- 
-- Next steps:
-- 1. Go to Storage in Supabase dashboard and verify the 'images' bucket exists
-- 2. Set the 'images' bucket to PUBLIC
-- 3. Start adding content through your admin panel at /admin
-- 4. Upload images through the admin panel image picker
