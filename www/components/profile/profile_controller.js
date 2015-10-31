angular.module('profile_controller', [])

.controller('ProfileCtrl', function(
  $scope,
  CurrentUser,
  $ionicLoading,
  $ionicHistory,
  $location
) {
  $scope.current_user = CurrentUser.user()

  $scope.logout = function() {
    $ionicLoading.show();
    window.localStorage.clear();
    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();
    $ionicLoading.hide();
    $location.path('/entry');
  }
})
