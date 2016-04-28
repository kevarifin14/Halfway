angular.module('events_controller', ['current_user_service'])

.controller(
  'EventsCtrl',
  function(
    CurrentUser,
    Event,
    Events,
    $location,
    $scope
  ) {
  $scope.events = Events(CurrentUser.accessToken()).query({ user_id: CurrentUser.id() });

  $scope.doRefresh = function() {
    Events(CurrentUser.accessToken()).query({ user_id: CurrentUser.id() }).$promise.then(function(data) {
      $scope.events = data;
    });
    $scope.$broadcast('scroll.refreshComplete');
  }

  $scope.showDetails = function(event) {
    $location.path('tabs/event/' + event.id);
  };

  $scope.dividerFunction = function(key) {
    return key;
  }
});
