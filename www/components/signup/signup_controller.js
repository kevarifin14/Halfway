angular.module('signup_controller', [])

.controller ('SignupCtrl', function(
  $scope,
  $location,
  NewUserSession,
  $ionicPopup,
  $rootScope,
  $ionicLoading
) {
  $scope.data = {};

  $scope.signup = function() {
    $ionicLoading.show();
    var new_user_session = new NewUserSession({
      email: $scope.data.email,
      username: $scope.data.username,
      password: $scope.data.password,
      password_confirmation: $scope.data.password_confirmation,
      latitude: 0,
      longitude: 0
    });
    new_user_session.$save(
      function(data) {
        window.localStorage['userId'] = data.user_id
        window.localStorage['userName'] = data.username
        window.localStorage['userEmail'] = data.email
        window.localStorage['userAccessToken'] = data.access_token
        $location.path('/app/halfway');
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
    )
  }
})
