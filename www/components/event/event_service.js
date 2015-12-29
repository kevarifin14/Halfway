angular.module('event_service', ['ionic', 'ngResource'])

.factory('Event', function($resource) {
  return $resource(
    'http://halfway-db.herokuapp.com/v1/events/:id',
    { id: window.localStorage['eventId'] },
    {
      get: {
        method: 'GET',
        headers: { 'Authorization': window.localStorage['userAccessToken'] }
      },
      delete: {
        method: 'DELETE',
        headers: { 'Authorization': window.localStorage['userAccessToken'] }
      }
    }
  );
});
