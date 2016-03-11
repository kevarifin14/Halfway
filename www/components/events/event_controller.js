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
    event,
    invitations,
    $ionicPopup,
    $ionicLoading,
    $cordovaGeolocation
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
  $scope.event = event.event;
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

  $scope.initialize = function() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;

    $scope.meetingPoint = new google.maps.LatLng($scope.event.latitude, $scope.event.longitude);
    $scope.currentLocation = new google.maps.LatLng(CurrentUser.latitude(), CurrentUser.longitude());

    var mapOptions = {
      center: $scope.meetingPoint,
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map"),mapOptions);

    directionsDisplay.setMap(map);

    $scope.map = map;

    calculateAndDisplayRoute(directionsService, directionsDisplay)
  }

  function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    $ionicLoading.show();
    var posOptions = { timeout: 10000, enableHighAccuracy: true };
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        var lat  = position.coords.latitude
        var lng = position.coords.longitude
        directionsService.route({
          origin: new google.maps.LatLng(lat, lng),
          destination: $scope.event.address,
          travelMode: google.maps.TravelMode.DRIVING
        }, function(response, status) {
          $ionicLoading.hide();
          if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }, function(err) {
        // error
      });

  }
});
