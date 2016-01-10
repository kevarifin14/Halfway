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
  CurrentUser,
  User,
  profilePicture
) {
  $rootScope.profilePicture = profilePicture;

  $scope.logout = function() {
    $ionicLoading.show();
    window.localStorage.clear();
    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();
    $ionicLoading.hide();
    $location.path('/#/entry');
    location.reload();
  }
})