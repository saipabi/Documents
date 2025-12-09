# Application Flow Documentation

## Exact Flow Implementation

### ✅ Flow: Register → Login → Profile

---

## 1. Register Page (`/register`)

**Route:** `/register` (Default route - `/` redirects to `/register`)

**Features:**
- User enters: Name, Email, Password, Confirm Password
- Form validation (required fields, email format, password length ≥ 6)
- Password confirmation matching

**On Successful Submit:**
- ✅ Saves user data in MongoDB via `/api/auth/signup`
- ✅ Shows success message: "Registration successful! Redirecting to login..."
- ✅ Automatically redirects to `/login` page after 1.5 seconds

**Component:** `client/src/components/Register.js`

---

## 2. Login Page (`/login`)

**Route:** `/login`

**Features:**
- User enters: Email, Password (same credentials used during registration)
- Form validation (email format, required fields)

**On Successful Login:**
- ✅ Validates credentials against MongoDB
- ✅ Creates session token and stores in Redis
- ✅ Stores token in browser localStorage
- ✅ Automatically redirects to `/profile` page immediately

**Component:** `client/src/components/Login.js`

---

## 3. Profile Page (`/profile`)

**Route:** `/profile` (Protected route - requires authentication)

**Features:**
- ✅ Displays user information:
  - Name (editable)
  - Email (read-only, cannot be changed)
  - Age (editable)
  - Date of Birth (editable)
  - Contact Number (editable)
  - Member Since (read-only, shows account creation date)

**Update Functionality:**
- ✅ User can update: Name, Age, Date of Birth, Contact
- ✅ Form validation (name required, age 1-150)
- ✅ On "Update Profile" click:
  - Saves updated data to MongoDB via `/api/profile` (PUT request)
  - Shows success message
  - Refreshes profile data

**Component:** `client/src/components/Profile.js`

---

## Route Configuration

```javascript
/ → redirects to /register
/register → Register component (public route)
/login → Login component (public route)
/profile → Profile component (private route - requires auth)
```

---

## Navigation Links

- **Register page:** "Already have an account? [Login here](/login)"
- **Login page:** "Don't have an account? [Register here](/register)"
- **Profile page:** Logout button in navbar

---

## API Endpoints

### Backend Routes (`server/routes/`)

1. **POST** `/api/auth/signup` - Register new user
2. **POST** `/api/auth/login` - User login
3. **GET** `/api/profile` - Get user profile (requires auth token)
4. **PUT** `/api/profile` - Update user profile (requires auth token)
5. **POST** `/api/logout` - Logout user (requires auth token)

---

## Authentication Flow

1. **Registration:**
   - User fills form → API call → MongoDB save → Redirect to Login

2. **Login:**
   - User enters credentials → API validates → Token generated → 
   - Token stored in Redis (backend) → Token stored in localStorage (frontend) → 
   - Redirect to Profile

3. **Profile Access:**
   - PrivateRoute checks localStorage for token
   - If token exists → Show Profile
   - If no token → Redirect to Login

4. **Profile Update:**
   - User updates fields → API call with auth token → MongoDB update → Success message

---

## Session Management

- **Client-side:** Token stored in `localStorage` as `auth_token`
- **Server-side:** Session stored in Redis with token as key
- **Token expiration:** 1 hour (3600 seconds)
- **No PHP sessions:** Using Redis + localStorage only

---

## Database Storage

- **MongoDB:** Stores all user data (name, email, password hash, age, dob, contact)
- **Redis:** Stores session tokens (mapped to user IDs)

---

## All Requirements Met ✅

✅ Register page with name, email, password  
✅ Save user in MongoDB on registration  
✅ Redirect to Login after registration  
✅ Login page with email + password  
✅ Redirect to Profile after login  
✅ Profile page with age, dob, contact fields  
✅ User can view + update profile details  
✅ Updated data saved in MongoDB  
✅ Routes: /register, /login, /profile  
✅ / redirects to /register  

