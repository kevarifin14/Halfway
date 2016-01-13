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
  var rsvpTrueCount = 0;
  var inviteList = invitations.invitations;
  for (var i = 0; i < inviteList.length; i++) {
    if (inviteList[i].user_id == CurrentUser.id()) {
      var currentUserInvitationId = inviteList[i].id;
    }
    rsvpBool[inviteList[i].user_id] = inviteList[i].rsvp;
    if (inviteList[i].rsvp) {
      rsvpTrueCount += 1;
    }
  }

  window.localStorage['currentEventId'] = currentUserInvitationId;

  $scope.rsvpBool = rsvpBool;
  $scope.currentUserInvitationId = currentUserInvitationId;
  $scope.rsvp = rsvpBool[CurrentUser.id()];
  $scope.event = event;
  $scope.invitations = invitations;
  $scope.rsvpTrueCount = rsvpTrueCount;
  $scope.goBack = function() {
    $ionicHistory.goBack();
  };

  $scope.enoughGoing = function() {
    return ($scope.rsvpBool[CurrentUser.id()] && $scope.rsvpTrueCount == 1)
  }

  $scope.changeRsvp = function() {
    var currentUserId = CurrentUser.id();
    $scope.rsvp = !$scope.rsvp;
    rsvpBool[currentUserId] = $scope.rsvp;
    $scope.result = Invitation.update(
      { id: currentUserInvitationId,
        invitation: {
          rsvp: $scope.rsvp
        }
      }
    );
    $ionicPopup.alert({
      title: 'RSVP changed sucessfully'
    })
  }
});
