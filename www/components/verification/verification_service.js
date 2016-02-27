angular.module('verification_service', ['ionic', 'ngResource'])

.factory('Verification', function($resource) {
  return $resource(
    'https://halfway-db.herokuapp.com/v1/users/:user_id/verification',
    { user_id: window.localStorage['userId'] },
    {
      update: {
        method: 'PUT',
        headers: { 'Authorization': window.localStorage['userAccessToken'] }
      }
    }
  );
})
