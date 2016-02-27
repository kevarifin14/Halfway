angular.module('entry_controller', [])

.controller('EntryCtrl', function(
  CurrentUser,
  SignupService,
  LoginService,
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

  $scope.loginUser = function() {
    $ionicLoading.show();
    $scope.login.hide();
    var login_service = new LoginService({
      user: {
        phone_number: $scope.data.loginPhoneNumber,
      }
    });
    login_service.$save(
      function(data) {
        user = data.user
        window.localStorage['userId'] = user.id;
        window.localStorage['longitude'] = user.longitude;
        window.localStorage['latitude'] = user.latitude;
        window.localStorage['userAccessToken'] = user.access_token;
        window.localStorage['phoneNumber'] = user.phone_number;
        window.localStorage['verified'] = user.verified;
        CurrentUser.updateUser();
        $ionicHistory.nextViewOptions({
           disableBack: true
        });
        $location.path('/verification');
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
    var signup_service = new SignupService({
      user: {
        phone_number: $scope.data.signupPhoneNumber,
        latitude: 0,
        longitude: 0
      }
    });
    signup_service.$save(
      function(data) {
        user = data.user
        window.localStorage['userId'] = user.id
        window.localStorage['userAccessToken'] = user.access_token
        window.localStorage['longitude'] = user.longitude;
        window.localStorage['latitude'] = user.latitude;
        window.localStorage['phoneNumber'] = user.phone_number;
        window.localStorage['verified'] = user.verified;
        CurrentUser.updateUser();
        $ionicHistory.nextViewOptions({
           disableBack: true
        });
        $location.path('/verification');
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
