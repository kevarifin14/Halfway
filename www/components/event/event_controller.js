angular.module('event_controller', ['current_user_service'])

.controller(
  'EventCtrl',
  function(
    $scope,
    $stateParams,
    Event,
    CurrentUser,
    $ionicHistory
  ) {
  $scope.event = Event.get({ id: $stateParams.eventId });

  $scope.goBack = function() {
    $ionicHistory.goBack();
  };
});
