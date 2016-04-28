angular.module('invitation_service', ['ionic', 'ngResource'])

.factory('Invitation', function($resource) {
  return $resource(
    'https://halfway-db.herokuapp.com/v1/invitations/:id',
    { id: '@id' },
    {
      update: {
        method: 'PUT',
        headers: { 'Authorization': window.localStorage['userAccessToken'] }
      },
      get: {
        method: 'GET',
        headers: { 'Authorization': window.localStorage['userAccessToken'] }
      }
    }
  );
})
