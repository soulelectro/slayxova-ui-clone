const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const multer = require('multer')
const cloudinary = require('cloudinary').v2
require('dotenv').config()

const app = express()
const server = http.createServer(app)
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

// Middleware
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/slayxova', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  displayName: { type: String, required: true },
  avatar: { type: String, default: '' },
  bio: { type: String, default: '' },
  isVerified: { type: Boolean, default: false },
  isPremium: { type: Boolean, default: false },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  earnings: { type: Number, default: 0 },
  subscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
})

// Post Schema
const PostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  media: [{
    type: { type: String, enum: ['image', 'video'], required: true },
    url: { type: String, required: true },
    thumbnail: String
  }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  shares: { type: Number, default: 0 },
  isPremium: { type: Boolean, default: false },
  price: { type: Number, default: 0 },
  tags: [String],
  createdAt: { type: Date, default: Date.now }
})

// Story Schema
const StorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  media: {
    type: { type: String, enum: ['image', 'video'], required: true },
    url: { type: String, required: true }
  },
  viewers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  expiresAt: { type: Date, default: () => new Date(+new Date() + 24*60*60*1000) },
  createdAt: { type: Date, default: Date.now }
})

// Message Schema
const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  content: { type: String, required: true },
  type: { type: String, enum: ['text', 'image', 'video', 'voice', 'gif'], default: 'text' },
  media: { type: String },
  isRead: { type: Boolean, default: false },
  reactions: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    emoji: String
  }],
  createdAt: { type: Date, default: Date.now }
})

// Room Schema (for group chats/servers)
const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  avatar: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  moderators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isNSFW: { type: Boolean, default: false },
  category: { type: String, enum: ['gaming', 'music', 'art', 'lifestyle', 'nsfw', 'other'], default: 'other' },
  isPrivate: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
})

// Comment Schema
const CommentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  content: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  parentComment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
  createdAt: { type: Date, default: Date.now }
})

// Models
const User = mongoose.model('User', UserSchema)
const Post = mongoose.model('Post', PostSchema)
const Story = mongoose.model('Story', StorySchema)
const Message = mongoose.model('Message', MessageSchema)
const Room = mongoose.model('Room', RoomSchema)
const Comment = mongoose.model('Comment', CommentSchema)

// JWT middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Access token required' })
  }

  jwt.verify(token, process.env.JWT_SECRET || 'slayxova-secret', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' })
    }
    req.user = user
    next()
  })
}

// Multer configuration for file uploads
const storage = multer.memoryStorage()
const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true)
    } else {
      cb(new Error('Only image and video files are allowed'), false)
    }
  }
})

// API Routes

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password, displayName } = req.body
    
    // Check if user exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    })
    
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      displayName
    })

    await user.save()

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET || 'slayxova-secret',
      { expiresIn: '30d' }
    )

    res.status(201).json({
      user: {
        id: user._id,
        username: user.username,
        displayName: user.displayName,
        avatar: user.avatar,
        isVerified: user.isVerified,
        isPremium: user.isPremium
      },
      token
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body

    // Find user
    const user = await User.findOne({
      $or: [{ email: username }, { username }]
    })

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' })
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid credentials' })
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET || 'slayxova-secret',
      { expiresIn: '30d' }
    )

    res.json({
      user: {
        id: user._id,
        username: user.username,
        displayName: user.displayName,
        avatar: user.avatar,
        isVerified: user.isVerified,
        isPremium: user.isPremium,
        followers: user.followers.length,
        following: user.following.length
      },
      token
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Posts Routes
app.get('/api/posts', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query
    
    const posts = await Post.find()
      .populate('user', 'username displayName avatar isVerified isPremium')
      .populate({
        path: 'comments',
        populate: { path: 'user', select: 'username displayName avatar' }
      })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    res.json(posts)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post('/api/posts', authenticateToken, upload.array('media', 5), async (req, res) => {
  try {
    const { content, isPremium = false, price = 0, tags } = req.body
    const userId = req.user.userId

    let mediaUrls = []

    // Upload media to Cloudinary
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploadResult = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            {
              resource_type: file.mimetype.startsWith('video/') ? 'video' : 'image',
              folder: 'slayxova/posts'
            },
            (error, result) => {
              if (error) reject(error)
              else resolve(result)
            }
          ).end(file.buffer)
        })

        mediaUrls.push({
          type: file.mimetype.startsWith('video/') ? 'video' : 'image',
          url: uploadResult.secure_url,
          thumbnail: uploadResult.secure_url
        })
      }
    }

    const post = new Post({
      user: userId,
      content,
      media: mediaUrls,
      isPremium: isPremium === 'true',
      price: parseFloat(price) || 0,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : []
    })

    await post.save()
    await post.populate('user', 'username displayName avatar isVerified isPremium')

    res.status(201).json(post)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Stories Routes
app.get('/api/stories', authenticateToken, async (req, res) => {
  try {
    const stories = await Story.find({
      expiresAt: { $gt: new Date() }
    })
      .populate('user', 'username displayName avatar')
      .sort({ createdAt: -1 })

    res.json(stories)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post('/api/stories', authenticateToken, upload.single('media'), async (req, res) => {
  try {
    const userId = req.user.userId

    if (!req.file) {
      return res.status(400).json({ error: 'Media file required' })
    }

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: req.file.mimetype.startsWith('video/') ? 'video' : 'image',
          folder: 'slayxova/stories'
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      ).end(req.file.buffer)
    })

    const story = new Story({
      user: userId,
      media: {
        type: req.file.mimetype.startsWith('video/') ? 'video' : 'image',
        url: uploadResult.secure_url
      }
    })

    await story.save()
    await story.populate('user', 'username displayName avatar')

    res.status(201).json(story)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Messages Routes
app.get('/api/messages/:roomId', authenticateToken, async (req, res) => {
  try {
    const { roomId } = req.params
    const { page = 1, limit = 50 } = req.query

    const messages = await Message.find({ room: roomId })
      .populate('sender', 'username displayName avatar')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    res.json(messages.reverse())
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Rooms Routes
app.get('/api/rooms', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId
    
    const rooms = await Room.find({
      $or: [
        { members: userId },
        { isPrivate: false }
      ]
    })
      .populate('owner', 'username displayName avatar')
      .sort({ createdAt: -1 })

    res.json(rooms)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post('/api/rooms', authenticateToken, async (req, res) => {
  try {
    const { name, description, category, isNSFW = false, isPrivate = false } = req.body
    const userId = req.user.userId

    const room = new Room({
      name,
      description,
      category,
      isNSFW,
      isPrivate,
      owner: userId,
      members: [userId]
    })

    await room.save()
    await room.populate('owner', 'username displayName avatar')

    res.status(201).json(room)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Socket.IO for real-time features
io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  // Join room
  socket.on('join_room', (roomId) => {
    socket.join(roomId)
    console.log(`User ${socket.id} joined room ${roomId}`)
  })

  // Handle new message
  socket.on('new_message', async (data) => {
    try {
      const { roomId, content, type = 'text', media } = data
      const userId = socket.userId // Set during authentication

      const message = new Message({
        sender: userId,
        room: roomId,
        content,
        type,
        media
      })

      await message.save()
      await message.populate('sender', 'username displayName avatar')

      // Broadcast to room
      io.to(roomId).emit('message_received', message)
    } catch (error) {
      socket.emit('error', { message: error.message })
    }
  })

  // Handle typing
  socket.on('typing', (data) => {
    socket.to(data.roomId).emit('user_typing', {
      userId: socket.userId,
      username: data.username
    })
  })

  socket.on('stop_typing', (data) => {
    socket.to(data.roomId).emit('user_stop_typing', {
      userId: socket.userId
    })
  })

  // Handle video calls
  socket.on('call_user', (data) => {
    io.to(data.userToCall).emit('incoming_call', {
      signal: data.signalData,
      from: data.from,
      name: data.name
    })
  })

  socket.on('answer_call', (data) => {
    io.to(data.to).emit('call_accepted', data.signal)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
  console.log(`SlayXova server running on port ${PORT}`)
})