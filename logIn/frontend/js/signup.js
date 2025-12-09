// Signup page JavaScript

const API_BASE_URL = 'http://localhost/logIn/backend/api';

$(document).ready(function() {
    // Redirect if already logged in
    if (redirectIfAuthenticated()) {
        return;
    }

    // Handle form submission
    $('#signupForm').on('submit', function(e) {
        e.preventDefault();
        
        // Reset previous validation states
        $('.form-control').removeClass('is-invalid');
        $('#signupMessage').addClass('d-none').removeClass('alert-success alert-danger');
        
        // Get form values
        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const password = $('#password').val();
        const confirmPassword = $('#confirmPassword').val();
        
        // Validate passwords match
        if (password !== confirmPassword) {
            $('#confirmPassword').addClass('is-invalid');
            $('#confirmPassword').next('.invalid-feedback').text('Passwords do not match');
            return;
        }
        
        // Validate password length
        if (password.length < 6) {
            $('#password').addClass('is-invalid');
            $('#password').next('.invalid-feedback').text('Password must be at least 6 characters');
            return;
        }
        
        // Show loading state
        const submitBtn = $(this).find('button[type="submit"]');
        const originalText = submitBtn.text();
        submitBtn.prop('disabled', true).text('Creating Account...');
        
        // Prepare data
        const userData = {
            name: name,
            email: email,
            password: password
        };
        
        // Make AJAX request
        $.ajax({
            url: API_BASE_URL + '/signup.php',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(userData),
            success: function(response) {
                if (response.success) {
                    $('#signupMessage')
                        .removeClass('d-none alert-danger')
                        .addClass('alert-success')
                        .text('Registration successful! Redirecting to login...');
                    
                    // Redirect to login page after 2 seconds
                    setTimeout(function() {
                        window.location.href = 'login.html';
                    }, 2000);
                } else {
                    showError(response.message || 'Registration failed');
                }
            },
            error: function(xhr, status, error) {
                let errorMessage = 'Registration failed. Please try again.';
                
                if (xhr.responseJSON && xhr.responseJSON.message) {
                    errorMessage = xhr.responseJSON.message;
                } else if (xhr.status === 409) {
                    errorMessage = 'Email already registered. Please use a different email.';
                    $('#email').addClass('is-invalid');
                    $('#email').next('.invalid-feedback').text(errorMessage);
                } else if (xhr.status === 400) {
                    errorMessage = 'Please check your input and try again.';
                    if (xhr.responseJSON && xhr.responseJSON.message) {
                        errorMessage = xhr.responseJSON.message;
                    }
                }
                
                showError(errorMessage);
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
    
    $('#confirmPassword').on('input', function() {
        const password = $('#password').val();
        const confirmPassword = $(this).val();
        
        if (confirmPassword && password !== confirmPassword) {
            $(this).addClass('is-invalid');
            $(this).next('.invalid-feedback').text('Passwords do not match');
        } else {
            $(this).removeClass('is-invalid');
        }
    });
});

function showError(message) {
    $('#signupMessage')
        .removeClass('d-none alert-success')
        .addClass('alert-danger')
        .text(message);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

