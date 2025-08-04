
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hrzxpdcixzekpfixrqbz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhyenhwZGNpeHpla3BmaXhycWJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMjA3MTAsImV4cCI6MjA2OTg5NjcxMH0.6_JGXd9xXV3CLDOkHnz4WyG7ZDOF7k_VxVNu6h2xuFw'
export const supabase = createClient(supabaseUrl, supabaseKey)