angular.module('halfway_controller', [])

.controller(
  'HalfwayCtrl',
  function(
    Contacts,
    CurrentUser,
    Events,
    Friends,
    LogoutService,
    User,
    Users,
    $cordovaContacts,
    $cordovaGeolocation,
    $ionicHistory,
    $ionicLoading,
    $ionicModal,
    $ionicPlatform,
    $ionicPopup,
    $ionicSideMenuDelegate,
    $location,
    $scope,
    $timeout
  ) {
    $scope.data = {};
    $scope.friends = [];
    $scope.invitedFriends = [];
    $scope.phoneNumbers = {};


    $ionicModal.fromTemplateUrl('settings.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.settings = modal;
    });

    var posOptions = { timeout: 10000, enableHighAccuracy: true };
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        localStorage['latitude']  = position.coords.latitude;
        localStorage['longitude'] = position.coords.longitude;
        User.update(
          {
            id: window.localStorage['userId'],
            user: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }
          }
        );
        CurrentUser.updateUser();
      }, function(err) {
        // error
      });

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
          );
          Events(CurrentUser.accessToken()).create(
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
          $ionicPopup.alert({
            title: 'Event created :)',
          });
        }
      } else {
        $ionicPopup.alert({
          title: 'You forgot a description!',
        });
      }
    }

    $scope.toggleFriend = function(friend) {
      if ($scope.invitedFriends.includes(friend.id)) {
        index = $scope.invitedFriends.indexOf(friend.id);
        $scope.invitedFriends.myArray.splice(index, 1);
      } else {
        $scope.invitedFriends.push(friend.id);
      }
    }

    $scope.logout = function() {
      LogoutService.update({ user_id: CurrentUser.id() })
      $ionicLoading.show();
      CurrentUser.clear();
      $scope.settings.hide();
      $timeout(function () {
        window.localStorage.clear();
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
        $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
        $ionicLoading.hide();
      }, 300);
      $location.path('/#/entry');
    }

    document.addEventListener('deviceready', function() {
      Contacts.then(function(contacts) {
        var newContacts = [];
        for (var i = 0; i < contacts.length; i++) {
          console.log(i);
          contact = contacts[i];
          attributes = {
            'name': contact.name.formatted,
            'phoneNumbers': contact.phoneNumbers
          }
          newContacts.push(attributes);
        }
        contacts = newContacts;

        console.log(contacts);
        Friends.create({ user_id: CurrentUser.id() }, contacts).$promise.then({
          function(friends) {
            $scope.friends = friends;
          }
        })
      });
    }, false)
  }
);
