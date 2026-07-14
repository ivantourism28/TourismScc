import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL  = 'https://jtyhvgaosxtdampvngea.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0eWh2Z2Fvc3h0ZGFtcHZuZ2VhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM5Nzg2MTUsImV4cCI6MjA5OTU1NDYxNX0.bQFYF6tnAZ2YRCMbgf47JsRpPmzATAofRr0OOUPuxRc';

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
