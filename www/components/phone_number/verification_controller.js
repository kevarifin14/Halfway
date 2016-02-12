angular.module('verification_controller', [])

.controller('VerificationCtrl', function(
  Verification,
  $ionicPopup,
  $location,
  $scope
) {
  $scope.data = {};

  $scope.verify = function() {
    var verification = new Verification({
      pin_number: $scope.data.pin,
      hidden_phone_number: window.localStorage['phoneNumber']
    })
    verification.$save(
      function(phoneNumber) {
        if (phoneNumber.verified) {
          $location.path('/app/halfway');
          $ionicPopup.alert({
            title: 'Your phone number has been verified',
          });
        } else {
          $ionicPopup.alert({
            title: 'You did not enter the right PIN',
          });
        }
      },
      function(err) {
        var error = err['data']['error'] || err.data.join('. ')
        $ionicPopup.alert({
          title: 'An error occurred',
          template: error
        });
      }
    )
  }
})
