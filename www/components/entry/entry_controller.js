angular.module('entry_controller', [])

.controller ('EntryCtrl', function(
  $ionicHistory,
  $ionicLoading,
  $ionicModal,
  $ionicPopup,
  $location,
  $rootScope,
  $scope,
  CurrentUser,
  NewUserSession,
  UserSession
) {
  $scope.showLogin = function() {
    $location.path('/login');
  }
  $scope.showSignup = function() {
    $location.path('/signup');
  }

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

  $scope.data = {};

  $scope.loginUser = function() {
    $ionicLoading.show();
    $scope.login.hide();
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
        CurrentUser.updateUser();
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
    ).then(function() { $location.path('/app/halfway'); });
  }

  $scope.signupUser = function() {
    $ionicLoading.show();
    $scope.signup.hide();
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
