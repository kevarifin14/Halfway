angular.module(
  'profile_controller',
  [
    'current_user_service',
    'friends_service'
  ]
)

.controller('ProfileCtrl', function(
  $scope,
  CurrentUser,
  Friends,
  $ionicLoading,
  $ionicHistory,
  $location
) {
  $scope.current_user = CurrentUser.user()
  $scope.friends = Friends.query({ user_id: CurrentUser.id() })

  $scope.logout = function() {
    $ionicLoading.show();
    window.localStorage.clear();
    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();
    $ionicLoading.hide();
    $location.path('/entry');
  }
})
