angular.module('logout_service', ['ionic', 'ngResource'])

.factory('LogoutService', function($resource) {
  return $resource(
    'https://halfway-db.herokuapp.com/v1/users/:user_id/logout',
    { user_id: window.localStorage['userId'] },
    {
      update: {
        method: 'PUT',
        headers: { 'Authorization': window.localStorage['userAccessToken'] }
      }
    }
  );
})
