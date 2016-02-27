angular.module('verification_controller', [])

.controller('VerificationCtrl', function(
  CurrentUser,
  Verification,
  $ionicHistory,
  $ionicLoading,
  $ionicPopup,
  $location,
  $scope
) {
  $scope.data = {};

  $scope.verify = function() {
    $ionicLoading.show();
    Verification.update({
      user_id: CurrentUser.id(),
      verification: { pin: $scope.data.pin }
    }).$promise.then(
      function(data) {
        user = data.user
        if (user.verified) {
          $ionicHistory.nextViewOptions({
             disableBack: true
          });
          $ionicLoading.hide();
          $location.path('/app/halfway');
          $ionicPopup.alert({
            title: 'Your phone number has been verified',
          });
        } else {
          $ionicLoading.hide();
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
})
