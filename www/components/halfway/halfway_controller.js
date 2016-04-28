angular.module('halfway_controller', [])

.controller(
  'HalfwayCtrl',
  function(
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
    $ionicPlatform,
    $ionicPopup,
    $ionicSideMenuDelegate,
    $location,
    $rootScope,
    $scope,
    $timeout
  ) {
    $scope.data = {};
    $scope.friends = [];
    $scope.invitedFriends = [];
    $scope.phoneNumbers = {};

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
      var search_param = selectionList.options[selection.selectedIndex].text;

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
          $scope.data.data = null;
          $scope.data.description = null;
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
        $scope.invitedFriends.splice(index, 1);
      } else {
        $scope.invitedFriends.push(friend.id);
      }
    }

    document.addEventListener('deviceready', function() {
      $cordovaContacts.find(
        {
          multiple: true,
          desiredFields: ['name', 'phoneNumbers']
        }
      ).then(function(contacts) {
        var newContacts = [];
        for (var i = 0; i < contacts.length; i++) {
          contact = contacts[i];
          attributes = {
            'name': contact.name.formatted,
            'phoneNumbers': contact.phoneNumbers
          }
          newContacts.push(attributes);
        }
        contacts = newContacts;
        numOfContacts = contacts.length
        Friends.create({ user_id: CurrentUser.id() }, { contacts: contacts}).$promise.then(
          function(data) {
            $scope.friends = data.friends;

            currentUserPhoneNumber = CurrentUser.phoneNumber();
            $rootScope.phonebook = {}
            $rootScope.phonebook[currentUserPhoneNumber] = 'Me'

            for (var i = 0; i < $scope.friends.length; i++) {
              friend = $scope.friends[i];
              $rootScope.phonebook[friend.phone_number] = friend.name
            }
          },
          function(err) {
            console.log(err)
          }
        )
      });
    }, false)
  }
);
