angular.module('tabs_controller', [])

.controller('TabsCtrl', function(
  $ionicModal,
  $scope
) {
  $ionicModal.fromTemplateUrl('settings.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.settings = modal;
  });
})
