
# WhatsApp Deleted Message Logger

Logs deleted WhatsApp messages and forwards them to Telegram using Baileys.

## Features
- Detect deleted messages
- Forward to Telegram
- Auto reconnect
- Lightweight memory store

## Setup

1. Clone repo
2. Install dependencies:
   npm install

3. Create `.env`:
   TELEGRAM_TOKEN=your_token
   CHAT_ID=your_chat_id

4. Run:
   npm start

5. Scan QR code

## Deploy (VPS Recommended)
Use PM2:
npm install -g pm2
pm2 start index.js
pm2 save
pm2 startup

## Notes
- Uses unofficial WhatsApp Web API
- Risk of account ban if abused