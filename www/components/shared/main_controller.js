angular.module('main_controller', [])

.controller ('MainCtrl', function(
  $scope,
  $location,
  $ionicHistory,
  $ionicPopup,
  $rootScope,
  $ionicLoading,
  $cordovaFile,
  $cordovaCamera,
  CurrentUser,
  User,
  profilePicture,
  Friends,
  $timeout
) {
  $rootScope.profilePicture = profilePicture;

  $scope.logout = function() {
    $ionicLoading.show();
    CurrentUser.clear();
    $timeout(function () {
      window.localStorage.clear();
      $ionicHistory.clearCache();
      $ionicHistory.clearHistory();
      $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
      $ionicLoading.hide();
    }, 300);
    $location.path('/#/entry');
  }
})
