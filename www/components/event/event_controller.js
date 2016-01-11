angular.module('event_controller', ['current_user_service'])

.controller(
  'EventCtrl',
  function(
    $scope,
    $stateParams,
    Event,
    CurrentUser,
    $ionicHistory,
    Invitations,
    event,
    invitations
  ) {
  var rsvpHash = {};
  var inviteList = invitations.invitations;
  for (var i = 0; i < inviteList.length; i++) {
    var rsvpMessage = 'Invited';
    if (inviteList[i].rsvp) {
      rsvpMessage = 'Going';
    }
    rsvpHash[inviteList[i].user_id] = rsvpMessage;
  }

  $scope.rsvpHash = rsvpHash;

  $scope.event = event;
  $scope.invitations = invitations;

  $scope.goBack = function() {
    $ionicHistory.goBack();
  };
});
