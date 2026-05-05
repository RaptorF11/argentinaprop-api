const { createClient } = require('@supabase/supabase-js');

function getSupabaseClient() {
  const { SUPABASE_URL, SUPABASE_SERVICE_KEY } = process.env;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    throw new Error('Missing Supabase configuration');
  }

  return createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
}

module.exports = {
  getSupabaseClient
};
