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
        items: $scope.allUsers.users,
        update: function (filteredUsers) {
          if (document.getElementsByClassName("filter-bar-search")[0].value == '') {
            var userSearch = document.getElementById('user-search');
            userSearch.style.display = 'none';
          } else {
            var userSearch = document.getElementById('user-search');
            userSearch.style.display = '';
          }
          $scope.allUsers.users = filteredUsers;
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
