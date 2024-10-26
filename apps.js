var app = angular.module('streakMasterApp', []);

// Register Controller
app.controller('RegisterController', function($scope, $http) {
    $scope.user = {};
    $scope.message = '';
    $scope.messageColor = '';

    $scope.registerUser = function() {
        if ($scope.registerForm.$valid && $scope.user.password === $scope.user.confirmPassword) {
            $http.post('http://localhost:5000/register', $scope.user)
                .then(function(response) {
                    $scope.message = response.data.message;
                    $scope.messageColor = 'green';
                    window.location.href = 'login.html';
                })
                .catch(function(error) {
                    $scope.message = error.data.message || 'An error occurred. Please try again.';
                    $scope.messageColor = 'red';
                });
        } else {
            $scope.message = 'Please fill out the form correctly.';
            $scope.messageColor = 'red';
        }
    };

    $scope.togglePasswordVisibility = function(fieldId) {
        var inputField = document.getElementById(fieldId);
        inputField.type = inputField.type === 'password' ? 'text' : 'password';
    };
});

// Login Controller
app.controller('LoginController', function($scope, $http) {
    $scope.user = {};

    $scope.loginUser = function() {
        if ($scope.loginForm.$valid) {
            $http.post('http://localhost:5000/login', $scope.user)
                .then(function(response) {
                    localStorage.setItem('username', response.data.username);
                    $scope.message = response.data.message;
                    window.location.href = 'dashboard.html';
                })
                .catch(function(error) {
                    $scope.message = error.data.message || 'Incorrect email or password.';
                });
        } else {
            $scope.message = 'Please enter a valid email and password.';
        }
    };

    $scope.togglePasswordVisibility = function(fieldId) {
        var inputField = document.getElementById(fieldId);
        inputField.type = inputField.type === 'password' ? 'text' : 'password';
    };
});
