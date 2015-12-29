angular.module('halfway_controller', ['user_service', 'events_service'])

.controller(
  'HalfwayCtrl',
  function(
    $scope,
    $location,
    User,
    CurrentUser,
    Events,
    $cordovaGeolocation,
    $ionicPopup
  ) {
    $scope.data = {};

    var posOptions = { timeout: 10000, enableHighAccuracy: true };
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        localStorage['latitude']  = position.coords.latitude
        localStorage['longitude'] = position.coords.longitude
      }, function(err) {
        // error
      });
    User.update(
      {
        user: {
          latitude: localStorage['latitude'],
          longitude: localStorage['longitude']
        }
      }
    );
    $scope.createHalfwayEvent = function() {
      Events.create(
        {
          users: ["5"],
          user_id: CurrentUser.id(),
          event: {
            search_param: 'food',
            date: '2015-06-06',
            description: $scope.data.description,
          }
        }
      );
      var confirmPopup = $ionicPopup.alert({
        title: 'Event created',
      });
    }
  }
);
