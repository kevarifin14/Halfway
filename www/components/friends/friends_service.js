angular.module('friends_service', ['ionic', 'ngResource'])

.factory('Friends', function($resource) {
  return function(accessToken) {
    return $resource(
      'https://halfway-db.herokuapp.com/v1/users/:user_id/friendships',
      { user_id: window.localStorage['userId'] },
      {
        query: {
          method: 'GET',
          headers: { 'Authorization': accessToken }
        },
        add: {
          method: 'POST',
          headers: { 'Authorization': accessToken }
        }
      }
    );
  }
});
