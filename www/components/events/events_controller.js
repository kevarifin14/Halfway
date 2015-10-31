angular.module('events_controller', [])

.controller('EventsCtrl', function($scope, Events, CurrentUser) {
  $scope.events = Events.query({ user_id: CurrentUser.id() })
})
