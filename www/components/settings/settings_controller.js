angular.module('settings_controller', [])

.controller('SettingsCtrl', function(
  $ionicModal,
  $scope
) {
  $scope.logout = function() {
    console.log('here')
  }
});
