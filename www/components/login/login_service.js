angular.module('login_service', ['ionic', 'ngResource'])

.factory('LoginService', function($resource) {
  return $resource('https://halfway-db.herokuapp.com/v1/login');
})
