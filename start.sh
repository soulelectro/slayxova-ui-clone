#!/bin/bash

echo "🚀 Starting SlayXova - All-in-One Social Media Platform"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Make sure you're in the SlayXova directory."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Creating from .env.example..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "✅ .env file created. Please edit it with your configuration."
        echo "   Required: MongoDB URI, JWT Secret, Cloudinary credentials"
    else
        echo "❌ .env.example not found. Please create .env file manually."
        exit 1
    fi
fi

# Check if MongoDB is running (optional check)
echo "🔍 Checking MongoDB connection..."
if command -v mongosh &> /dev/null; then
    mongosh --eval "db.runCommand('ping')" --quiet 2>/dev/null
    if [ $? -eq 0 ]; then
        echo "✅ MongoDB is running"
    else
        echo "⚠️  MongoDB might not be running. Please start MongoDB if using local instance."
    fi
elif command -v mongo &> /dev/null; then
    mongo --eval "db.runCommand('ping')" --quiet 2>/dev/null
    if [ $? -eq 0 ]; then
        echo "✅ MongoDB is running"
    else
        echo "⚠️  MongoDB might not be running. Please start MongoDB if using local instance."
    fi
else
    echo "ℹ️  MongoDB CLI not found. Assuming you're using a cloud instance."
fi

echo ""
echo "🚀 Starting SlayXova servers..."
echo ""

# Function to handle cleanup
cleanup() {
    echo ""
    echo "🛑 Shutting down SlayXova..."
    jobs -p | xargs -r kill
    exit 0
}

# Set trap to cleanup on exit
trap cleanup SIGINT SIGTERM

# Start backend server in background
echo "🖥️  Starting backend server on port 5000..."
npm run server &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend server in background
echo "🌐 Starting frontend server on port 3000..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ SlayXova is starting up!"
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend:  http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Wait for background processes
wait