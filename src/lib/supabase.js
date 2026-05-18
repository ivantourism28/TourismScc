import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL  = 'https://mieuzxkqluqztiblbfnd.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pZXV6eGtxbHVxenRpYmxiZm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3Mzk4MzUsImV4cCI6MjA5NDMxNTgzNX0.y-H3WfUso2gbLraNGqv-4lW03aFvyLZEP69fvPYCZ_Y';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

// Helper: upload a file to the images bucket and return its public URL
export async function uploadImage(file) {
  const ext      = file.name.split('.').pop();
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage
    .from('images')
    .upload(filename, file, { upsert: false });

  if (error) throw error;

  const { data } = supabase.storage.from('images').getPublicUrl(filename);
  return data.publicUrl;
}
