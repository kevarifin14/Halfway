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
  $scope.events = Events(CurrentUser.accessToken()).query({ user_id: CurrentUser.id() });

  $scope.doRefresh = function() {
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
