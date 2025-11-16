import { createClient } from '@supabase/supabase-js'

// Supabase configuration - Already set up with your credentials!
const SUPABASE_URL = 'https://ldrgkwykjwpqnalgghao.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxkcmdrd3lrandwcW5hbGdnaGFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4Mzk2MTksImV4cCI6MjA3NzQxNTYxOX0.A7MP7JA80pyiO3oL8f8v49MI8Fw3mSmg-iZJL-_Ejac'

// Configuration is set! Ready to go.

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Store for debugging/validation
supabase.supabaseUrl = SUPABASE_URL
supabase.supabaseKey = SUPABASE_ANON_KEY
