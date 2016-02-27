angular.module('signup_service', ['ionic', 'ngResource'])

.factory('SignupService', function($resource) {
  return $resource('https://halfway-db.herokuapp.com/v1/signup');
});
