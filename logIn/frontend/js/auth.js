// Common authentication utilities

// API Base URL - Update this to match your server configuration
const API_BASE_URL = 'http://localhost/logIn/backend/api';

// Get token from localStorage
function getAuthToken() {
    return localStorage.getItem('auth_token');
}

// Store token in localStorage
function setAuthToken(token) {
    localStorage.setItem('auth_token', token);
}

// Remove token from localStorage
function removeAuthToken() {
    localStorage.removeItem('auth_token');
}

// Store user info in localStorage
function setUserInfo(user) {
    localStorage.setItem('user_info', JSON.stringify(user));
}

// Get user info from localStorage
function getUserInfo() {
    const userInfo = localStorage.getItem('user_info');
    return userInfo ? JSON.parse(userInfo) : null;
}

// Check if user is authenticated
function isAuthenticated() {
    return getAuthToken() !== null;
}

// Redirect to login if not authenticated
function requireAuth() {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Redirect to profile if already authenticated
function redirectIfAuthenticated() {
    if (isAuthenticated()) {
        window.location.href = 'profile.html';
        return true;
    }
    return false;
}

// Logout function
function logout() {
    const token = getAuthToken();
    
    if (token) {
        $.ajax({
            url: API_BASE_URL + '/logout.php',
            method: 'POST',
            contentType: 'application/json',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            data: JSON.stringify({ token: token }),
            success: function(response) {
                console.log('Logout successful');
            },
            error: function(xhr, status, error) {
                console.log('Logout error:', error);
            }
        });
    }
    
    removeAuthToken();
    localStorage.removeItem('user_info');
    window.location.href = 'login.html';
}

