angular.module('current_user_service', ['ionic', 'ngResource'])

.factory('CurrentUser', function() {
  var user = {
    id: window.localStorage['userId'],
    username: window.localStorage['username'],
    email: window.localStorage['userEmail'],
    access_token: window.localStorage['userAccessToken'],
    avatar: window.localStorage['profilePicture'],
    latitude: window.localStorage['latitude'],
    longitude: window.localStorage['longitude'],
  }

  return {
    user: function() {
      return user;
    },
    id: function() {
      return user.id;
    },
    accessToken: function() {
      return user.access_token;
    },
    username: function() {
      return user.username;
    },
    avatar: function() {
      return user.avatar;
    },
    latitude: function() {
      return user.latitude;
    },
    longitude: function() {
      return user.longitude;
    },
    updateAvatar: function(newAvatar) {
      user.avatar = newAvatar;
    },
    updateUser: function() {
      user = {
        id: window.localStorage['userId'],
        username: window.localStorage['username'],
        email: window.localStorage['userEmail'],
        access_token: window.localStorage['userAccessToken'],
        avatar: window.localStorage['profilePicture'],
        latitude: window.localStorage['latitude'],
        longitude: window.localStorage['longitude'],
      }
    },
    clear: function() {
      user = null;
    }
  };
})
