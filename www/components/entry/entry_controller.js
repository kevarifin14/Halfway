angular.module('entry_controller', [])

.controller ('EntryCtrl', function(
  $scope,
  $location
) {
  $scope.showLogin = function() {
    $location.path('/login');
  }
  $scope.showSignup = function() {
    $location.path('/signup');
  }
})
