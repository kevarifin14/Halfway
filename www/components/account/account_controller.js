angular.module(
  'account_controller',
  [
    'user_service',
    'events_service',
    'friends_service'
  ]
).controller(
  'AccountCtrl',
  function(
    $scope,
    $location,
    $ionicPopup,
    User,
    CurrentUser,
    Events,
    Friends,
    Camera,
    $cordovaGeolocation,
    $ionicNavBarDelegate,
    $ionicSideMenuDelegate,
    $cordovaFileTransfer,
    $ionicLoading
  ) {
    $scope.avatar = window.localStorage['profilePicture'];

    var headers = { 'Authorization': window.localStorage['userAccessToken'] };
    var options = {
      fileKey: 'avatar',
      fileName: 'image.jpg',
      chunkedMode: false,
      mimeType: 'image/jpeg',
      httpMethod: 'PUT',
      headers: headers
    }

    $scope.upload = function() {
      document.addEventListener('deviceready', function() {
        Camera.getPicture().then(function(imageData) {
          $scope.avatar = imageData;
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
