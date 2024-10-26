var app = angular.module('streakMasterApp', []);

app.controller('DashboardController', ['$scope', '$window', function($scope, $window) {
    // Retrieve username from local storage
    $scope.username = $window.localStorage.getItem('username') || 'User'; // Default to 'User' if no username found

    // Function to redirect to addtasks.html
    $scope.addTask = function() {
        $window.location.href = 'C:/Users/HP/Downloads/project of mean/addtasks.html';
    };

    // Function to redirect to feedback.html
    $scope.feedback = function() {
        $window.location.href = 'C:/Users/HP/Downloads/project of mean/feedback.html';
    };
}]);
