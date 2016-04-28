angular.module('settings_controller', [])

.controller('SettingsCtrl', function(
  CurrentUser,
  LogoutService,
  $ionicLoading,
  $ionicModal,
  $scope,
  $timeout
) {
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
});
