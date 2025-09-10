const crypto = require('crypto');

const SITE_URL = process.env.REACT_APP_SITE_URL || 'https://snowdaycalculator.com';

/**
 * Generate a unique premium access key
 * @param {string} customerEmail - Customer's email (optional, for tracking)
 * @returns {string} Unique access key
 */
function generateAccessKey(customerEmail = '') {
  const timestamp = Date.now();
  const randomBytes = crypto.randomBytes(8).toString('hex');
  const emailHash = customerEmail ? crypto.createHash('md5').update(customerEmail).digest('hex').substring(0, 6) : '';
  
  return `premium_snow_2025_${emailHash}${randomBytes}${timestamp.toString(36)}`.substring(0, 32);
}

/**
 * Generate a premium access URL
 * @param {string} accessKey - The access key
 * @returns {string} Complete premium access URL
 */
function generatePremiumUrl(accessKey) {
  return `${SITE_URL}/premium?access=${accessKey}`;
}

/**
 * Generate multiple premium access links
 * @param {number} count - Number of links to generate
 * @param {Array<string>} customerEmails - Array of customer emails (optional)
 * @returns {Array<Object>} Array of access key objects
 */
function generateBulkAccessKeys(count = 10, customerEmails = []) {
  const accessKeys = [];
  
  for (let i = 0; i < count; i++) {
    const email = customerEmails[i] || '';
    const accessKey = generateAccessKey(email);
    const premiumUrl = generatePremiumUrl(accessKey);
    
    accessKeys.push({
      id: i + 1,
      accessKey,
      premiumUrl,
      customerEmail: email,
      generated: new Date().toISOString(),
      used: false
    });
  }
  
  return accessKeys;
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];
  
  switch (command) {
    case 'single':
      const email = args[1] || '';
      const key = generateAccessKey(email);
      const url = generatePremiumUrl(key);
      console.log('Generated Premium Access:');
      console.log('Access Key:', key);
      console.log('Premium URL:', url);
      console.log('Customer Email:', email || 'Not specified');
      break;
      
    case 'bulk':
      const count = parseInt(args[1]) || 10;
      const keys = generateBulkAccessKeys(count);
      console.log(`Generated ${count} Premium Access Keys:\n`);
      
      keys.forEach(keyObj => {
        console.log(`${keyObj.id}. Access Key: ${keyObj.accessKey}`);
        console.log(`   Premium URL: ${keyObj.premiumUrl}`);
        console.log(`   Generated: ${keyObj.generated}\n`);
      });
      break;
      
    case 'gumroad-format':
      // Generate keys in format suitable for Gumroad redirect URLs
      const gumroadCount = parseInt(args[1]) || 5;
      const gumroadKeys = generateBulkAccessKeys(gumroadCount);
      
      console.log('Gumroad Redirect URLs (use these as success redirect URLs):');
      console.log('================================================================\n');
      
      gumroadKeys.forEach(keyObj => {
        console.log(`Customer #${keyObj.id}:`);
        console.log(`Redirect URL: ${keyObj.premiumUrl}`);
        console.log(`Access Key: ${keyObj.accessKey}\n`);
      });
      break;
      
    default:
      console.log('Premium Access Key Generator');
      console.log('============================\n');
      console.log('Usage:');
      console.log('  node generate-premium-links.js single [email]     - Generate single access key');
      console.log('  node generate-premium-links.js bulk [count]       - Generate multiple access keys');
      console.log('  node generate-premium-links.js gumroad-format [count] - Generate for Gumroad setup');
      console.log('\nExamples:');
      console.log('  node generate-premium-links.js single user@example.com');
      console.log('  node generate-premium-links.js bulk 20');
      console.log('  node generate-premium-links.js gumroad-format 10');
      break;
  }
}

module.exports = {
  generateAccessKey,
  generatePremiumUrl,
  generateBulkAccessKeys
};
