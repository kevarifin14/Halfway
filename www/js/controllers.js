angular.module('starter.controllers', [])

.controller('ProfileCtrl', function(
  $scope,
  CurrentUser,
  $ionicLoading,
  $ionicHistory,
  $location
) {
  $scope.current_user = CurrentUser.user()

  $scope.logout = function() {
    $ionicLoading.show();
    window.localStorage.clear();
    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();
    $ionicLoading.hide();
    $location.path('/login');
  }
})

.controller('EventsCtrl', function($scope, Events, CurrentUser) {
  $scope.events = Events.query({ user_id: CurrentUser.id() })
})

.controller('FriendsCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('LoginCtrl', function(
  $scope,
  $location,
  UserSession,
  $ionicPopup,
  $rootScope,
  $ionicLoading
) {
  $scope.data = {};

  $scope.login = function() {
    $ionicLoading.show();
    var user_session = new UserSession({
      username: $scope.data.username,
      password: $scope.data.password,
    });
    user_session.$save(
      function(data) {
        window.localStorage['userId'] = data.user_id
        window.localStorage['userName'] = data.username
        window.localStorage['userEmail'] = data.email
        window.localStorage['userAccessToken'] = data.access_token
        $location.path('/tab/events');
        $ionicLoading.hide();
      },
      function(err) {
        var error = err['data']['error'] || err.data.join('. ')
        var confirmPopup = $ionicPopup.alert({
          title: 'An error occurred',
          template: error
        });
        $ionicLoading.hide();
      }
    );
  }
});
