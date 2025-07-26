# 🗄️ SlayXova Database Setup Guide

## ⚡ Quick Setup (5 Minutes) - MongoDB Atlas Cloud

### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create a new cluster (free tier available)

### Step 2: Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string

### Step 3: Update Environment Variables
```bash
# Edit your .env file
nano .env

# Add this line with your actual connection string:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/slayxova?retryWrites=true&w=majority
```

### Step 4: Start Backend Server
```bash
npm run server
```

## 🔧 Option 2: Local MongoDB Installation

### Install MongoDB (Ubuntu/Linux)
```bash
# Install MongoDB
curl -fsSL https://pgp.mongodb.com/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

### Install MongoDB (macOS)
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

### Install MongoDB (Windows)
1. Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Run installer
3. Start MongoDB service

## 🚀 Start with Live Database

### 1. Update .env file
```env
# Database (choose one)
MONGODB_URI=mongodb://localhost:27017/slayxova  # Local
# OR
MONGODB_URI=mongodb+srv://user:pass@cluster.net/slayxova  # Cloud

# Required for live database
JWT_SECRET=your-super-secret-jwt-key-here

# Optional API integrations
NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN=your-token
NEXT_PUBLIC_DISCORD_BOT_TOKEN=your-token
NEXT_PUBLIC_WHATSAPP_ACCESS_TOKEN=your-token
```

### 2. Start Backend Server
```bash
# Terminal 1 - Backend with live database
npm run server
```

### 3. Start Frontend
```bash
# Terminal 2 - Frontend
npm run dev
```

## ✅ Verify Database Connection

### Check Server Logs
```bash
# Should see:
# "SlayXova server running on port 5000"
# "Connected to MongoDB"
```

### Test API Endpoints
```bash
# Test if backend is connected
curl http://localhost:5000/api/posts

# Should return JSON response (even if empty)
```

## 📊 Database Collections Created

When live, SlayXova creates these collections:
- **users** - User accounts and profiles
- **posts** - Social media posts and content
- **stories** - 24-hour disappearing stories
- **messages** - Chat messages and conversations
- **rooms** - Discord-style servers/communities
- **comments** - Post comments and replies
- **payments** - Payment transactions
- **notifications** - Real-time notifications

## 🔑 Features Enabled with Live Database

### Real User Accounts
- User registration and login
- Profile management
- Authentication tokens

### Persistent Data
- Posts save permanently
- Messages history stored
- Friend connections saved
- Payment records kept

### Real-time Features
- Live chat messaging
- Online status tracking
- Push notifications
- Real user search

### API Integrations
- Instagram feed integration
- Discord server sync
- Cross-platform search
- Payment processing

## 🛠️ Database Management

### View Database (MongoDB Compass)
1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect to your database
3. Browse collections and data

### Backup Database
```bash
# Export data
mongodump --uri="your-connection-string" --out=backup/

# Import data
mongorestore --uri="your-connection-string" backup/
```

## 🚨 Troubleshooting

### Connection Failed
- Check internet connection
- Verify connection string
- Ensure IP whitelist (Atlas)
- Check firewall settings

### Server Won't Start
```bash
# Check if port is in use
lsof -i :5000

# Kill process if needed
kill -9 PID_NUMBER

# Restart server
npm run server
```

### Data Not Saving
- Check server logs for errors
- Verify MongoDB connection
- Ensure proper authentication
- Check collection permissions

## 🎯 Quick Test Commands

```bash
# Test database connection
node -e "const mongoose = require('mongoose'); mongoose.connect('your-uri').then(() => console.log('✅ Connected')).catch(err => console.log('❌ Failed:', err))"

# Check collections
mongo your-database-name --eval "show collections"

# Count documents
mongo your-database-name --eval "db.users.count()"
```

## 🔥 Ready for Production

With live database, SlayXova becomes:
- **Real social media platform**
- **Actual user registrations**  
- **Persistent conversations**
- **Cross-platform integrations**
- **Payment processing**
- **Content management system**

**Your SlayXova will be fully functional! 🚀**