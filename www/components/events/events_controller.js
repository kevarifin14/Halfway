angular.module('events_controller', ['current_user_service'])

.controller(
  'EventsCtrl',
  function(
    $scope,
    $location,
    Event,
    Events,
    CurrentUser
  ) {
  $scope.events = Events.query({ user_id: CurrentUser.id() });
  $scope.showDetails = function(event) {
    $location.path('/event/' + event.id);
  };
  $scope.delete = function(event) {
    Event.delete({ id: event.id });
    $scope.events.events.splice($scope.events.events.indexOf(event), 1);
  }
});
