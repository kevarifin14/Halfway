angular.module('events_controller', ['current_user_service'])

.controller('EventsCtrl', function($scope, Events, CurrentUser) {
  $scope.events = Events.query({ user_id: CurrentUser.id() });
});
