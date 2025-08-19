import { createClient } from '@supabase/supabase-js'
const supabaseUrl = "https://yvfzaejozuzewwwgqtvb.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2ZnphZWpvenV6ZXd3d2dxdHZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2MTI2MDUsImV4cCI6MjA3MTE4ODYwNX0.Ky-32D0c6KY7Nf6Pp8OIiiuqNaAk8J0MRchbfVjjUhg"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
