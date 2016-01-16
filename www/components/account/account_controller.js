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
    $ionicLoading,
    $rootScope
  ) {
    $scope.avatar = window.localStorage['profilePicture'];
    $scope.current_user = CurrentUser.user();

    var headers = { 'Authorization': window.localStorage['userAccessToken'] };
    var options = {
      fileKey: 'avatar',
      fileName: 'image.jpg',
      chunkedMode: false,
      mimeType: 'image/jpeg',
      httpMethod: 'PUT',
      headers: headers
    }

    $scope.initialize = function() {
      var latitude = localStorage['latitude'];
      var longitude = localStorage['longitude'];
      var myLatlng = new google.maps.LatLng(latitude, longitude);

      var mapOptions = {
        center: myLatlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      var map = new google.maps.Map(document.getElementById("map"),mapOptions);

      var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
      });

      $scope.map = map;
    }

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
