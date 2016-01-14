angular.module('main_controller', ['camera_service'])

.controller ('MainCtrl', function(
  $scope,
  $location,
  $ionicHistory,
  $ionicPopup,
  $rootScope,
  $ionicLoading,
  $cordovaFile,
  $cordovaCamera,
  $window,
  CurrentUser,
  Friends,
  User,
  profilePicture,
  $timeout
) {
  $rootScope.profilePicture = profilePicture;

  $scope.logout = function() {
    $ionicLoading.show();
    CurrentUser.clear();
    Friends = null;
    $timeout(function () {
      $window.localStorage.clear();
      $ionicHistory.clearCache();
      $ionicHistory.clearHistory();
      $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
      $ionicLoading.hide();
    }, 300);
    $location.path('/#/entry');
    // location.reload();
  }
})
