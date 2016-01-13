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

  $scope.doRefresh = function() {
    debugger;
    $scope.events = Events.query({ user_id: CurrentUser.id() });
    $scope.$broadcast('scroll.refreshComplete');
  }

  $scope.showDetails = function(event) {
    $location.path('app/event/' + event.id);
  };

  $scope.dividerFunction = function(key) {
    return key;
  }
});
