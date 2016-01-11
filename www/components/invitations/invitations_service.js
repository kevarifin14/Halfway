angular.module('invitations_service', ['ionic', 'ngResource'])

.factory('Invitations', function($resource) {
  return $resource(
    'https://halfway-db.herokuapp.com/v1/events/:event_id/invitations',
    {},
    {
      query: {
        method: 'GET',
        headers: { 'Authorization': window.localStorage['userAccessToken'] }
      }
    }
  );
})
