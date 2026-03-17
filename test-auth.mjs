import fs from 'fs';
import path from 'path';

// Parse .env.local
const envPath = path.resolve('.env.local');
const envStr = fs.readFileSync(envPath, 'utf8');
const env = {};
envStr.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) env[match[1]] = match[2];
});

const SUPABASE_URL = env.VITE_SUPABASE_URL;
const ANON_KEY = env.VITE_SUPABASE_ANON_KEY;

async function test() {
  const email = `test_${Date.now()}@example.com`;
  const password = 'testpassword123';
  
  // 1. Sign up
  const signUpRes = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: 'POST',
    headers: { 'apikey': ANON_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const signUpData = await signUpRes.json();
  
  // 2. Sign In
  const signInRes = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: { 'apikey': ANON_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const signInData = await signInRes.json();
  const token = signInData.access_token;
  const userId = signInData.user.id;
  console.log("Got user token:", !!token);

  // 3. Test statuses
  const statusesToTest = ['inactive', 'draft', 'archived', 'hidden', 'closed', 'paused'];
  
  for (const status of statusesToTest) {
    const payload = {
      user_id: userId,
      title: 'Testing',
      city: 'City',
      street: 'Street',
      house_number: '1',
      monthly_rent: 100,
      status: status
    };
    
    const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/listings`, {
      method: 'POST',
      headers: {
        'apikey': ANON_KEY,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(payload)
    });
    
    if (!insertRes.ok) {
      const errorData = await insertRes.json();
      if (errorData.code === '23514') {
        console.log(`Status '${status}' is REJECTED by constraint.`);
      } else {
        console.log(`Status '${status}' failed:`, errorData);
      }
    } else {
      console.log(`✅ Status '${status}' is ALLOWED!`);
    }
  }
}

test();
