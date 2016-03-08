angular.module('halfway_controller', [])

.controller(
  'HalfwayCtrl',
  function(
    CurrentUser,
    Events,
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
    $scope.contacts = [];
    $scope.invitedFriends = [];

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
      if ($scope.invitedFriends.includes(friend.id)) {
        index = $scope.invitedFriends.indexOf(friend.id);
        $scope.invitedFriends.myArray.splice(index, 1);
      } else {
        $scope.invitedFriends.push(friend.id);
      }
    }

    $scope.getContactList = function() {
      $cordovaContacts.find({multiple: true}).then(function(result) {
          $scope.contacts = result;
      }, function(error) {
          console.log("ERROR: " + error);
      });
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

    document.addEventListener("deviceready", function() {
      $scope.getContactList();
      var updatedContacts = []
      $scope.phoneNumbers = []
      Users.query().$promise.then(function(users) {
        $scope.users = users.users;
        for (i = 0; i < $scope.users.length; i++) {
          user = $scope.users[i];
          var contactSeen = 0;
          for (j = 0; j < $scope.contacts.length; j++) {
            contact = $scope.contacts[j];
            contactPhoneNumber = formatPhoneNumber(contact.phoneNumbers[0].value)
            if (contactPhoneNumber == user.phone_number && CurrentUser.id() != user.id) {
              updatedContacts.push(contact);
            }
          }
        };
        $scope.updatedContacts = updatedContacts;
      });
    }, false);

    function formatPhoneNumber(phoneNumber) {
      return phoneNumber.replace (/[^\d]/g, "").replace (/^.*(\d{10})$/, "$1");
    }
  }
);
