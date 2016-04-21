angular.module('event_controller', [])

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
    $ionicPopup,
    $ionicLoading,
    $cordovaGeolocation
  ) {
  $scope.message = { true: 'Going', false: 'Invited' };

  Event.get({ id: $stateParams.eventId }).$promise.then(function(data) {
    $scope.event = data.event;
  });

  var rsvpBool = {};
  var rsvpTrueCount = 0;

  Invitations.query({ event_id: $stateParams.eventId }).$promise.then(function(data) {
    $scope.invitations = data.invitations;
    console.log($scope.invitations)
    for (var i = 0; i < $scope.invitations.length; i++) {
      if ($scope.invitations[i].user_id == CurrentUser.id()) {
        var currentUserInvitationId = $scope.invitations[i].id;
      }
      rsvpBool[$scope.invitations[i].user_id] = $scope.invitations[i].rsvp;
      if ($scope.invitations[i].rsvp) {
        rsvpTrueCount += 1;
      }
    }
    $scope.rsvpBool = rsvpBool;
    $scope.currentUserInvitationId = currentUserInvitationId;
    $scope.rsvp = rsvpBool[CurrentUser.id()];
    $scope.rsvpTrueCount = rsvpTrueCount;
    window.localStorage['currentEventId'] = currentUserInvitationId;
  });


  $scope.goBack = function() {
    $ionicHistory.goBack();
  };

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
    Event.get({ id: $stateParams.eventId })
      .$promise.then(function(event) {
        $scope.event = event.event;
      })
    $ionicPopup.alert({
      title: 'RSVP changed sucessfully'
    })
  }

  $scope.doRefresh = function() {
    Event.get({ id: $stateParams.eventId })
      .$promise.then(function(event) {
        $scope.event = event.event;
        $scope.$broadcast('scroll.refreshComplete');
      })
  }
});
