angular.module('friends_controller', ['friends_service'])

.controller(
  'FriendsCtrl',
  function(
    $scope,
    $location,
    $ionicFilterBar,
    Friends,
    AllUsers,
    $ionicPopup,
    CurrentUser
  ) {
  $scope.friends = Friends(CurrentUser.accessToken()).query({ user_id: CurrentUser.id() });
  $scope.allUsers = AllUsers.query();
  $scope.current_user = CurrentUser.user();

  $scope.openSearch = function() {
    $ionicFilterBar.show({
        items: $scope.allUsers.users.filter(function(user) {
          return user.id != CurrentUser.id();
        }),
        update: function (filteredUsers) {
          var searchQuery = document.getElementsByClassName("filter-bar-search")[0].value;
          if (searchQuery == '') {
            var userSearch = document.getElementById('user-search');
            userSearch.style.display = 'none';
          } else {
            var userSearch = document.getElementById('user-search');
            userSearch.style.display = '';
          }
          var correctUserArray = [];
          for (i = 0; i < filteredUsers.length; i++) {
            var user = filteredUsers[i];
            if (user.username == searchQuery) {
              correctUserArray.push(user);
            }
          }
          $scope.allUsers.users = correctUserArray;
        },
        done: function() {
          var description = document.getElementById('description');
          description.style.display = 'none';
        },
        cancel: function() {
          var description = document.getElementById('description');
          description.style.display = '';
          var userSearch = document.getElementById('user-search');
          userSearch.style.display = 'none';
        },
        filterProperties: 'username'
    });
  }

  $scope.doRefresh = function() {
    $scope.friends = Friends(CurrentUser.accessToken()).query({ user_id: CurrentUser.id() });
    $scope.$broadcast('scroll.refreshComplete');
  }

  $scope.addFriend = function(friend) {
    Friends.add({ friend_id: friend.id, user_id: $scope.current_user.id })
    $ionicPopup.alert({
        title: 'Request sent to ' + friend.username,
    });
  }
});
