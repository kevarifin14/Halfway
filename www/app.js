// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module(
  'Halfway',
  [
    'ionic',
    'ionic.service.core',
    'jett.ionic.filter.bar',
    'tabSlideBox',
    'tabSlideBoxScrollExtension',
    'ionic.ion.autoListDivider',
    'contacts_service',
    'entry_controller',
    'events_controller',
    'events_service',
    'event_controller',
    'event_service',
    'friends_service',
    'halfway_controller',
    'invitations_service',
    'invitation_service',
    'login_controller',
    'login_service',
    'logout_service',
    'settings_controller',
    'signup_service',
    'tabs_controller',
    'user_service',
    'verification_service',
    'users_service',
    'ngCordova',
    'ngResource'
  ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }

    var push = new Ionic.Push({
      'debug': true
    });

    push.register(function(token) {
      console.log('Device token:',token.token);
    });
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  $httpProvider.defaults.withCredentials = true;

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('entry', {
    url: '/entry',
    templateUrl: 'components/entry/entry.html',
    controller: 'EntryCtrl'
  })

  .state('tabs', {
    url: '/tabs',
    abstract: true,
    templateUrl: 'components/tabs/tabs.html',
    controller: 'TabsCtrl'
  })

  .state('tabs.halfway', {
    url: '/halfway',
    views: {
      'halfway-tab': {
        templateUrl: 'components/halfway/halfway.html',
        controller: 'HalfwayCtrl'
      }
    }
  })

  .state('tabs.events', {
    url: '/events',
    views: {
      'events-tab': {
        templateUrl: 'components/events/events.html',
        controller: 'EventsCtrl'
      }
    }
  })

  .state('tabs.event', {
    url: '/event/:eventId',
    views: {
      'events-tab': {
        templateUrl: 'components/events/event.html',
        controller: 'EventCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/entry');
});
