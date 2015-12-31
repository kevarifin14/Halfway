angular.module('friend_requests_service', ['ionic', 'ngResource'])

.factory('FriendRequests', function($resource) {
  return $resource(
    'http://halfway-db.herokuapp.com/v1/users/:user_id/friend_requests',
    { user_id: window.localStorage['userId'] },
    {
      query: {
        method: 'GET',
        headers: { 'Authorization': window.localStorage['userAccessToken'] }
      },
    }
  );
});
