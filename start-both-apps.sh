#!/bin/bash

# Bash script to start both Angular and AngularJS applications
echo "🚀 Starting AngularJS 1.4.9 and Angular 20 Applications..."

# Function to check if a port is in use
check_port() {
    local port=$1
    if command -v nc >/dev/null 2>&1; then
        nc -z localhost $port >/dev/null 2>&1
    elif command -v telnet >/dev/null 2>&1; then
        timeout 1 bash -c "</dev/tcp/localhost/$port" >/dev/null 2>&1
    else
        # Fallback using curl
        curl -s "http://localhost:$port" >/dev/null 2>&1
    fi
}

# Start AngularJS app in background
echo "📦 Starting AngularJS 1.4.9 app on port 3000..."
cd angularjs-1.4.9
npm run serve &
ANGULARJS_PID=$!
cd ..

# Wait a moment for the server to start
sleep 3

# Check if AngularJS server started
if check_port 3000; then
    echo "✅ AngularJS app is running on http://localhost:3000"
else
    echo "⚠️  AngularJS app may still be starting..."
fi

# Start Angular 20 app (this will run in foreground)
echo "🔥 Starting Angular 20 app..."
cd angular-20
npm start

# Cleanup function
cleanup() {
    echo "🛑 Shutting down applications..."
    kill $ANGULARJS_PID 2>/dev/null
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup EXIT INT TERM

echo "🎉 Both applications should now be running!"
echo "📱 AngularJS: http://localhost:3000"
echo "🅰️  Angular 20: http://localhost:4200"