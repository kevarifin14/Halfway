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
    'entry_controller',
    'events_controller',
    'events_service',
    'friends_controller',
    'login_controller',
    'login_service',
    'profile_controller',
    'signup_controller',
    'signup_service',
    'ngResource'
  ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  $httpProvider.defaults.withCredentials = true;

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'components/shared/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.profile', {
    url: '/profile',
    views: {
      'tab-profile': {
        templateUrl: 'components/profile/profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })

  .state('tab.events', {
      url: '/events',
      views: {
        'tab-events': {
          templateUrl: 'components/events/events.html',
          controller: 'EventsCtrl'
        }
      }
    })

  .state('tab.friends', {
    url: '/friends',
    views: {
      'tab-friends': {
        templateUrl: 'components/friends/friends.html',
        controller: 'FriendsCtrl'
      }
    }
  })

  .state('login', {
    url: '/login',
    templateUrl: 'components/login/login.html',
    controller: 'LoginCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'components/signup/signup.html',
    controller: 'SignupCtrl'
  })

  .state('entry', {
    url: '/entry',
    templateUrl: 'components/entry/entry.html',
    controller: 'EntryCtrl'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/entry');
});
