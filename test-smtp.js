// Test SMTP connection for Network Solutions
// Run this with: node test-smtp.js

const nodemailer = require('nodemailer');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const configs = [
  {
    name: 'Network Solutions Standard SMTP',
    host: 'smtp.networksolutionsemail.com',
    port: 465,
    secure: true,
  },
  {
    name: 'Network Solutions Standard SMTP (Port 587)',
    host: 'smtp.networksolutionsemail.com',
    port: 587,
    secure: false,
    requireTLS: true,
  },
  {
    name: 'Legacy SMTP from partner (Port 587)',
    host: 'netsol-smtp-oxcs.hostingplatform.com',
    port: 587,
    secure: false,
    requireTLS: true,
  },
  {
    name: 'Domain-based SMTP',
    host: 'mail.wwdrape.com',
    port: 587,
    secure: false,
    requireTLS: true,
  },
];

async function testConfig(config) {
  console.log(`\n🔍 Testing: ${config.name}`);
  console.log(`   Host: ${config.host}`);
  console.log(`   Port: ${config.port}`);
  console.log(`   Secure: ${config.secure}`);
  
  const transporter = nodemailer.createTransport({
    ...config,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    await transporter.verify();
    console.log(`   ✅ SUCCESS! This configuration works.`);
    return true;
  } catch (error) {
    console.log(`   ❌ FAILED: ${error.message}`);
    return false;
  }
}

async function runTests() {
  console.log('🚀 Testing SMTP Configurations for info@wwdrape.com\n');
  console.log('═══════════════════════════════════════════════════');
  
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.log('\n❌ ERROR: SMTP_USER or SMTP_PASSWORD not found in .env.local');
    console.log('Please create a .env.local file with your credentials.\n');
    return;
  }

  console.log(`Using credentials: ${process.env.SMTP_USER}\n`);

  let successCount = 0;
  for (const config of configs) {
    const success = await testConfig(config);
    if (success) successCount++;
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second between tests
  }

  console.log('\n═══════════════════════════════════════════════════');
  console.log(`\n📊 Results: ${successCount}/${configs.length} configurations succeeded\n`);
  
  if (successCount === 0) {
    console.log('💡 Suggestions:');
    console.log('   1. Verify your email password is correct');
    console.log('   2. Check if SMTP access is enabled in your Network Solutions account');
    console.log('   3. Contact Network Solutions support for correct SMTP settings');
    console.log('   4. Check if your hosting requires app-specific passwords\n');
  }
}

runTests();

