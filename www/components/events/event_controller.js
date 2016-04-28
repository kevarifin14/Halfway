angular.module('event_controller', [])

.controller(
  'EventCtrl',
  function(
    CurrentUser,
    Event,
    Invitations,
    Invitation,
    $ionicLoading,
    $ionicPopup,
    $rootScope,
    $scope,
    $stateParams
  ) {
  $ionicLoading.show();
  $scope.message = { true: 'Going', false: 'Invited' };
  $scope.phonebook = $rootScope.phonebook;

  Event.get({ id: $stateParams.eventId }).$promise.then(function(data) {
    $scope.event = data.event;
  });

  var rsvpBool = {};
  var rsvpTrueCount = 0;

  Invitations.query({ event_id: $stateParams.eventId }).$promise.then(function(data) {
    $scope.invitations = data.invitations;
    for (var i = 0; i < $scope.invitations.length; i++) {
      if ($scope.invitations[i].user_id == CurrentUser.id()) {
        $scope.currentUserInvitationId = $scope.invitations[i].id;
      }
    }

    Invitation.get({ id: $scope.currentUserInvitationId }).$promise.then(function(data) {
      $scope.invitation = data.invitation;
      $scope.rsvp = $scope.invitation.rsvp;
      $ionicLoading.hide();
    });
  });

  $scope.updateRsvp = function(rsvp) {
    $ionicLoading.show();
    Invitation.update(
      { id: $scope.currentUserInvitationId,
        invitation: {
          rsvp: rsvp
        }
      }
    ).$promise.then(function(data) {
      $scope.invitation = data.invitations;
      $scope.rsvp = $scope.invitation.rsvp;
      $ionicLoading.hide();
    });
  }

  $scope.doRefresh = function() {
    Event.get({ id: $stateParams.eventId })
      .$promise.then(function(event) {
        $scope.event = event.event;
        $scope.$broadcast('scroll.refreshComplete');
      })
  }
});
