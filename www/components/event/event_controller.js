angular.module('event_controller', ['current_user_service'])

.controller('EventCtrl', function($scope, $stateParams, Event, CurrentUser) {
  $scope.event = Event.get({ id: $stateParams.eventId });
});
