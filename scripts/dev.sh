#!/bin/bash

# Development startup script with checks

echo "🔧 Starting Book Landing Frontend Development Server..."
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local not found. Creating from example..."
    cp .env.example .env.local
    echo "✅ Created .env.local"
    echo "⚠️  Please edit .env.local with your backend API URL"
    echo ""
fi

# Check if node_modules exists
if [ ! -d node_modules ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Check if backend is running
API_URL=$(grep NEXT_PUBLIC_API_URL .env.local | cut -d '=' -f2)
if [ ! -z "$API_URL" ]; then
    echo "🔍 Checking backend connection..."
    if curl -s -f -o /dev/null "${API_URL%/api}/api/health" 2>/dev/null; then
        echo "✅ Backend is running at $API_URL"
    else
        echo "⚠️  Cannot connect to backend at $API_URL"
        echo "   Make sure your backend is running!"
    fi
    echo ""
fi

echo "🚀 Starting development server..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

npm run dev

