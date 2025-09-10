/**
 * Simple Gumroad Webhook Handler
 * This receives purchase notifications and can auto-deliver keys
 */

const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer'); // npm install nodemailer
const app = express();

app.use(express.json());

// Your pre-generated keys (move to database in production)
let availableKeys = [
  'premium_snow_2025_abc123',
  'premium_snow_2025_def456',
  'premium_snow_2025_ghi789'
  // Add more keys here...
];

let usedKeys = [];

// Email configuration (use your email service)
const transporter = nodemailer.createTransporter({
  service: 'gmail', // or your email provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Webhook endpoint
app.post('/gumroad-webhook', (req, res) => {
  try {
    const purchase = req.body;
    
    // Verify this is a successful purchase
    if (purchase.seller_id === 'YOUR_GUMROAD_SELLER_ID' && purchase.refunded === false) {
      
      // Get next available key
      const accessKey = availableKeys.shift();
      
      if (!accessKey) {
        console.error('No more keys available!');
        return res.status(500).json({ error: 'No keys available' });
      }
      
      // Move to used keys
      usedKeys.push({
        key: accessKey,
        customer: purchase.email,
        purchaseId: purchase.sale_id,
        date: new Date()
      });
      
      // Create premium URL
      const premiumUrl = `${process.env.SITE_URL}/premium?access=${accessKey}`;
      
      // Send email to customer
      const emailContent = `
🎉 Thank you for purchasing Premium Snow Day Calculator!

Your Premium Access Details:
============================

🔑 Access Key: ${accessKey}
🔗 Direct Link: ${premiumUrl}

How to Activate:
1. Click the direct link above (easiest), OR
2. Go to ${process.env.SITE_URL}/premium
3. Click "🔑 I already have an access key"
4. Enter your access key: ${accessKey}

✅ You now have lifetime access to:
• Real-time weather data
• 95% accurate AI predictions
• Global city support
• Professional forecasting

Need help? Contact support@yourdomain.com
      `;
      
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: purchase.email,
        subject: '🎉 Your Premium Snow Day Calculator Access',
        text: emailContent
      });
      
      console.log(`Key ${accessKey} sent to ${purchase.email}`);
      res.json({ success: true, keySent: accessKey });
      
    } else {
      res.json({ message: 'Not a valid purchase' });
    }
    
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    availableKeys: availableKeys.length,
    usedKeys: usedKeys.length 
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Webhook server running on port ${PORT}`);
});
