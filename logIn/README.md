# User Authentication System - MERN Stack

A complete authentication system built with MongoDB, Express, React, and Node.js, featuring user registration, login, and profile management.

## Features

- ✅ User Registration (Signup)
- ✅ User Login with session management
- ✅ Profile page with additional details (age, DOB, contact)
- ✅ Profile update functionality
- ✅ Session management using Redis and localStorage
- ✅ MongoDB database with Mongoose ODM
- ✅ Bootstrap 5 responsive design
- ✅ React Router for navigation
- ✅ Axios for API communication (no form submissions)

## Tech Stack

- **Frontend**: React 18, React Router DOM, Axios, Bootstrap 5
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Session Storage**: Redis (backend), localStorage (frontend)
- **Styling**: Bootstrap 5 with custom CSS

## Project Structure

```
logIn/
├── server/                    # Backend (Node.js/Express)
│   ├── config/
│   │   ├── database.js       # MongoDB connection
│   │   └── redis.js          # Redis configuration and session functions
│   ├── models/
│   │   └── User.js           # User Mongoose model
│   ├── routes/
│   │   ├── authRoutes.js     # Signup and login routes
│   │   ├── profileRoutes.js  # Profile CRUD routes
│   │   └── logoutRoutes.js   # Logout route
│   ├── middleware/
│   │   └── auth.js           # Authentication middleware
│   ├── server.js             # Express server setup
│   ├── package.json
│   └── .env.example
│
├── client/                    # Frontend (React)
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Signup.js     # Registration component
│   │   │   ├── Login.js      # Login component
│   │   │   └── Profile.js    # Profile component
│   │   ├── utils/
│   │   │   ├── auth.js       # Authentication utilities
│   │   │   └── api.js        # Axios instance with interceptors
│   │   ├── App.js            # Main app component with routing
│   │   ├── App.css           # Custom styles
│   │   ├── index.js          # React entry point
│   │   └── index.css
│   └── package.json
│
└── README.md
```

## Prerequisites

Before setting up the project, ensure you have the following installed:

1. **Node.js** (v14 or higher) and **npm** or **yarn**
2. **MongoDB** (v4.4 or higher)
3. **Redis Server** (v6 or higher)

## Installation Steps

### 1. Clone or Navigate to Project Directory

```bash
cd logIn
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env file with your configuration
# Update MONGODB_URI, REDIS_HOST, REDIS_PORT, etc.
```

### 3. Frontend Setup

```bash
# Navigate to client directory (from project root)
cd client

# Install dependencies
npm install
```

### 4. MongoDB Setup

1. **Install MongoDB:**
   - **Windows**: Download from [MongoDB Website](https://www.mongodb.com/try/download/community)
   - **macOS**: `brew install mongodb-community`
   - **Linux**: Follow [MongoDB Installation Guide](https://docs.mongodb.com/manual/installation/)

2. **Start MongoDB:**
   ```bash
   # Windows
   mongod

   # macOS/Linux (if installed as service)
   brew services start mongodb-community  # macOS
   sudo systemctl start mongod            # Linux
   ```

3. **Verify MongoDB is running:**
   ```bash
   mongosh
   # Should connect to MongoDB shell
   ```

### 5. Redis Setup

1. **Install Redis:**
   - **Windows**: Download from [Redis for Windows](https://github.com/microsoftarchive/redis/releases) or use WSL
   - **macOS**: `brew install redis`
   - **Linux**: `sudo apt-get install redis-server` (Ubuntu/Debian)

2. **Start Redis:**
   ```bash
   # Windows
   redis-server.exe

   # macOS/Linux
   redis-server
   # or
   brew services start redis  # macOS
   sudo systemctl start redis # Linux
   ```

3. **Verify Redis is running:**
   ```bash
   redis-cli ping
   # Should return: PONG
   ```

### 6. Configure Environment Variables

Edit `server/.env`:

```env
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/user_auth

# Redis Configuration
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
SESSION_EXPIRY=3600
```

### 7. Run the Application

#### Start Backend Server

```bash
# From server directory
cd server
npm start
# or for development with auto-reload
npm run dev
```

The backend server will run on `http://localhost:5000`

#### Start Frontend Development Server

```bash
# From client directory (in a new terminal)
cd client
npm start
```

The frontend will run on `http://localhost:3000` and automatically open in your browser.

## Usage

### Application Flow

1. **Signup**: Navigate to `/signup` or the home page
   - Register a new user with name, email, and password
   - Password must be at least 6 characters

2. **Login**: Navigate to `/login`
   - Login with registered credentials
   - Token is stored in browser localStorage

3. **Profile**: Automatically redirects after login
   - View profile details
   - Update name, age, date of birth, and contact information

### API Endpoints

#### POST `/api/auth/signup`
Register a new user

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### POST `/api/auth/login`
User login

**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "session_token_here",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### GET `/api/profile`
Get user profile (requires Authorization header)

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 25,
    "dob": "1998-01-01T00:00:00.000Z",
    "contact": "+1234567890",
    "createdAt": "2024-01-01T12:00:00.000Z"
  }
}
```

#### PUT `/api/profile`
Update user profile (requires Authorization header)

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "name": "John Updated",
  "age": 26,
  "dob": "1998-01-01",
  "contact": "+1234567890"
}
```

#### POST `/api/logout`
Logout user

**Headers:**
```
Authorization: Bearer <token>
```

## Security Features

- ✅ Password hashing using bcryptjs
- ✅ MongoDB parameterized queries (Mongoose) prevent injection
- ✅ Session tokens stored in Redis with expiration
- ✅ Token-based authentication (no server-side sessions)
- ✅ Input validation using express-validator
- ✅ CORS configured for cross-origin requests
- ✅ Authentication middleware for protected routes

## Key Requirements Fulfilled

- ✅ **HTML, JS, CSS separated**: React components contain JSX, CSS in separate files
- ✅ **No form submissions**: All communication via Axios (AJAX equivalent)
- ✅ **Bootstrap styling**: Bootstrap 5 for responsive design
- ✅ **MongoDB**: Used for data storage
- ✅ **Prepared statements equivalent**: Mongoose ODM prevents injection attacks
- ✅ **localStorage sessions**: Client-side token storage in browser
- ✅ **Redis sessions**: Server-side session storage in Redis
- ✅ **Flow**: Register → Login → Profile

## Troubleshooting

### MongoDB Connection Error

- Verify MongoDB is running: `mongosh` or check service status
- Check `MONGODB_URI` in `.env` file
- Ensure MongoDB is accessible on default port 27017

### Redis Connection Error

- Verify Redis is running: `redis-cli ping`
- Check Redis configuration in `server/config/redis.js`
- Ensure Redis is accessible on configured host/port

### Node Modules Issues

```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use

```bash
# Change PORT in server/.env file
# Or kill process using the port
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill
```

### CORS Errors

- Ensure backend CORS is configured in `server/server.js`
- Check that frontend proxy is set in `client/package.json`
- Verify API calls use relative paths (handled by proxy)

### Token Not Working

- Check localStorage: Open browser console and type `localStorage.getItem('auth_token')`
- Verify token is sent in Authorization header
- Check Redis session expiration (default: 1 hour)
- Ensure token format: `Bearer <token>`

## Development Notes

- All code is properly separated (React components, utilities, styles)
- Axios is used exclusively for API calls (no form submissions)
- Bootstrap 5 provides responsive design
- Mongoose ODM prevents SQL/MongoDB injection
- localStorage for client-side session storage
- Redis for server-side session storage
- React Router handles navigation and protected routes

## Production Deployment

### Build Frontend

```bash
cd client
npm run build
```

### Environment Variables

Set production environment variables:
- `NODE_ENV=production`
- Update `MONGODB_URI` for production database
- Update `REDIS_HOST` for production Redis
- Set strong `JWT_SECRET`

### Server Setup

- Use process manager like PM2: `pm2 start server/server.js`
- Configure reverse proxy (nginx) for frontend
- Enable HTTPS
- Set up MongoDB and Redis in production mode

## License

This project is created for educational/internship purposes.

## Support

For issues or questions:
- Check browser console (F12)
- Check server logs
- Verify MongoDB and Redis are running
- Review environment variables
