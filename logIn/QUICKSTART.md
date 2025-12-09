# Quick Start Guide

## Prerequisites Check

Make sure you have installed:
- ✅ Node.js (v14+)
- ✅ MongoDB
- ✅ Redis

## Quick Setup (5 minutes)

### 1. Start MongoDB
```bash
# Windows
mongod

# macOS/Linux
brew services start mongodb-community  # macOS
sudo systemctl start mongod            # Linux
```

### 2. Start Redis
```bash
# Windows
redis-server.exe

# macOS/Linux
redis-server
# or
brew services start redis  # macOS
sudo systemctl start redis # Linux
```

### 3. Backend Setup
```bash
cd server
npm install
cp env.example .env
# Edit .env if needed (defaults should work)
npm start
```

Backend runs on: http://localhost:5000

### 4. Frontend Setup (New Terminal)
```bash
cd client
npm install
npm start
```

Frontend runs on: http://localhost:3000

## Test the Application

1. Open http://localhost:3000
2. Click "Sign up here" or go to `/signup`
3. Register with:
   - Name: John Doe
   - Email: john@example.com
   - Password: password123
4. After registration, login with the same credentials
5. Update your profile with age, DOB, and contact

## Troubleshooting

**MongoDB not running?**
```bash
mongosh  # Test connection
```

**Redis not running?**
```bash
redis-cli ping  # Should return PONG
```

**Port already in use?**
- Backend: Change `PORT` in `server/.env`
- Frontend: React will ask to use different port

**Dependencies issues?**
```bash
# Delete and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Project Structure

- `server/` - Backend API (Node.js/Express)
- `client/` - Frontend (React)
- See README.md for detailed documentation

