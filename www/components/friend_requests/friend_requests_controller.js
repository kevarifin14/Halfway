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
  if (!$scope.friendRequests.$resolved || $scope.friendRequests.requests.length == 0) {
    var noRequests = document.getElementById('no-requests');
    noRequests.style.display = '';
  }

  $scope.doRefresh = function() {
    $scope.friendRequests = FriendRequests.query();
    $scope.$broadcast('scroll.refreshComplete');
  }

  $scope.respondToRequest = function(user) {
    Friends.add({ friend_id: user.id, user_id: $scope.currentUser.id });
    $ionicPopup.alert({
      title: user.username + ' added',
    });

  }
});
