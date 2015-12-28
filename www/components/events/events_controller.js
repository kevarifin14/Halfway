angular.module('events_controller', ['current_user_service'])

.controller('EventsCtrl', function($scope, $location, Events, CurrentUser) {
  $scope.events = Events.query({ user_id: CurrentUser.id() });
  $scope.showDetails = function(event) {
    $location.path('event/' + event.id);
  }
});
