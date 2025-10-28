import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ugcnoajojeydxddyehut.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnY25vYWpvamV5ZHhkZHllaHV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2NTQ4NjcsImV4cCI6MjA3NzIzMDg2N30.PrR3y0Tdrt5hY7oIy-61Py5jiCm8B9f1eP2ixI0meh8';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key must be provided.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
