// Profile page JavaScript

const API_BASE_URL = 'http://localhost/logIn/backend/api';

$(document).ready(function() {
    // Check authentication
    if (!requireAuth()) {
        return;
    }

    // Load profile data
    loadProfile();
    
    // Handle logout
    $('#logoutBtn').on('click', function() {
        logout();
    });
    
    // Handle form submission
    $('#profileForm').on('submit', function(e) {
        e.preventDefault();
        
        // Reset previous validation states
        $('.form-control').removeClass('is-invalid');
        $('#profileMessage').addClass('d-none').removeClass('alert-success alert-danger');
        
        // Get form values
        const profileData = {
            name: $('#name').val().trim(),
            age: $('#age').val() ? parseInt($('#age').val()) : null,
            dob: $('#dob').val(),
            contact: $('#contact').val().trim()
        };
        
        // Validate name
        if (!profileData.name) {
            $('#name').addClass('is-invalid');
            $('#name').next('.invalid-feedback').text('Name is required');
            return;
        }
        
        // Validate age if provided
        if (profileData.age && (profileData.age < 1 || profileData.age > 150)) {
            $('#age').addClass('is-invalid');
            $('#age').next('.invalid-feedback').text('Age must be between 1 and 150');
            return;
        }
        
        // Show loading state
        const submitBtn = $(this).find('button[type="submit"]');
        const originalText = submitBtn.text();
        submitBtn.prop('disabled', true).text('Updating...');
        
        // Get auth token
        const token = getAuthToken();
        
        // Make AJAX request
        $.ajax({
            url: API_BASE_URL + '/profile.php',
            method: 'PUT',
            contentType: 'application/json',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            data: JSON.stringify(profileData),
            success: function(response) {
                if (response.success) {
                    $('#profileMessage')
                        .removeClass('d-none alert-danger')
                        .addClass('alert-success')
                        .text('Profile updated successfully!');
                    
                    // Reload profile data
                    loadProfile();
                    
                    // Hide message after 3 seconds
                    setTimeout(function() {
                        $('#profileMessage').addClass('d-none');
                    }, 3000);
                } else {
                    showError(response.message || 'Failed to update profile');
                }
            },
            error: function(xhr, status, error) {
                let errorMessage = 'Failed to update profile. Please try again.';
                
                if (xhr.responseJSON && xhr.responseJSON.message) {
                    errorMessage = xhr.responseJSON.message;
                } else if (xhr.status === 401) {
                    errorMessage = 'Session expired. Please login again.';
                    setTimeout(function() {
                        logout();
                    }, 2000);
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
});

// Load user profile data
function loadProfile() {
    const token = getAuthToken();
    
    // Show loading state
    $('#profileForm input').prop('disabled', true);
    
    $.ajax({
        url: API_BASE_URL + '/profile.php',
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function(response) {
            if (response.success && response.user) {
                const user = response.user;
                
                // Populate form fields
                $('#name').val(user.name || '');
                $('#email').val(user.email || '');
                $('#age').val(user.age || '');
                $('#dob').val(user.dob || '');
                $('#contact').val(user.contact || '');
                
                // Format and display member since date
                if (user.created_at) {
                    const createdDate = new Date(user.created_at);
                    const formattedDate = createdDate.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                    $('#memberSince').text(formattedDate);
                }
            } else {
                showError('Failed to load profile data');
            }
        },
        error: function(xhr, status, error) {
            let errorMessage = 'Failed to load profile. Please try again.';
            
            if (xhr.responseJSON && xhr.responseJSON.message) {
                errorMessage = xhr.responseJSON.message;
            } else if (xhr.status === 401) {
                errorMessage = 'Session expired. Please login again.';
                setTimeout(function() {
                    logout();
                }, 2000);
            }
            
            showError(errorMessage);
        },
        complete: function() {
            // Re-enable form fields
            $('#profileForm input').prop('disabled', false);
            // Keep email disabled
            $('#email').prop('disabled', true);
        }
    });
}

function showError(message) {
    $('#profileMessage')
        .removeClass('d-none alert-success')
        .addClass('alert-danger')
        .text(message);
}

