const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://tcebwfkpuzhnvudaibgf.supabase.co'; // Replace with Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjZWJ3ZmtwdXpobnZ1ZGFpYmdmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjQzODM4MCwiZXhwIjoyMDQ4MDE0MzgwfQ.kZsd8syT0KTQKHRU_OlfYKKL2v-OdcHaegFei55mVTk'; // Replace with your Supabase Key
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
