angular.module('friends_service', ['ionic', 'ngResource'])

.factory('Friends', function($resource) {
  return $resource(
    'https://halfway-db.herokuapp.com/v1/users/:user_id/friends',
    { user_id: '@id' },
    {
      create: {
        method: 'POST',
        headers: { 'Authorization': window.localStorage['userAccessToken'] }
      }
    }
  );
})
