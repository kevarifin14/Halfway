angular.module('all_users_service', ['ionic', 'ngResource'])

.factory('AllUsers', function($resource) {
  return $resource(
    'http://halfway-db.herokuapp.com/v1/users',
    { },
    {
      query: {
        method: 'GET',
        headers: { 'Authorization': window.localStorage['userAccessToken'] }
      }
    }
  );
})