# Troubleshooting Redirect Issues

## Login Not Redirecting to Profile

If login is successful but not redirecting, try these steps:

### 1. Check Browser Console
Open browser DevTools (F12) and check the Console tab for any errors.

### 2. Verify Token Storage
After clicking login, open Console and type:
```javascript
localStorage.getItem('auth_token')
```
This should return a token string. If it's `null`, the token isn't being stored.

### 3. Manual Navigation Test
Try manually navigating to `/profile` in your browser after login. If it works, the issue is with the redirect logic.

### 4. Check Route Guards
The `PrivateRoute` component checks authentication. Make sure:
- `isAuthenticated()` function in `utils/auth.js` is checking localStorage correctly
- Token is stored before redirect attempts

### 5. Restart Development Servers
Sometimes React needs a restart to pick up route changes:
```bash
# Stop both servers (Ctrl+C)
# Restart backend
cd server
npm start

# Restart frontend (in new terminal)
cd client
npm start
```

### 6. Clear Browser Cache
- Clear browser cache and localStorage
- Or use Incognito/Private window for testing

### 7. Check Network Tab
In DevTools Network tab, verify:
- Login API call returns 200 status
- Response contains `success: true` and `token` field
- No CORS errors

### 8. Verify React Router
Ensure `react-router-dom` is installed:
```bash
cd client
npm list react-router-dom
```

If not installed:
```bash
npm install react-router-dom
```

## Common Issues and Solutions

### Issue: "Cannot read property 'data' of undefined"
**Solution:** Check that API response is successful before accessing `response.data`

### Issue: Redirect loops
**Solution:** Check that `PublicRoute` isn't redirecting authenticated users back to login

### Issue: Profile page shows "Unauthorized"
**Solution:** 
1. Check Redis is running
2. Verify token is being sent in API requests
3. Check backend authentication middleware

## Still Not Working?

If none of these help, check:
1. Server logs for errors
2. Browser console for JavaScript errors
3. Network tab for failed API calls
4. Verify MongoDB and Redis are running

