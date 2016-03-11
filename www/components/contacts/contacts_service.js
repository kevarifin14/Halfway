angular.module('contacts_service', ['ionic', 'ngResource'])

.factory('Contacts', function($cordovaContacts) {
  return $cordovaContacts.find({multiple: true})
});
