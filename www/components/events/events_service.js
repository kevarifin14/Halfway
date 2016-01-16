angular.module('events_service', ['ionic', 'ngResource'])

.factory('Events', function($resource) {
  return $resource(
    'https://halfway-db.herokuapp.com/v1/users/:user_id/events',
    { user_id: window.localStorage['userId'] },
    {
      query: {
        method: 'GET',
        cache: false,
        headers: { 'Authorization': window.localStorage['userAccessToken'] }
      },
      create: {
        method: 'POST',
        headers: { 'Authorization': window.localStorage['userAccessToken'] }
      }
    }
  );
});
