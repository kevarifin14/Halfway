angular.module('current_user_service', ['ionic', 'ngResource'])

.factory('CurrentUser', function() {
  var user = {
    id: window.localStorage['userId'],
    phoneNumber: window.localStorage['phoneNumber'],
    access_token: window.localStorage['userAccessToken'],
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
    phoneNumber: function() {
      return user.phoneNumber;
    },
    latitude: function() {
      return user.latitude;
    },
    longitude: function() {
      return user.longitude;
    },
    updateUser: function() {
      user = {
        id: window.localStorage['userId'],
        access_token: window.localStorage['userAccessToken'],
        phoneNumber: window.localStorage['phoneNumber'],
        latitude: window.localStorage['latitude'],
        longitude: window.localStorage['longitude'],
      }
    },
    clear: function() {
      user = null;
    }
  };
})
