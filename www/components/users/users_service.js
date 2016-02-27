angular.module('users_service', ['ionic', 'ngResource'])

.factory('Users', function($resource) {
  return $resource(
    'https://halfway-db.herokuapp.com/v1/users',
    {},
    {
      query: {
        method: 'GET',
        headers: { 'Authorization': window.localStorage['userAccessToken'] }
      }
    }
  );
})
