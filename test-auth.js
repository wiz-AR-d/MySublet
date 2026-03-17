import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function test() {
  const testEmail = 'test_check_constraint@example.com';
  const testPassword = 'testpassword123';
  
  // Try to sign up
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: testEmail,
    password: testPassword,
  });
  
  if (authError && authError.message !== 'User already registered') {
    console.error("Auth error:", authError);
    return;
  }

  // Login
  const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
    email: testEmail,
    password: testPassword,
  });

  if (loginError) {
    console.error("Login error:", loginError);
    return;
  }

  const userId = loginData.user.id;
  console.log("Logged in as:", userId);

  const statusesToTest = ['inactive', 'draft', 'archived', 'hidden', 'closed', 'paused'];
  
  for (const status of statusesToTest) {
    const { error } = await supabase.from('listings').insert({
      user_id: userId,
      title: 'Test',
      city: 'Test',
      street: 'Test',
      house_number: '1',
      monthly_rent: 100,
      status: status
    });
    
    if (error) {
      if (error.code === '23514') {
        console.log(`Status '${status}' is REJECTED by constraint.`);
      } else {
        console.log(`Status '${status}' threw different error:`, error.message);
      }
    } else {
      console.log(`✅ Status '${status}' is ALLOWED!`);
    }
  }
}
test();
