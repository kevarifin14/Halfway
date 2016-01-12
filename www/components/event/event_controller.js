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
    Invitation,
    event,
    invitations,
    $ionicPopup
  ) {
  $scope.message = { true: 'Going', false: 'Invited' };
  var rsvpBool = {};
  var inviteList = invitations.invitations;
  for (var i = 0; i < inviteList.length; i++) {
    if (inviteList[i].user_id == CurrentUser.id()) {
      var currentUserInvitationId = inviteList[i].id;
    }
    rsvpBool[inviteList[i].user_id] = inviteList[i].rsvp;
  }

  window.localStorage['currentEventId'] = currentUserInvitationId;

  $scope.rsvpBool = rsvpBool;
  $scope.currentUserInvitationId = currentUserInvitationId;
  $scope.rsvp = rsvpBool[CurrentUser.id()];

  $scope.event = event;
  $scope.invitations = invitations;

  $scope.goBack = function() {
    $ionicHistory.goBack();
  };

  $scope.changeRsvp = function() {
    var currentUserId = CurrentUser.id();
    $scope.rsvp = !$scope.rsvp;
    rsvpBool[currentUserId] = $scope.rsvp;
    Invitation.update({ invitation: { rsvp: $scope.rsvp } });
    $ionicPopup.alert({
      title: 'RSVP changed sucessfully'
    })
  }
});
