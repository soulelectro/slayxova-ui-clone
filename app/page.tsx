'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, MessageCircle, Plus, Search, User, Camera, Video, 
  Heart, Share, Send, Settings, Bell, DollarSign, Users,
  Phone, VideoIcon, Mic, Image, Smile, MoreHorizontal,
  Zap, Crown, Lock, Eye, Gift, Star, TrendingUp, Play,
  Pause, Volume2, VolumeX, Repeat, Music, Bookmark, Clock,
  MapPin, UserPlus, Shuffle, Instagram, MessageSquare
} from 'lucide-react'

// Import integrations (will be initialized in useEffect)
// import { 
//   CrossPlatformSearch, 
//   BeRealAPI, 
//   InstagramFeedIntegration 
// } from '../lib/integrations.js'

// Types
interface User {
  id: string
  username: string
  displayName: string
  avatar: string
  isVerified: boolean
  isPremium: boolean
  followers: number
  following: number
}

interface Post {
  id: string
  user: User
  content: string
  image?: string
  video?: string
  likes: number
  comments: number
  shares: number
  timestamp: Date
  isPremium?: boolean
}

interface Story {
  id: string
  user: User
  image: string
  timestamp: Date
  viewed: boolean
}

interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  timestamp: Date
  type: 'text' | 'image' | 'video' | 'voice'
  isRead: boolean
}

interface Channel {
  id: string
  name: string
  description: string
  memberCount: number
  isNSFW: boolean
  category: string
}

interface Reel {
  id: string
  user: User
  video: string
  thumbnail: string
  caption: string
  audio: {
    name: string
    artist: string
    cover: string
  }
  likes: number
  comments: number
  shares: number
  views: number
  hashtags: string[]
  isLiked: boolean
  timestamp: Date
  platform?: string
}

interface CrossPlatformUser {
  id: string
  username: string
  displayName: string
  avatar: string
  platform: 'instagram' | 'discord' | 'snapchat' | 'whatsapp'
  verified?: boolean
  followers?: number
  status?: string
  phone?: string
  snapScore?: number
  mutualFriends?: number
  reason?: string
}

interface BeRealPost {
  id: string
  user: User
  frontCamera: string
  backCamera: string
  location: string
  timestamp: Date
  reactions: { emoji: string; count: number }[]
  comments: any[]
  isLate?: boolean
  lateMinutes?: number
}

export default function SlayXova() {
  const [currentTab, setCurrentTab] = useState('home')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [stories, setStories] = useState<Story[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [activeChat, setActiveChat] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [reels, setReels] = useState<Reel[]>([])
  const [currentReelIndex, setCurrentReelIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [searchResults, setSearchResults] = useState<CrossPlatformUser[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [beRealPosts, setBeRealPosts] = useState<BeRealPost[]>([])
  const [beRealNotification, setBeRealNotification] = useState<any>(null)
  const [integratedFeed, setIntegratedFeed] = useState<Post[]>([])

  // Initialize integrations (mock for now)
  const crossPlatformSearch = {
    searchAllPlatforms: async (query: string) => ({
      all: [
        {
          id: '1',
          username: `${query}_ig`,
          displayName: `${query} (Instagram)`,
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
          platform: 'instagram' as const,
          verified: true,
          followers: 25000
        },
        {
          id: '2',
          username: `${query}#1234`,
          displayName: `${query} (Discord)`,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
          platform: 'discord' as const,
          status: 'online'
        }
      ]
    })
  }

  const beRealAPI = {
    triggerBeRealMoment: async () => ({
      id: Date.now(),
      title: "⚡ Time to be Real!",
      message: "It's time to share what you're doing right now!",
      timestamp: new Date(),
      timeLimit: 2 * 60 * 1000,
      expiresAt: new Date(Date.now() + 2 * 60 * 1000)
    })
  }

  const instagramIntegration = {
    getIntegratedFeed: async () => [
      {
        id: 'ig_1',
        user: {
          id: 'instagram_user',
          username: 'ig_creator',
          displayName: 'Instagram Creator',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
          isVerified: true,
          isPremium: false
        },
        content: 'Amazing sunset today! 🌅 #InstagramIntegration #SlayXova',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
        likes: 5420,
        comments: 89,
        shares: 23,
        timestamp: new Date(),
        platform: 'instagram'
      }
    ]
  }

  // Sample data
  useEffect(() => {
    // Initialize sample data
    const sampleUser: User = {
      id: '1',
      username: 'slayqueen',
      displayName: 'Slay Queen ✨',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      isVerified: true,
      isPremium: true,
      followers: 50000,
      following: 1200
    }

    const samplePosts: Post[] = [
      {
        id: '1',
        user: sampleUser,
        content: 'Living my best life! 💅✨ #SlayXova #Blessed',
        image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400',
        likes: 1250,
        comments: 89,
        shares: 23,
        timestamp: new Date(),
        isPremium: false
      },
      {
        id: '2',
        user: { ...sampleUser, username: 'creatorvibes', displayName: 'Creator Vibes' },
        content: 'Exclusive content dropping soon! 🔥 Subscribe for premium access',
        video: 'https://example.com/video.mp4',
        likes: 3400,
        comments: 156,
        shares: 78,
        timestamp: new Date(),
        isPremium: true
      }
    ]

    const sampleStories: Story[] = [
      {
        id: '1',
        user: sampleUser,
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300',
        timestamp: new Date(),
        viewed: false
      }
    ]

    const sampleReels: Reel[] = [
      {
        id: '1',
        user: sampleUser,
        video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400',
        caption: 'Living my best life! 🔥 Check out this amazing transformation ✨ #SlayXova #Transformation #Glow',
        audio: {
          name: 'Trending Sound',
          artist: 'SlayXova Music',
          cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100'
        },
        likes: 25400,
        comments: 892,
        shares: 156,
        views: 128500,
        hashtags: ['SlayXova', 'Transformation', 'Glow', 'Viral'],
        isLiked: false,
        timestamp: new Date()
      },
      {
        id: '2',
        user: { ...sampleUser, username: 'dancequeen', displayName: 'Dance Queen 💃' },
        video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1574391884720-bbc2f89592d2?w=400',
        caption: 'New dance trend alert! 💃 Can you do this move? Tag someone to try! #DanceChallenge #SlayXova',
        audio: {
          name: 'Dance Beat',
          artist: 'TrendMusic',
          cover: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=100'
        },
        likes: 45200,
        comments: 1240,
        shares: 789,
        views: 234600,
        hashtags: ['DanceChallenge', 'SlayXova', 'Viral', 'Trending'],
        isLiked: true,
        timestamp: new Date()
      },
      {
        id: '3',
        user: { ...sampleUser, username: 'cookingpro', displayName: 'Chef Pro 👨‍🍳', isPremium: true },
        video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
        caption: '60-second pasta hack! 🍝 This will change your cooking game forever! Premium recipe in bio 🔥',
        audio: {
          name: 'Cooking Beats',
          artist: 'Kitchen Vibes',
          cover: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100'
        },
        likes: 67800,
        comments: 2156,
        shares: 1243,
        views: 456700,
        hashtags: ['Cooking', 'FoodHack', 'SlayXova', 'Recipe'],
        isLiked: false,
        timestamp: new Date()
      }
    ]

    // Sample BeReal posts
    const sampleBeRealPosts: BeRealPost[] = [
      {
        id: 'br_1',
        user: sampleUser,
        frontCamera: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400',
        backCamera: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
        location: 'New York, NY',
        timestamp: new Date(),
        reactions: [
          { emoji: '👍', count: 5 },
          { emoji: '❤️', count: 3 },
          { emoji: '😍', count: 2 }
        ],
        comments: [],
        isLate: false
      }
    ]

    setUser(sampleUser)
    setPosts(samplePosts)
    setStories(sampleStories)
    setReels(sampleReels)
    setBeRealPosts(sampleBeRealPosts)

    // Load integrated Instagram feed
    loadIntegratedFeed()
  }, [])

  // Load integrated Instagram feed
  const loadIntegratedFeed = async () => {
    try {
      const igPosts = await instagramIntegration.getIntegratedFeed()
      setIntegratedFeed(igPosts)
    } catch (error) {
      console.error('Failed to load Instagram feed:', error)
    }
  }

  // Cross-platform search function
  const handleCrossPlatformSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    try {
      const results = await crossPlatformSearch.searchAllPlatforms(query)
      setSearchResults(results.all)
    } catch (error) {
      console.error('Search failed:', error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  // Trigger BeReal notification
  const triggerBeReal = async () => {
    try {
      const notification = await beRealAPI.triggerBeRealMoment()
      setBeRealNotification(notification)
      
      // Auto-hide notification after 2 minutes
      setTimeout(() => {
        setBeRealNotification(null)
      }, 2 * 60 * 1000)
    } catch (error) {
      console.error('BeReal trigger failed:', error)
    }
  }

  const login = () => {
    setIsLoggedIn(true)
    setCurrentTab('home')
  }

  const renderLogin = () => (
    <motion.div 
      className="min-h-screen flex items-center justify-center p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold gradient-text mb-2">SlayXova</h1>
          <p className="text-gray-400">Connect • Create • Earn • Slay</p>
        </div>

        <div className="space-y-4">
          <input
            type="tel"
            placeholder="Phone number"
            className="w-full px-4 py-3 bg-dark-200 rounded-lg focus:ring-2 ring-primary-500 outline-none"
          />
          
          <button onClick={login} className="btn-primary w-full py-3">
            Continue with Phone
          </button>
          
          <div className="flex space-x-3">
            <button onClick={login} className="btn-secondary flex-1 py-3">
              Google
            </button>
            <button onClick={login} className="btn-secondary flex-1 py-3">
              Discord
            </button>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          By continuing, you agree to our Terms and Privacy Policy
        </div>
      </div>
    </motion.div>
  )

  const renderStories = () => (
    <div className="flex space-x-3 p-4 overflow-x-auto scrollbar-hide">
      <div className="flex-shrink-0">
        <div className="w-16 h-16 bg-dark-200 rounded-full flex items-center justify-center">
          <Plus className="w-6 h-6 text-primary-400" />
        </div>
        <p className="text-xs text-center mt-1">Your Story</p>
      </div>
      {stories.map((story) => (
        <div key={story.id} className="flex-shrink-0">
          <div className={`story-ring ${story.viewed ? 'opacity-50' : ''}`}>
            <img
              src={story.user.avatar}
              alt={story.user.username}
              className="w-14 h-14 rounded-full object-cover"
            />
          </div>
          <p className="text-xs text-center mt-1">{story.user.username}</p>
        </div>
      ))}
    </div>
  )

  const renderPost = (post: Post) => (
    <motion.div
      key={post.id}
      className="bg-dark-100 border border-dark-300 rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <img
            src={post.user.avatar}
            alt={post.user.username}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">{post.user.displayName}</span>
              {post.user.isVerified && <Star className="w-4 h-4 text-blue-500" />}
              {post.user.isPremium && <Crown className="w-4 h-4 text-yellow-500" />}
            </div>
            <span className="text-sm text-gray-400">@{post.user.username}</span>
          </div>
        </div>
        <MoreHorizontal className="w-5 h-5 text-gray-400" />
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-sm">{post.content}</p>
        {post.isPremium && (
          <div className="flex items-center space-x-2 mt-2 p-2 bg-primary-900 bg-opacity-20 rounded">
            <Lock className="w-4 h-4 text-primary-400" />
            <span className="text-sm text-primary-400">Premium Content</span>
          </div>
        )}
      </div>

      {/* Media */}
      {post.image && (
        <img
          src={post.image}
          alt="Post content"
          className="w-full h-64 object-cover"
        />
      )}

      {/* Actions */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-6">
          <button className="flex items-center space-x-2 hover:text-red-500 transition">
            <Heart className="w-5 h-5" />
            <span className="text-sm">{post.likes}</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-blue-500 transition">
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm">{post.comments}</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-green-500 transition">
            <Share className="w-5 h-5" />
            <span className="text-sm">{post.shares}</span>
          </button>
        </div>
        {post.isPremium && (
          <button className="flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition">
            <DollarSign className="w-4 h-4" />
            <span className="text-sm">Tip</span>
          </button>
        )}
      </div>
    </motion.div>
  )

  const renderBeRealPost = (beReal: BeRealPost) => (
    <div key={beReal.id} className="bg-dark-100 border border-dark-300 rounded-lg overflow-hidden mb-4">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <img
            src={beReal.user.avatar}
            alt={beReal.user.username}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">{beReal.user.displayName}</span>
              <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded-full font-bold">
                BeReal
              </span>
              {beReal.isLate && (
                <span className="text-xs text-red-400">
                  {beReal.lateMinutes}min late
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <MapPin className="w-3 h-3" />
              <span>{beReal.location}</span>
              <Clock className="w-3 h-3 ml-2" />
              <span>{new Date(beReal.timestamp).toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
        <button className="btn-primary px-4 py-2 text-sm" onClick={triggerBeReal}>
          <Shuffle className="w-4 h-4 mr-1" />
          Be Real
        </button>
      </div>

      {/* Dual Camera View */}
      <div className="relative">
        <img
          src={beReal.backCamera}
          alt="Back camera"
          className="w-full h-80 object-cover"
        />
        {/* Front camera overlay */}
        <div className="absolute top-4 left-4 w-24 h-32 rounded-lg overflow-hidden border-2 border-white shadow-lg">
          <img
            src={beReal.frontCamera}
            alt="Front camera"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Reactions */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          {beReal.reactions.map((reaction, i) => (
            <button key={i} className="flex items-center space-x-1 hover:bg-dark-200 rounded px-2 py-1 transition">
              <span className="text-lg">{reaction.emoji}</span>
              <span className="text-sm">{reaction.count}</span>
            </button>
          ))}
          <button className="text-gray-400 hover:text-white transition">
            <MessageSquare className="w-5 h-5" />
          </button>
        </div>
        <span className="text-sm text-gray-400">
          {new Date(beReal.timestamp).toLocaleDateString()}
        </span>
      </div>
    </div>
  )

  const renderHome = () => (
    <div className="pb-20">
      {/* BeReal Notification */}
      {beRealNotification && (
        <motion.div
          className="fixed top-4 left-4 right-4 z-50 bg-yellow-500 text-black p-4 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold">{beRealNotification.title}</h3>
              <p className="text-sm">{beRealNotification.message}</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold">⏰</div>
              <div className="text-xs">2:00</div>
            </div>
          </div>
        </motion.div>
      )}

      {renderStories()}
      
      {/* BeReal Posts */}
      {beRealPosts.length > 0 && (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <span className="bg-yellow-500 text-black px-2 py-1 rounded mr-2 text-sm font-bold">
              BeReal
            </span>
            Recent Moments
          </h3>
          {beRealPosts.map(renderBeRealPost)}
        </div>
      )}

      {/* Regular Posts */}
      <div className="space-y-4 p-4">
        {/* Integrated Instagram Posts */}
        {integratedFeed.map((post) => (
          <div key={`ig-${post.id}`} className="relative">
            {renderPost(post)}
            <div className="absolute top-2 right-2">
              <Instagram className="w-5 h-5 text-pink-500" />
            </div>
          </div>
        ))}
        
        {/* Regular SlayXova Posts */}
        {posts.map(renderPost)}
      </div>
    </div>
  )

  const renderChat = () => (
    <div className="pb-20">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Messages</h2>
        
        {/* Cross-Platform Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search friends across all platforms..."
            className="w-full pl-10 pr-4 py-2 bg-dark-200 rounded-lg outline-none focus:ring-2 ring-primary-500"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              handleCrossPlatformSearch(e.target.value)
            }}
          />
          {isSearching && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Search Results</h3>
            <div className="space-y-2">
              {searchResults.map((result) => (
                <div key={result.id} className="flex items-center justify-between p-3 bg-dark-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <img
                      src={result.avatar}
                      alt={result.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{result.displayName}</span>
                        {result.verified && <Star className="w-3 h-3 text-blue-400" />}
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          result.platform === 'instagram' ? 'bg-pink-500' :
                          result.platform === 'discord' ? 'bg-indigo-500' :
                          result.platform === 'snapchat' ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}>
                          {result.platform}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">@{result.username}</p>
                      {result.reason && (
                        <p className="text-xs text-gray-500">{result.reason}</p>
                      )}
                    </div>
                  </div>
                  <button className="btn-primary px-3 py-1 text-sm">
                    <UserPlus className="w-4 h-4 mr-1" />
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Active Status */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-400">Active now</span>
        </div>

        {/* Chat List */}
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex items-center space-x-3 p-3 hover:bg-dark-200 rounded-lg cursor-pointer transition"
              onClick={() => setActiveChat(`chat-${i}`)}
            >
              <div className="relative">
                <img
                  src={`https://images.unsplash.com/photo-151784118${i}755-2616b612b786?w=50`}
                  alt="User"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-black rounded-full"></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">User {i}</span>
                  <span className="text-xs text-gray-400">2m</span>
                </div>
                <p className="text-sm text-gray-400 truncate">Last message preview...</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderDiscover = () => (
    <div className="pb-20">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Discover</h2>
        
        {/* Categories */}
        <div className="flex space-x-3 mb-6 overflow-x-auto scrollbar-hide">
          {['Trending', 'Gaming', 'Music', 'Art', 'NSFW', 'Lifestyle'].map((category) => (
            <button
              key={category}
              className="flex-shrink-0 px-4 py-2 bg-dark-200 hover:bg-primary-600 rounded-full text-sm transition"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Trending Creators */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-primary-400" />
            Trending Creators
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-dark-200 rounded-lg p-4 text-center">
                <img
                  src={`https://images.unsplash.com/photo-151784118${i}755-2616b612b786?w=100`}
                  alt="Creator"
                  className="w-16 h-16 rounded-full mx-auto mb-2 object-cover"
                />
                <h4 className="font-semibold">Creator {i}</h4>
                <p className="text-sm text-gray-400">@creator{i}</p>
                <button className="btn-primary w-full mt-2 py-1 text-sm">Follow</button>
              </div>
            ))}
          </div>
        </div>

        {/* Servers/Communities */}
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <Users className="w-5 h-5 mr-2 text-primary-400" />
            Communities
          </h3>
          <div className="space-y-3">
            {[
              { name: 'Gaming Central', members: '125K', category: 'Gaming' },
              { name: 'Art & Design', members: '89K', category: 'Creative' },
              { name: 'Music Lovers', members: '156K', category: 'Music' },
              { name: 'Adult Content', members: '234K', category: 'NSFW', isNSFW: true }
            ].map((server, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-dark-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold">{server.name}</h4>
                      {server.isNSFW && <Eye className="w-4 h-4 text-red-500" />}
                    </div>
                    <p className="text-sm text-gray-400">{server.members} members</p>
                  </div>
                </div>
                <button className="btn-secondary px-4 py-1 text-sm">Join</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderProfile = () => (
    <div className="pb-20">
      {user && (
        <div>
          {/* Header */}
          <div className="relative">
            <div className="h-32 bg-gradient-to-r from-primary-600 to-pink-600"></div>
            <img
              src={user.avatar}
              alt={user.username}
              className="absolute -bottom-8 left-4 w-16 h-16 rounded-full border-4 border-black object-cover"
            />
          </div>

          {/* Profile Info */}
          <div className="p-4 pt-12">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl font-bold">{user.displayName}</h2>
                  {user.isVerified && <Star className="w-5 h-5 text-blue-500" />}
                  {user.isPremium && <Crown className="w-5 h-5 text-yellow-500" />}
                </div>
                <p className="text-gray-400">@{user.username}</p>
              </div>
              <Settings className="w-6 h-6 text-gray-400" />
            </div>

            {/* Stats */}
            <div className="flex space-x-6 mb-6">
              <div className="text-center">
                <div className="text-xl font-bold">{user.followers.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">{user.following.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Following</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">42</div>
                <div className="text-sm text-gray-400">Posts</div>
              </div>
            </div>

            {/* Premium Features */}
            <div className="bg-gradient-to-r from-primary-900 to-pink-900 bg-opacity-20 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold flex items-center">
                    <Crown className="w-5 h-5 mr-2 text-yellow-500" />
                    Premium Creator
                  </h3>
                  <p className="text-sm text-gray-400">Monetize your content</p>
                </div>
                <button className="btn-primary px-4 py-2">
                  <DollarSign className="w-4 h-4 mr-1" />
                  Earnings
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button className="btn-secondary p-3 flex items-center justify-center space-x-2">
                <Bell className="w-4 h-4" />
                <span>Notifications</span>
              </button>
              <button className="btn-secondary p-3 flex items-center justify-center space-x-2">
                <Gift className="w-4 h-4" />
                <span>Gifts</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  const renderReel = (reel: Reel, index: number) => (
    <motion.div
      key={reel.id}
      className="reel-item relative h-screen w-full bg-black flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Video Background */}
      <div className="absolute inset-0">
        <img
          src={reel.thumbnail}
          alt="Reel thumbnail"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>

      {/* Video Controls Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-16 h-16 bg-black bg-opacity-50 rounded-full flex items-center justify-center backdrop-blur-sm"
        >
          {isPlaying ? (
            <Pause className="w-8 h-8 text-white ml-1" />
          ) : (
            <Play className="w-8 h-8 text-white ml-1" />
          )}
        </button>
      </div>

      {/* Right Side Actions */}
      <div className="absolute right-4 bottom-20 flex flex-col items-center space-y-6">
        {/* User Avatar */}
        <div className="relative">
          <img
            src={reel.user.avatar}
            alt={reel.user.username}
            className="w-12 h-12 rounded-full border-2 border-white object-cover"
          />
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
            <Plus className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Like Button */}
        <button className="flex flex-col items-center space-y-1">
          <div className={`reel-action-btn w-12 h-12 rounded-full flex items-center justify-center transition-all ${reel.isLiked ? 'bg-red-500 scale-110' : ''}`}>
            <Heart className={`w-6 h-6 transition-all ${reel.isLiked ? 'text-white fill-current animate-pulse' : 'text-white'}`} />
          </div>
          <span className="text-white text-xs font-medium">{(reel.likes / 1000).toFixed(1)}K</span>
        </button>

        {/* Comment Button */}
        <button className="flex flex-col items-center space-y-1">
          <div className="reel-action-btn w-12 h-12 rounded-full flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <span className="text-white text-xs font-medium">{reel.comments}</span>
        </button>

        {/* Share Button */}
        <button className="flex flex-col items-center space-y-1">
          <div className="reel-action-btn w-12 h-12 rounded-full flex items-center justify-center">
            <Share className="w-6 h-6 text-white" />
          </div>
          <span className="text-white text-xs font-medium">{reel.shares}</span>
        </button>

        {/* Bookmark Button */}
        <button className="flex flex-col items-center space-y-1">
          <div className="reel-action-btn w-12 h-12 rounded-full flex items-center justify-center">
            <Bookmark className="w-6 h-6 text-white" />
          </div>
        </button>

        {/* Audio/Music */}
        <button className="relative">
          <div className="w-10 h-10 rounded-lg overflow-hidden border-2 border-white">
            <img
              src={reel.audio.cover}
              alt="Audio cover"
              className={`w-full h-full object-cover ${isPlaying ? 'audio-playing' : ''}`}
            />
          </div>
        </button>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-20 left-4 right-20 text-white">
        {/* User Info */}
        <div className="flex items-center space-x-3 mb-3">
          <span className="font-semibold">@{reel.user.username}</span>
          {reel.user.isVerified && <Star className="w-4 h-4 text-blue-400" />}
          {reel.user.isPremium && <Crown className="w-4 h-4 text-yellow-400" />}
          <button className="border border-white px-3 py-1 rounded text-sm font-medium">
            Follow
          </button>
        </div>

        {/* Caption */}
        <p className="text-sm mb-2 leading-relaxed">
          {reel.caption}
        </p>

        {/* Hashtags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {reel.hashtags.map((tag, i) => (
            <span key={i} className="text-primary-400 text-sm">#{tag}</span>
          ))}
        </div>

        {/* Audio Info */}
        <div className="flex items-center space-x-2">
          <Music className="w-4 h-4 text-white" />
          <span className="text-sm">{reel.audio.name} • {reel.audio.artist}</span>
        </div>

        {/* Views Count */}
        <div className="mt-2">
          <span className="text-xs text-gray-300">{(reel.views / 1000).toFixed(1)}K views</span>
        </div>
      </div>

      {/* Top Controls */}
      <div className="absolute top-12 right-4 flex space-x-4">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="w-10 h-10 bg-black bg-opacity-50 backdrop-blur-sm rounded-full flex items-center justify-center"
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-white" />
          ) : (
            <Volume2 className="w-5 h-5 text-white" />
          )}
        </button>
      </div>
    </motion.div>
  )

  const renderReels = () => (
    <div className="h-screen overflow-hidden relative">
      <div className="reels-container h-full overflow-y-scroll scrollbar-hide">
        {reels.map((reel, index) => renderReel(reel, index))}
      </div>
      
      {/* Navigation Dots */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2">
        {reels.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentReelIndex(index)}
            className={`w-1 h-8 rounded-full transition-all ${
              currentReelIndex === index ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  )

  const renderUpload = () => (
    <div className="pb-20">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-6">Create Content</h2>
        
        {/* Upload Options */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button className="bg-dark-200 hover:bg-dark-300 p-6 rounded-lg text-center transition">
            <Camera className="w-8 h-8 mx-auto mb-2 text-primary-400" />
            <span className="block text-sm font-medium">Photo</span>
            <span className="text-xs text-gray-400">Share a moment</span>
          </button>
          
          <button 
            onClick={() => setCurrentTab('reels')}
            className="bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 p-6 rounded-lg text-center transition transform hover:scale-105"
          >
            <Video className="w-8 h-8 mx-auto mb-2 text-white" />
            <span className="block text-sm font-medium text-white">Reel</span>
            <span className="text-xs text-pink-100">Create viral content</span>
          </button>
          
          <button className="bg-dark-200 hover:bg-dark-300 p-6 rounded-lg text-center transition">
            <Zap className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
            <span className="block text-sm font-medium">Story</span>
            <span className="text-xs text-gray-400">24hr disappearing</span>
          </button>
          
          <button className="bg-dark-200 hover:bg-dark-300 p-6 rounded-lg text-center transition">
            <Lock className="w-8 h-8 mx-auto mb-2 text-red-400" />
            <span className="block text-sm font-medium">Premium</span>
            <span className="text-xs text-gray-400">Paid content</span>
          </button>
        </div>

        {/* Quick Post */}
        <div className="bg-dark-200 rounded-lg p-4">
          <textarea
            placeholder="What's on your mind?"
            className="w-full bg-transparent resize-none outline-none mb-4 min-h-[100px]"
          />
          
          <div className="flex items-center justify-between">
            <div className="flex space-x-4">
              <Image className="w-5 h-5 text-gray-400 hover:text-primary-400 cursor-pointer transition" />
              <Smile className="w-5 h-5 text-gray-400 hover:text-primary-400 cursor-pointer transition" />
              <Users className="w-5 h-5 text-gray-400 hover:text-primary-400 cursor-pointer transition" />
            </div>
            
            <button className="btn-primary px-6 py-2">Post</button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderNavigation = () => (
    <nav className="fixed bottom-0 left-0 right-0 bg-dark-100 border-t border-dark-300 px-4 py-2 z-50">
      <div className="flex justify-around items-center">
        {[
          { id: 'home', icon: Home, label: 'Home' },
          { id: 'reels', icon: Video, label: 'Reels' },
          { id: 'upload', icon: Plus, label: 'Create', isSpecial: true },
          { id: 'chat', icon: MessageCircle, label: 'Chat' },
          { id: 'profile', icon: User, label: 'Profile' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCurrentTab(tab.id)}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all ${
              currentTab === tab.id
                ? 'text-primary-400'
                : 'text-gray-400 hover:text-white'
            } ${
              tab.isSpecial
                ? 'bg-primary-600 text-white hover:bg-primary-700 transform hover:scale-105'
                : ''
            }`}
          >
            <tab.icon className={`w-5 h-5 ${tab.isSpecial ? 'w-6 h-6' : ''}`} />
            <span className="text-xs mt-1">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )

  const renderCurrentTab = () => {
    switch (currentTab) {
      case 'home':
        return renderHome()
      case 'reels':
        return renderReels()
      case 'chat':
        return renderChat()
      case 'profile':
        return renderProfile()
      case 'upload':
        return renderUpload()
      default:
        return renderHome()
    }
  }

  if (!isLoggedIn) {
    return renderLogin()
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {renderCurrentTab()}
        </motion.div>
      </AnimatePresence>
      
      {renderNavigation()}
    </div>
  )
}