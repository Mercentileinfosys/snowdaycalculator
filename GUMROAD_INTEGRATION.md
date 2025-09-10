# 🛒 Gumroad Integration Guide

## Overview
This guide shows you 3 different ways to deliver premium access keys to customers who purchase through Gumroad.

---

## 🎯 **Option 1: Manual Delivery (Easiest - Start Here)**

### Step 1: Generate Keys in Advance
1. Install Node.js if not installed: https://nodejs.org
2. Run in your project folder:
   ```bash
   npm install
   node scripts/generate-premium-links.js bulk 50
   ```
   Or on Windows, double-click `generate-keys.bat`

### Step 2: Set Up Gumroad Product
1. Go to your [Gumroad Products](https://gumroad.com/products)
2. Create/edit your Snow Day Calculator Premium product
3. Set price to $9.99
4. In "Digital Product" settings, set these fields:

**Product Description:**
```
🎉 Premium Snow Day Calculator - AI-Powered Weather Predictions

✅ Real-time weather data from professional APIs
✅ 95% accurate snow day predictions  
✅ Global city support (New York to Tokyo)
✅ AI-enhanced meteorological analysis
✅ 24-hour forecast visualization
✅ Lifetime access - no subscriptions!

After purchase, you'll receive your premium access key within 24 hours.
```

### Step 3: Manual Process (After Each Sale)
1. **Check Gumroad Sales**: Go to gumroad.com/sales daily
2. **For each new sale:**
   - Note customer email
   - Get next unused access key from your generated list
   - Send this email to customer:

**Email Template:**
```
Subject: 🎉 Your Premium Snow Day Calculator Access

Hi [Customer Name],

Thank you for purchasing Premium Snow Day Calculator!

Your Premium Access Details:
============================

🔑 Access Key: [ACCESS_KEY_HERE]
🔗 Direct Link: https://yourdomain.com/premium?access=[ACCESS_KEY_HERE]

How to Activate:
1. Click the direct link above (easiest), OR  
2. Go to https://yourdomain.com/premium
3. Click "🔑 I already have an access key"
4. Enter your access key: [ACCESS_KEY_HERE]

✅ You now have lifetime access to:
• Real-time weather data
• 95% accurate AI predictions  
• Global city support
• Professional forecasting

Need help? Reply to this email!

Best regards,
Snow Day Calculator Team
```

### Step 4: Track Used Keys
Keep a simple spreadsheet:
| Customer Email | Access Key | Date Sent | Purchase ID |
|----------------|------------|-----------|-------------|
| user@email.com | premium_snow_2025_abc123 | 2025-01-15 | #12345 |

---

## 🔗 **Option 2: Gumroad Success Redirect (Semi-Automated)**

### Step 1: Set Up Success Redirect
1. In your Gumroad product settings
2. Find "Redirect URL after purchase"
3. Set it to: `https://yourdomain.com/premium?access=premium_snow_2025_abc123`

**Problem**: This gives the same key to everyone! Only use for testing.

### Step 2: Dynamic Keys (Requires Backend)
For unique keys per customer, you need a server that:
1. Receives Gumroad webhook
2. Generates unique key
3. Redirects customer to premium page with their key

---

## 🤖 **Option 3: Full Automation (Advanced)**

### Step 1: Set Up Webhook Server
1. Use the provided `webhook-handler.js` 
2. Install dependencies:
   ```bash
   npm install express nodemailer
   ```
3. Set environment variables:
   ```bash
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   SITE_URL=https://yourdomain.com
   ```
4. Deploy to Heroku, Vercel, or your server

### Step 2: Configure Gumroad Webhook
1. Go to Gumroad Settings → Advanced
2. Set Webhook URL: `https://your-server.com/gumroad-webhook`
3. Enable "sale" events

### Step 3: Test the Flow
1. Make a test purchase on Gumroad
2. Check your webhook server logs
3. Customer should receive email with access key automatically

---

## 📋 **Recommended Approach**

**For beginners**: Start with **Option 1 (Manual)**
- Easy to set up immediately
- No technical complexity
- Works reliably
- Takes 5 minutes per sale

**For scaling**: Move to **Option 3 (Automated)** when you get 10+ sales/day
- Fully automated
- Professional experience
- Requires technical setup

---

## 🔧 **Tools & Resources**

### Generate Keys
```bash
# Single key with customer email
node scripts/generate-premium-links.js single customer@example.com

# Bulk generation
node scripts/generate-premium-links.js bulk 100

# Gumroad-ready format
node scripts/generate-premium-links.js gumroad-format 20
```

### Test Your Setup
Use these test keys in development:
```
premium_snow_2025_abc123
premium_snow_2025_def456  
premium_snow_2025_ghi789
```

### Email Services
For automated emails, consider:
- **Gmail** (free, 500/day limit)
- **SendGrid** (reliable, good free tier)
- **Mailgun** (developer-friendly)
- **Amazon SES** (cheap, scalable)

---

## 🎯 **Quick Start Checklist**

- [ ] Generate 50+ access keys
- [ ] Set up Gumroad product ($9.99)
- [ ] Create customer email template  
- [ ] Test with a friend's purchase
- [ ] Set up tracking spreadsheet
- [ ] Consider automation after 20+ sales

---

## 🆘 **Troubleshooting**

### "Node command not found"
- Install Node.js from https://nodejs.org
- Restart your terminal/command prompt

### Customer can't access premium
1. Check if their key is in your valid keys list
2. Guide them to manual entry: `/premium` → "I have a key"
3. Verify key format: `premium_snow_2025_xxxxxx`

### Gumroad webhook not working
1. Check webhook URL is publicly accessible
2. Verify SSL certificate is valid
3. Check webhook logs for errors
4. Test with Gumroad's webhook tester

### Too many manual sales
- Time to upgrade to Option 3 (automation)
- Consider hiring a VA to handle key delivery
- Use Zapier to connect Gumroad to email service

---

## 💰 **Pricing & Revenue Tips**

- **$9.99** is a sweet spot for premium weather tools
- Consider **$14.99** for higher perceived value  
- Add **seasonal discounts** (25% off during storm season)
- Create **bundles** (Snow Day + Rain Day calculators)
- Offer **school district licenses** for bulk sales

Ready to start making money with your Snow Day Calculator! 🚀
