angular.module('account_controller', [])
.controller(
  'AccountCtrl',
  function(
    Camera,
    CurrentUser,
    $ionicLoading,
    $ionicPopup,
    $location,
    $cordovaFileTransfer,
    $rootScope,
    $scope
  ) {
    var headers = { 'Authorization': window.localStorage['userAccessToken'] };
    var options = {
      fileKey: 'avatar',
      fileName: 'image.jpg',
      chunkedMode: false,
      mimeType: 'image/jpeg',
      httpMethod: 'PUT',
      headers: headers
    }

    $scope.avatar = window.localStorage['profilePicture'];
    $scope.current_user = CurrentUser.user();

    $scope.upload = function() {
      document.addEventListener('deviceready', function() {
        Camera.getPicture().then(function(imageData) {
          $scope.avatar = imageData;
          $rootScope.profilePicture = imageData;
          CurrentUser.updateAvatar(imageData);
          window.localStorage['profilePicture'] = imageData;
          $ionicLoading.show();
          $cordovaFileTransfer.upload(
            'https://halfway-db.herokuapp.com/v1/users/' + CurrentUser.id(),
            imageData,
            {
              fileKey: 'avatar',
              fileName: 'image.jpg',
              chunkedMode: false,
              mimeType: 'image/jpeg',
              httpMethod: 'PUT',
              headers: headers
            }
          ).then(function(result) {
            $ionicLoading.hide();
            $ionicPopup.alert({
              title: 'Profile picture updated',
            });
          }, function (error) {

          })
        }, function (error) {
          // error
        });
      });
    }
  }
);
