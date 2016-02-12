angular.module('verification_service', ['ionic', 'ngResource'])

.factory('Verification', function($resource) {
  return $resource('https://halfway-db.herokuapp.com/v1/phone_numbers/verify');
})
