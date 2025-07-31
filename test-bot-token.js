#!/usr/bin/env node

const https = require('https');

// Replace this with your BOT_TOKEN
const TOKEN = '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';

function makeRequest(path, method = 'GET') {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: path,
      method: method,
      headers: {
        'Authorization': `token ${TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'TokenTester/1.0'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: JSON.parse(data)
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: data
          });
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function testToken() {
  console.log('🔍 Testing BOT_TOKEN permissions...\n');

  // Test 1: Check authenticated user
  console.log('1️⃣ Checking authenticated user...');
  try {
    const userRes = await makeRequest('/user');
    if (userRes.status === 200) {
      console.log(`✅ Token authenticated as: ${userRes.data.login}`);
      console.log(`   Name: ${userRes.data.name || 'N/A'}`);
      console.log(`   Type: ${userRes.data.type}`);
    } else {
      console.log(`❌ Failed to authenticate: ${userRes.status} - ${userRes.data.message}`);
      return;
    }
  } catch (e) {
    console.log(`❌ Error checking user: ${e.message}`);
    return;
  }

  // Test 2: Check token scopes
  console.log('\n2️⃣ Checking token scopes...');
  try {
    const userRes = await makeRequest('/user');
    const scopes = userRes.headers['x-oauth-scopes'];
    if (scopes) {
      console.log(`✅ Token scopes: ${scopes}`);
      const scopeList = scopes.split(', ');
      if (!scopeList.includes('repo')) {
        console.log('⚠️  Warning: Missing "repo" scope!');
      }
      if (!scopeList.includes('workflow')) {
        console.log('⚠️  Warning: Missing "workflow" scope!');
      }
    } else {
      console.log('ℹ️  No scopes header (might be using GitHub App)');
    }
  } catch (e) {
    console.log(`❌ Error checking scopes: ${e.message}`);
  }

  // Test 3: Check access to the repository
  console.log('\n3️⃣ Checking repository access...');
  try {
    const repoRes = await makeRequest('/repos/AI-AR-Labs/dream-blackjack');
    if (repoRes.status === 200) {
      console.log(`✅ Can access repository: ${repoRes.data.full_name}`);
      console.log(`   Private: ${repoRes.data.private}`);
      console.log(`   Permissions: ${JSON.stringify(repoRes.data.permissions || {})}`);
    } else {
      console.log(`❌ Cannot access repository: ${repoRes.status} - ${repoRes.data.message}`);
    }
  } catch (e) {
    console.log(`❌ Error accessing repository: ${e.message}`);
  }

  // Test 4: Check issue access
  console.log('\n4️⃣ Checking issue access...');
  try {
    const issueRes = await makeRequest('/repos/AI-AR-Labs/dream-blackjack/issues/3');
    if (issueRes.status === 200) {
      console.log(`✅ Can access issue #3: ${issueRes.data.title}`);
    } else {
      console.log(`❌ Cannot access issue: ${issueRes.status} - ${issueRes.data.message}`);
      if (issueRes.status === 403 && issueRes.data.message === 'Resource not accessible by integration') {
        console.log('   This is the same error you\'re seeing in Actions!');
      }
    }
  } catch (e) {
    console.log(`❌ Error accessing issue: ${e.message}`);
  }

  // Test 5: Check org membership
  console.log('\n5️⃣ Checking organization membership...');
  try {
    const orgRes = await makeRequest('/orgs/AI-AR-Labs/members');
    if (orgRes.status === 200) {
      console.log(`✅ Can list org members`);
    } else if (orgRes.status === 403) {
      console.log(`⚠️  Cannot list org members (might not be a member)`);
    }
  } catch (e) {
    console.log(`❌ Error checking org: ${e.message}`);
  }

  console.log('\n📊 Summary:');
  console.log('If you see "Resource not accessible by integration" errors, it usually means:');
  console.log('1. The token doesn\'t have the right scopes (needs "repo" and "workflow")');
  console.log('2. The token owner doesn\'t have access to the repository');
  console.log('3. The repository has restricted permissions for GitHub Apps/tokens');
}

if (TOKEN === 'YOUR_BOT_TOKEN_HERE') {
  console.log('❌ Please edit this file and replace YOUR_BOT_TOKEN_HERE with your actual token!');
  process.exit(1);
}

testToken();
