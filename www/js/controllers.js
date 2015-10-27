angular.module('starter.controllers', [])

.controller('ProfileCtrl', function($scope, CurrentUser) {
  $scope.current_user = CurrentUser.user()
})

.controller('EventsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('FriendsCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('LoginCtrl', function($scope, $location, UserSession, $ionicPopup, $rootScope) {
  $scope.data = {};

  $scope.login = function() {
    var user_session = new UserSession({
      username: $scope.data.username,
      password: $scope.data.password,
    });
    user_session.$save(
      function(data) {
        window.localStorage['userId'] = data.id
        window.localStorage['userName'] = data.username
        window.localStorage['userEmail'] = data.email
        window.localStorage['userAccessToken'] = data.access_token
        $location.path('/tab/profile');
        console.log($location.path());
      },
      function(err) {
        var error = err['data']['error'] || err.data.join('. ')
        var confirmPopup = $ionicPopup.alert({
          title: 'An error occurred',
          template: error
        });
      }
    );
  }
});
