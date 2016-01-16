angular.module('entry_controller', [])

.controller ('EntryCtrl', function(
  CurrentUser,
  NewUserSession,
  UserSession,
  $ionicHistory,
  $ionicLoading,
  $ionicModal,
  $ionicPopup,
  $location,
  $rootScope,
  $scope
) {
  $scope.data = {};

  $ionicModal.fromTemplateUrl('login.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.login = modal;
  });

  $ionicModal.fromTemplateUrl('signup.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.signup = modal;
  });

  $scope.showLogin = function() {
    $location.path('/login');
  }

  $scope.showSignup = function() {
    $location.path('/signup');
  }

  $scope.loginUser = function() {
    $ionicLoading.show();
    var user_session = new UserSession({
      username: $scope.data.loginUsername,
      password: $scope.data.loginPassword,
    });
    user_session.$save(
      function(data) {
        $scope.login.hide();
        window.localStorage['userId'] = data.user_id;
        window.localStorage['username'] = data.username;
        window.localStorage['userEmail'] = data.email;
        window.localStorage['longitude'] = data.longitude;
        window.localStorage['latitude'] = data.latitude;
        window.localStorage['userAccessToken'] = data.access_token;
        window.localStorage['profilePicture'] = data.avatar;
        CurrentUser.updateUser();
        $location.path('/app/halfway');
        $scope.data = {};
        $ionicLoading.hide();
      },
      function(err) {
        var error = err['data']['error'] || err.data.join('. ')
        $ionicPopup.alert({
          title: 'An error occurred',
          template: error
        });
        $ionicLoading.hide();
      }
    )
  }

  $scope.signupUser = function() {
    $ionicLoading.show();
    $scope.signup.hide();
    var new_user_session = new NewUserSession({
      email: $scope.data.email,
      username: $scope.data.signupUsername,
      password: $scope.data.signupPassword,
      password_confirmation: $scope.data.password_confirmation,
      latitude: 0,
      longitude: 0
    });
    new_user_session.$save(
      function(data) {
        window.localStorage['userId'] = data.user_id
        window.localStorage['username'] = data.username
        window.localStorage['userEmail'] = data.email
        window.localStorage['userAccessToken'] = data.access_token
        window.localStorage['longitude'] = data.longitude;
        window.localStorage['latitude'] = data.latitude;
        window.localStorage['profilePicture'] = data.avatar;
        CurrentUser.updateUser();
        $location.path('/app/halfway');
        $scope.data = {};
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
