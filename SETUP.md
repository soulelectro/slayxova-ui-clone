# SlayXova Setup Guide 🚀

Welcome to SlayXova! This guide will help you set up and run the ultimate all-in-one social media platform.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** (local installation or cloud service like MongoDB Atlas)
- **Git** - [Download here](https://git-scm.com/)

## 🚀 Quick Start (5 Minutes)

### Option 1: Automated Setup (Recommended)

1. **Clone and navigate to the project**
   ```bash
   git clone https://github.com/yourusername/slayxova.git
   cd slayxova
   ```

2. **Run the automated setup script**
   ```bash
   chmod +x start.sh
   ./start.sh
   ```

The script will automatically:
- Install dependencies
- Create `.env` file from template
- Check MongoDB connection
- Start both frontend and backend servers

### Option 2: Manual Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/slayxova.git
   cd slayxova
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   # Required
   MONGODB_URI=mongodb://localhost:27017/slayxova
   JWT_SECRET=your-super-secret-jwt-key-here
   
   # Optional (for media uploads)
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   ```

4. **Start MongoDB** (if using local installation)
   ```bash
   mongod
   ```

5. **Start the servers**
   
   Terminal 1 (Backend):
   ```bash
   npm run server
   ```
   
   Terminal 2 (Frontend):
   ```bash
   npm run dev
   ```

## 🌐 Access Your App

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 🔧 Configuration Options

### Database Setup

#### Option A: Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB service: `mongod`
3. Use connection string: `mongodb://localhost:27017/slayxova`

#### Option B: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string and add to `.env`
4. Example: `mongodb+srv://username:password@cluster.mongodb.net/slayxova`

### Media Storage Setup (Optional)

For photo/video uploads, configure Cloudinary:

1. Create account at [Cloudinary](https://cloudinary.com/)
2. Get your credentials from dashboard
3. Add to `.env`:
   ```env
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

## 📱 Features Overview

### 🏠 Home Feed
- Instagram-style posts with likes, comments, shares
- Stories carousel (24-hour expiration)
- Premium content indicators
- User verification badges

### 💬 Chat System
- WhatsApp-style real-time messaging
- Group chats and direct messages
- Media sharing capabilities
- Online status indicators

### 🎮 Communities
- Discord-style servers/communities
- Category-based organization
- Text and voice channels
- NSFW content support

### 💰 Creator Monetization
- OnlyFans-style premium content
- Subscription system
- Tip creators
- Earnings dashboard

### 📸 Content Creation
- Snapchat-style disappearing stories
- Photo/video uploads
- Live streaming capabilities
- Content discovery algorithm

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- File upload validation
- CORS protection
- Environment variable protection

## 🛠️ Development

### Project Structure
```
slayxova/
├── app/                 # Next.js frontend
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main app component
├── server/             # Backend API
│   └── index.js        # Express server with Socket.IO
├── package.json        # Dependencies
├── tailwind.config.js  # Styling configuration
└── README.md          # Documentation
```

### Available Scripts

- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run server` - Start backend API server
- `npm run lint` - Run ESLint

### API Endpoints

- **Auth**: `/api/auth/login`, `/api/auth/register`
- **Posts**: `/api/posts` (GET/POST)
- **Stories**: `/api/stories` (GET/POST)
- **Messages**: `/api/messages/:roomId`
- **Rooms**: `/api/rooms` (GET/POST)

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill process on port 3000 or 5000
   lsof -ti:3000 | xargs kill
   lsof -ti:5000 | xargs kill
   ```

2. **MongoDB connection failed**
   - Ensure MongoDB is running: `mongod`
   - Check connection string in `.env`
   - For Atlas: verify network access and credentials

3. **Dependencies not installing**
   ```bash
   # Clear npm cache and reinstall
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Build errors**
   ```bash
   # Clear Next.js cache
   rm -rf .next
   npm run build
   ```

### Performance Issues

- Ensure MongoDB has proper indexing
- Configure Cloudinary for optimized media delivery
- Use Redis for session management in production

## 🚀 Production Deployment

### Environment Setup
1. Set `NODE_ENV=production`
2. Use production MongoDB database
3. Configure proper CORS origins
4. Set up SSL certificates
5. Enable rate limiting

### Recommended Hosting
- **Frontend**: Vercel, Netlify
- **Backend**: Railway, Heroku, DigitalOcean
- **Database**: MongoDB Atlas
- **Media**: Cloudinary
- **CDN**: Cloudflare

### Deployment Checklist
- [ ] Environment variables configured
- [ ] Database connection tested
- [ ] Media storage configured
- [ ] SSL certificates installed
- [ ] CORS origins set
- [ ] Rate limiting enabled
- [ ] Error logging configured
- [ ] Backup strategy implemented

## 🤝 Support

Need help? Here's how to get support:

1. **Documentation**: Check README.md and this setup guide
2. **Issues**: Create an issue on GitHub
3. **Community**: Join our Discord server
4. **Email**: support@slayxova.com

## 📄 License

This project is licensed under the MIT License. See LICENSE file for details.

---

**Happy SlayXova building! 💜✨**

*Connect • Create • Earn • Slay*