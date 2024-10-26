var app = angular.module('streakMasterApp', []);

// Register Controller
app.controller('RegisterController', function($scope, $window) {
    $scope.user = {};
    $scope.message = ''; // Initialize message variable
    $scope.messageColor = ''; // Initialize color for the message

    $scope.registerUser = function() {
        if ($scope.registerForm.$valid) {
            // Check if user with the same email already exists
            var storedUser = JSON.parse($window.localStorage.getItem('user'));
            if (storedUser && storedUser.email === $scope.user.email) {
                // Set error message if email is already registered
                $scope.message = 'This email is already registered. Please use a different email.';
                $scope.messageColor = 'red'; // Set color for error message
            } else {
                // Save user data (In a real application, save it to backend)
                $window.localStorage.setItem('user', JSON.stringify($scope.user));
                $scope.message = 'Registration successful! Redirecting to login...';
                $scope.messageColor = 'green'; // Set color for success message

                // Redirect to login after 2 seconds
                setTimeout(function() {
                    $window.location.href = 'login.html';
                }, 2000);
            }
        }
    };
});

// Login Controller
app.controller('LoginController', function($scope, $window) {
    $scope.user = {};
    $scope.message = '';

    $scope.loginUser = function() {
        if ($scope.loginForm.$valid) {
            var storedUser = JSON.parse($window.localStorage.getItem('user'));

            if (storedUser && storedUser.email === $scope.user.email && storedUser.password === $scope.user.password) {
                $scope.message = 'Login successful! Redirecting...';

                // Redirect to next page after 2 seconds
                setTimeout(function() {
                    $window.location.href = 'next-page.html';  // Change 'next-page.html' to your actual next page
                }, 2000);
            } else {
                $scope.message = 'Invalid email or password. Please try again.';
            }
        }
    };
});
i