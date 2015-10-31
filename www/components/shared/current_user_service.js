angular.module('current_user_service', ['ionic', 'ngResource'])

.factory('CurrentUser', function() {
  var user = {
    id: window.localStorage['userId'],
    username: window.localStorage['username'],
    email: window.localStorage['userEmail'],
    access_token: window.localStorage['userAccessToken'],
  }

  return {
    user: function() {
      return user;
    },
    id: function() {
      return user.id;
    }
  };
})
