angular.module('halfway_controller', ['user_service'])

.controller(
  'HalfwayCtrl',
  function(
    $scope,
    $location,
    User,
    CurrentUser,
    $cordovaGeolocation
  ) {
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
});
