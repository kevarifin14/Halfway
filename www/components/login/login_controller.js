angular.module('login_controller', [])

.controller('LoginCtrl', function(
  $scope,
  $location,
  UserSession,
  $ionicPopup,
  $rootScope,
  $ionicLoading,
  $ionicHistory
) {
  $scope.data = {};

  $scope.login = function() {
    $ionicLoading.show();
    var user_session = new UserSession({
      username: $scope.data.username,
      password: $scope.data.password,
    });
    user_session.$save(
      function(data) {
        window.localStorage['userId'] = data.user_id;
        window.localStorage['username'] = data.username;
        window.localStorage['userEmail'] = data.email;
        window.localStorage['longitude'] = data.longitude;
        window.localStorage['latitude'] = data.latitude;
        window.localStorage['userAccessToken'] = data.access_token;
        window.localStorage['profilePicture'] = data.avatar;

        $ionicLoading.hide();
      },
      function(err) {
        var error = err['data']['error'] || err.data.join('. ')
        var confirmPopup = $ionicPopup.alert({
          title: 'An error occurred',
          template: error
        });
        $ionicLoading.hide();
      }
    ).then(function() {
      $location.path('/app/halfway');
    });
  }
})
