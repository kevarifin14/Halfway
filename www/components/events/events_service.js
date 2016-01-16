angular.module('events_service', ['ionic', 'ngResource'])

.factory('Events', function($resource) {
  return function(accessToken) {
    return $resource(
      'https://halfway-db.herokuapp.com/v1/users/:user_id/events',
      { user_id: window.localStorage['userId'] },
      {
        query: {
          method: 'GET',
          headers: { 'Authorization': accessToken }
        },
        create: {
          method: 'POST',
          headers: { 'Authorization': accessToken }
        }
      }
    );
  }
});
