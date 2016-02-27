angular.module('main_controller', [])

.controller ('MainCtrl', function(
  CurrentUser,
  LogoutService,
  User,
  $cordovaContacts,
  $scope,
  $location,
  $ionicHistory,
  $ionicModal,
  $ionicPlatform,
  $ionicPopup,
  $rootScope,
  $ionicLoading,
  $timeout
) {
  $ionicModal.fromTemplateUrl('settings.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.settings = modal;
  });

  $scope.logout = function() {
    LogoutService.update({ user_id: CurrentUser.id() })
    $ionicLoading.show();
    CurrentUser.clear();
    $scope.settings.hide();
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
