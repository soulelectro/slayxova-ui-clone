# SlayXova 🚀

**The Ultimate All-in-One Social Media Platform**

SlayXova combines the best features from Snapchat, Discord, OnlyFans, Instagram, and WhatsApp into one powerful, modern social media application. Connect, create, earn, and slay! ✨

## 🌟 Features

### 📱 Instagram-like Feed
- Beautiful photo and video posts
- Stories with 24-hour expiration
- Likes, comments, and shares
- Hashtag support
- User verification badges

### 💬 WhatsApp-style Messaging
- Real-time one-on-one messaging
- Group chats
- Media sharing (photos, videos, voice notes)
- Read receipts
- Online status indicators

### 🎮 Discord Communities
- Create and join servers/communities
- Text and voice channels
- Community moderation tools
- Category-based organization
- NSFW content support

### 📸 Snapchat Stories
- Disappearing content (24 hours)
- Photo and video stories
- Story viewers tracking
- Creative filters and effects

### 💰 OnlyFans Monetization
- Premium content creation
- Subscription-based earnings
- Tip system
- Creator verification
- Payment processing
- Exclusive content for subscribers

### 🚀 Additional Features
- Video and voice calls
- Live streaming
- Content discovery algorithm
- Advanced search functionality
- Dark mode UI
- Mobile-responsive design
- Real-time notifications
- Cloud media storage

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons
- **Socket.IO Client** - Real-time communication

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.IO** - Real-time bidirectional communication
- **MongoDB** - Document database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Cloudinary** - Media storage and optimization

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB database (local or cloud)
- Cloudinary account for media storage

### Installation

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
   - MongoDB connection string
   - JWT secret key
   - Cloudinary credentials
   - Other optional services

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

5. **Run the development servers**
   
   Terminal 1 (Frontend):
   ```bash
   npm run dev
   ```
   
   Terminal 2 (Backend):
   ```bash
   npm run server
   ```

6. **Open the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📱 App Structure

```
slayxova/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main application
├── server/                # Backend server
│   └── index.js          # Express server with Socket.IO
├── components/            # React components (if needed)
├── public/               # Static assets
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind configuration
├── next.config.js        # Next.js configuration
└── README.md            # This file
```

## 🎯 Feature Breakdown

### Home Feed
- Infinite scroll posts
- Story carousel at top
- Like, comment, share interactions
- Premium content indicators
- User verification badges

### Chat System
- Real-time messaging with Socket.IO
- Online status indicators
- Media sharing capabilities
- Group chat support
- Message read receipts

### Content Creation
- Photo/video upload
- Story creation (24h expiration)
- Premium content publishing
- Hashtag and mention support
- Content monetization options

### Discovery
- Trending creators
- Community recommendations
- Category-based browsing
- Search functionality
- NSFW content filtering

### Profile Management
- User statistics (followers, following, posts)
- Premium creator features
- Earnings dashboard
- Settings and preferences
- Verification system

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- File upload validation
- CORS protection
- Rate limiting (recommended for production)
- Input sanitization
- Environment variable protection

## 💰 Monetization Features

- **Premium Content**: Creators can mark posts as premium
- **Subscriptions**: Users can subscribe to creators
- **Tips**: Direct tipping system for creators
- **Earnings Dashboard**: Track revenue and analytics
- **Payment Processing**: Secure payment handling
- **Creator Verification**: Premium creator badges

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Posts
- `GET /api/posts` - Get feed posts
- `POST /api/posts` - Create new post

### Stories
- `GET /api/stories` - Get active stories
- `POST /api/stories` - Create new story

### Messages
- `GET /api/messages/:roomId` - Get room messages

### Rooms/Communities
- `GET /api/rooms` - Get user rooms
- `POST /api/rooms` - Create new room

## 🔄 Real-time Features

Socket.IO events:
- `join_room` - Join a chat room
- `new_message` - Send a message
- `typing` - Show typing indicator
- `user_online` - User online status
- `call_user` - Initiate video call
- `message_received` - Receive new message

## 📱 Mobile Responsive

SlayXova is fully responsive and works great on:
- Desktop computers
- Tablets
- Mobile phones
- Progressive Web App (PWA) ready

## 🎨 UI/UX Features

- **Dark Theme**: Modern dark interface
- **Smooth Animations**: Framer Motion powered
- **Glass Morphism**: Modern UI effects
- **Gradient Elements**: Beautiful color schemes
- **Responsive Design**: Works on all devices
- **Loading States**: Smooth user experience
- **Error Handling**: User-friendly error messages

## 🚀 Production Deployment

### Environment Setup
1. Set `NODE_ENV=production`
2. Configure production database
3. Set up Cloudinary for media storage
4. Configure proper CORS origins
5. Enable rate limiting
6. Set up SSL certificates

### Recommended Hosting
- **Frontend**: Vercel, Netlify
- **Backend**: Railway, Heroku, DigitalOcean
- **Database**: MongoDB Atlas
- **Media**: Cloudinary
- **CDN**: Cloudflare

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by the best features of major social platforms
- Built with modern web technologies
- Designed for creators and communities
- Open source and community-driven

## 📞 Support

For support, email support@slayxova.com or join our Discord community.

---

**SlayXova - Where Creators Slay! 💜✨**