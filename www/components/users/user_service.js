angular.module('user_service', ['ionic', 'ngResource'])

.factory('User', function($resource) {
  return $resource(
    'https://halfway-db.herokuapp.com/v1/users/:id',
    { id: window.localStorage['userId'] },
    {
      update: {
        method: 'PUT',
        headers: { 'Authorization': window.localStorage['userAccessToken'] }
      }
    }
  );
})
