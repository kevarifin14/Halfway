angular.module('entry_controller', [])

.controller('EntryCtrl', function(
  CurrentUser,
  LoginService,
  SignupService,
  Verification,
  $ionicHistory,
  $ionicLoading,
  $ionicModal,
  $ionicPopup,
  $location,
  $rootScope,
  $scope,
  $window
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
        phone_number: formatPhoneNumber($scope.data.loginPhoneNumber),
      }
    });
    login_service.$save(
      function(data) {
        user = data.user;
        $scope.data = {};
        $ionicLoading.hide();
        displayVerification(user.id);
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
  };

  $scope.signupUser = function() {
    $ionicLoading.show();
    $scope.signup.hide();
    var signup_service = new SignupService({
      user: {
        phone_number: formatPhoneNumber($scope.data.signupPhoneNumber),
        latitude: 0,
        longitude: 0
      }
    });
    signup_service.$save(
      function(data) {
        user = data.user;
        $scope.data = {};
        $ionicLoading.hide();
        displayVerification(user.id);
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

  function displayVerification(userId) {
    $scope.data = {};

    var myPopup = $ionicPopup.show({
      template: '<input type="tel" ng-model="data.pin">',
      title: 'Verification',
      subTitle: 'Please verify your phone number',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Verify</b>',
          type: 'button-calm',
          onTap: function() { verifyUser(userId, $scope.data.pin) }
        }
      ]
    });
  }

  function verifyUser(userId, pin) {
    $ionicLoading.show();
    Verification.update({
      user_id: userId,
      verification: { pin: pin }
    }).$promise.then(
      function(data) {
        user = data.user
        if (user.verified) {
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

          $location.path('/app/halfway');
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Your phone number has been verified',
          });
        } else {
          $ionicLoading.hide();
          displayVerification(userId);
          $ionicPopup.alert({
            title: 'You did not enter the right PIN',
          });
        }
      },
      function(err) {
        $ionicLoading.hide();
        var error = err['data']['error'] || err.data.join('. ')
        $ionicPopup.alert({
          title: 'An error occurred',
          template: error
        });
      }
    )
  }

  function formatPhoneNumber(phoneNumber) {
    return phoneNumber.replace (/[^\d]/g, "").replace (/^.*(\d{10})$/, "$1");
  }
})
