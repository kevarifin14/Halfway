angular.module('friends_service', ['ionic', 'ngResource'])

.factory('Friends', function($resource, CurrentUser) {
  return $resource(
    'https://halfway-db.herokuapp.com/v1/users/:user_id/friendships',
    { user_id: CurrentUser.id() },
    {
      query: {
        method: 'GET',
        headers: { 'Authorization': CurrentUser.accessToken() }
      },
      add: {
        method: 'POST',
        headers: { 'Authorization': window.localStorage['userAccessToken'] }
      }
    }
  );
});
