angular.module('friend_requests_controller', ['friend_requests_service'])

.controller(
  'FriendRequestsCtrl',
  function(
    $scope,
    $location,
    $ionicFilterBar,
    FriendRequests,
    Friends,
    $ionicPopup,
    CurrentUser
  ) {
  $scope.friendRequests = FriendRequests.query();
  $scope.currentUser = CurrentUser.user();

  $scope.respondToRequest = function(user) {
    debugger;
    Friends.add({ friend_id: user.id, user_id: $scope.currentUser.id });
    $ionicPopup.alert({
      title: user.username + ' added',
    });

  }
});
