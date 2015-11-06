angular.module('friends_service', ['ionic', 'ngResource'])

.factory('Friends', function($resource) {
  return $resource(
    'http://halfway-db.herokuapp.com/v1/users/:user_id/friendships',
    { user_id: window.localStorage['userId'] },
    {
      query: {
        method: 'GET',
        headers: { 'Authorization': window.localStorage['userAccessToken'] }
      }
    }
  );
});
