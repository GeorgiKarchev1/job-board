# 🤖 Telegram Integration Setup Guide

This guide will help you set up Telegram notifications for your Job Board MVP. You'll get automatic notifications when:
- 📢 **Jobs are approved** → Posted to public channel
- 🔔 **New jobs are submitted** → Notified to admin channel

## 📋 Prerequisites

- Telegram account
- Admin access to your job board
- 2 Telegram channels (public & admin)

## 🚀 Step-by-Step Setup

### 1. Create a Telegram Bot

1. **Open Telegram** and search for `@BotFather`
2. **Start a chat** with BotFather
3. **Send** `/newbot` command
4. **Follow the prompts**:
   - Choose a name: `Your Job Board Bot`
   - Choose a username: `yourjobboard_bot` (must end with 'bot')
5. **Copy the bot token** (looks like: `123456789:ABCDEF...`)

### 2. Create Telegram Channels

#### Public Channel (for approved jobs)
1. **Create a new channel** in Telegram
2. **Name it**: `Job Opportunities` or similar
3. **Make it public** (optional but recommended)
4. **Add your bot** as an administrator with posting permissions

#### Admin Channel (for notifications)
1. **Create another channel** for admins only
2. **Name it**: `Job Board Admin` or similar  
3. **Keep it private**
4. **Add your bot** as an administrator
5. **Add admin users** who should receive notifications

### 3. Get Channel IDs

#### Method 1: Using Web Telegram
1. **Open Telegram Web** (web.telegram.org)
2. **Go to your channel**
3. **Look at the URL**: `web.telegram.org/k/#-1001234567890`
4. **Copy the number** including the minus sign: `-1001234567890`

#### Method 2: Using Bot
1. **Add your bot** to the channel as admin
2. **Send a message** in the channel
3. **Visit**: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
4. **Find your channel ID** in the response

### 4. Configure Environment Variables

Create a `.env.local` file in your project root:

```env
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN="123456789:ABCDEF1234567890abcdef"
TELEGRAM_PUBLIC_CHANNEL_ID="-1001234567890"
TELEGRAM_ADMIN_CHANNEL_ID="-1009876543210"
NEXT_PUBLIC_TELEGRAM_CONFIGURED="true"
```

### 5. Test the Integration

1. **Restart your development server**:
   ```bash
   npm run dev
   ```

2. **Go to Admin Panel**: `/admin`
3. **Look for Telegram Settings** card
4. **Click "Test Telegram Connection"**
5. **Verify** it shows success ✅

### 6. Test Notifications

#### Test New Job Submission:
1. **Go to** `/submit`
2. **Fill out** the job form
3. **Submit** the job
4. **Check your admin channel** for notification

#### Test Job Approval:
1. **Go to** `/admin`
2. **Find** a pending job
3. **Click "Approve"**
4. **Check your public channel** for the job posting

## 🎛️ Message Formats

### Approved Job Message (Public Channel):
```
🎉 New Job Posted!

Senior Frontend Developer at DeFi Protocol Labs

📋 Department: FRONTEND
📍 Location: REMOTE - Worldwide  
💼 Type: FULL TIME
💰 Salary: $120k - $180k

Company description here...

📞 Contact: careers@company.com
🌐 Website: https://company.com

#Jobs #FRONTEND #REMOTE
```

### New Submission Message (Admin Channel):
```
🔔 New Job Submission

Senior Frontend Developer at DeFi Protocol Labs

📋 Department: FRONTEND
📍 Location: REMOTE - Worldwide
💼 Type: FULL TIME
💰 Salary: $120k - $180k

Company Description:
Company description here...

📞 Contact: careers@company.com
🌐 Website: https://company.com

⏰ Submitted: 12/1/2024, 2:30:00 PM
👤 Status: PENDING REVIEW

Please review and approve/reject in the admin panel.
```

## 🔧 Troubleshooting

### Bot Token Issues
- ✅ **Check** token format: `123456789:ABC...`
- ✅ **Verify** no extra spaces or quotes
- ✅ **Test** with: `https://api.telegram.org/bot<TOKEN>/getMe`

### Channel ID Issues
- ✅ **Include minus sign** for channels: `-1001234567890`
- ✅ **Bot must be admin** in the channel
- ✅ **Bot needs posting permissions**

### Permission Issues
- ✅ **Make bot administrator** in both channels
- ✅ **Grant posting permissions** to bot
- ✅ **Check channel privacy settings**

### No Notifications
- ✅ **Restart development server** after adding env vars
- ✅ **Check browser console** for errors
- ✅ **Verify environment variables** are loaded

## 🚫 Disabling Telegram

To disable Telegram notifications:

1. **Remove** or comment out Telegram env vars
2. **Set** `NEXT_PUBLIC_TELEGRAM_CONFIGURED="false"`
3. **Restart** the server

The app will work perfectly without Telegram - notifications just won't be sent.

## 📱 Optional: Mobile Notifications

To get mobile notifications:
1. **Enable notifications** for your admin channel in Telegram
2. **Install Telegram** on your phone
3. **Join the admin channel**
4. **Enable push notifications** in Telegram settings

## 🎉 You're Done!

Your job board now has full Telegram integration! 

- ✅ New job submissions notify admins instantly
- ✅ Approved jobs are automatically posted to your public channel
- ✅ Beautiful formatted messages with all job details
- ✅ Hashtags for easy categorization

Happy job boarding! 🚀