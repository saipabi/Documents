// Login page JavaScript

const API_BASE_URL = 'http://localhost/logIn/backend/api';

$(document).ready(function() {
    // Redirect if already logged in
    if (redirectIfAuthenticated()) {
        return;
    }

    // Handle form submission
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        
        // Reset previous validation states
        $('.form-control').removeClass('is-invalid');
        $('#loginMessage').addClass('d-none').removeClass('alert-success alert-danger');
        
        // Get form values
        const email = $('#email').val().trim();
        const password = $('#password').val();
        
        // Basic validation
        if (!email || !password) {
            showError('Please fill in all fields');
            return;
        }
        
        // Show loading state
        const submitBtn = $(this).find('button[type="submit"]');
        const originalText = submitBtn.text();
        submitBtn.prop('disabled', true).text('Logging in...');
        
        // Prepare data
        const loginData = {
            email: email,
            password: password
        };
        
        // Make AJAX request
        $.ajax({
            url: API_BASE_URL + '/login.php',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(loginData),
            success: function(response) {
                if (response.success && response.token) {
                    // Store token and user info in localStorage
                    setAuthToken(response.token);
                    if (response.user) {
                        setUserInfo(response.user);
                    }
                    
                    $('#loginMessage')
                        .removeClass('d-none alert-danger')
                        .addClass('alert-success')
                        .text('Login successful! Redirecting to profile...');
                    
                    // Redirect to profile page after 1 second
                    setTimeout(function() {
                        window.location.href = 'profile.html';
                    }, 1000);
                } else {
                    showError(response.message || 'Login failed');
                }
            },
            error: function(xhr, status, error) {
                let errorMessage = 'Login failed. Please check your credentials.';
                
                if (xhr.responseJSON && xhr.responseJSON.message) {
                    errorMessage = xhr.responseJSON.message;
                } else if (xhr.status === 401) {
                    errorMessage = 'Invalid email or password';
                } else if (xhr.status === 0) {
                    errorMessage = 'Cannot connect to server. Please check your connection.';
                }
                
                showError(errorMessage);
                
                // Highlight email field on error
                $('#email').addClass('is-invalid');
                $('#password').addClass('is-invalid');
            },
            complete: function() {
                submitBtn.prop('disabled', false).text(originalText);
            }
        });
    });
    
    // Real-time validation
    $('#email').on('blur', function() {
        const email = $(this).val().trim();
        if (email && !isValidEmail(email)) {
            $(this).addClass('is-invalid');
            $(this).next('.invalid-feedback').text('Please enter a valid email address');
        } else {
            $(this).removeClass('is-invalid');
        }
    });
});

function showError(message) {
    $('#loginMessage')
        .removeClass('d-none alert-success')
        .addClass('alert-danger')
        .text(message);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

