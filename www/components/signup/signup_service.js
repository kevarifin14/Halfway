angular.module('signup_service', ['ionic', 'ngResource'])

.factory('NewUserSession', function($resource) {
  return $resource('http://halfway-db.herokuapp.com/v1/signup');
});
