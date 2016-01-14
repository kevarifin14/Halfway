angular.module('friends_service', ['ionic', 'ngResource'])

.factory('Friends', function($resource) {
  return $resource(
    'https://halfway-db.herokuapp.com/v1/users/:user_id/friendships',
    { user_id: '@id' },
    {
      query: {
        method: 'GET',
        headers: { 'Authorization': window.localStorage['userAccessToken'] }
      },
      add: {
        method: 'POST',
        headers: { 'Authorization': window.localStorage['userAccessToken'] }
      }
    }
  );
});
