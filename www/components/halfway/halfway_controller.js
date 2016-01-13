angular.module(
  'halfway_controller',
  [
    'user_service',
    'events_service',
    'friends_service'
  ]
).controller(
  'HalfwayCtrl',
  function(
    $scope,
    $location,
    User,
    CurrentUser,
    Events,
    Friends,
    Camera,
    $cordovaGeolocation,
    $ionicPopup,
    $ionicNavBarDelegate,
    $ionicSideMenuDelegate,
    $cordovaFileTransfer
  ) {
    $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };
    $ionicNavBarDelegate.showBackButton(false);
    $scope.data = {};
    $scope.friends = Friends.query();
    $scope.invitedFriends = new Set();
    var posOptions = { timeout: 10000, enableHighAccuracy: true };
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        localStorage['latitude']  = position.coords.latitude
        localStorage['longitude'] = position.coords.longitude
      }, function(err) {
        // error
      });
    User.update(
      {
        id: window.localStorage['userId'],
        user: {
          latitude: localStorage['latitude'],
          longitude: localStorage['longitude']
        }
      }
    );
    $scope.createHalfwayEvent = function() {
      var selection = document.getElementById('selectionList');
      var search_param = selection.options[selection.selectedIndex].text;

      if ($scope.data.description) {
        if (!($scope.data.date && $scope.data.time)) {
          var dateFailurePopup = $ionicPopup.alert({
            title: 'When is the event?',
          })
        } else {
            var date = new Date(
              $scope.data.date.getFullYear(),
              $scope.data.date.getMonth(),
              $scope.data.date.getDate(),
              $scope.data.time.getHours(),
              $scope.data.time.getMinutes()
            )
          Events.create(
            {
              users: Array.from($scope.invitedFriends).map(String),
              user_id: CurrentUser.id(),
              event: {
                search_param: search_param,
                date: date,
                description: $scope.data.description,
              }
            }
          );
          var confirmPopup = $ionicPopup.alert({
            title: 'Event created :)',
          });
        }
      } else {
        var descriptionFailurePopup = $ionicPopup.alert({
          title: 'You forgot a description!',
        })
      }
    }

    $scope.toggleFriend = function(friend) {
      if ($scope.invitedFriends.has(friend.id)) {
        $scope.invitedFriends.delete(friend.id)
      } else {
        $scope.invitedFriends.add(friend.id);
      }
    }

    $scope.upload = function() {
      document.addEventListener('deviceready', function() {
        Camera.getPicture().then(function(imageData) {
          $scope.avatar = imageData;
          $cordovaFileTransfer.upload(
            'https://halfway-db.herokuapp.com/v1/users/' + CurrentUser.id(),
            imageData,
            options
          )
        }, function (error) {
          // error
        });
      });
    }
  }
);
