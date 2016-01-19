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
    'account_controller',
    'entry_controller',
    'events_controller',
    'events_service',
    'event_controller',
    'event_service',
    'camera_service',
    'friends_service',
    'friends_controller',
    'friend_requests_service',
    'friend_requests_controller',
    'halfway_controller',
    'invitations_service',
    'invitation_service',
    'login_controller',
    'login_service',
    'main_controller',
    'profile_controller',
    'signup_controller',
    'signup_service',
    'user_service',
    'all_users_service',
    'ngResource',
    'ngCordova'
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

  .state('app', {
    url: '/app',
    abstract: true,
    resolve: {
      profilePicture: function(CurrentUser) {
        return CurrentUser.avatar();
      }
    },
    templateUrl: 'components/shared/menu.html',
    controller: 'MainCtrl'
  })

  .state('app.halfway', {
    url: '/halfway',
    views: {
      'menuContent': {
        templateUrl: 'components/shared/tabs.html',
        controller: 'HalfwayCtrl'
      }
    }
  })

  .state('app.friends', {
    url: '/friends',
    resolve: {
      friends: function(Friends, CurrentUser) {
        return Friends(CurrentUser.accessToken())
          .query({ user_id: CurrentUser.id() })
          .$promise.then(function(friends) {
            return friends;
          });
      }
    },
    views: {
      'menuContent': {
        templateUrl: 'components/friends/friends.html',
        controller: 'FriendsCtrl'
      }
    }
  })

  .state('app.addFriends', {
    url: '/add_friends',
    resolve: {
      friends: function(Friends, CurrentUser) {
        return Friends(CurrentUser.accessToken())
          .query({ user_id: CurrentUser.id() })
          .$promise.then(function(friends) {
            return friends;
          });
      }
    },
    views: {
      'menuContent': {
        templateUrl: 'components/friends/add_friends.html',
        controller: 'FriendsCtrl'
      }
    }
  })

  .state('app.friendRequests', {
    url: '/requests',
    views: {
      'menuContent': {
        templateUrl: 'components/friend_requests/friend_requests.html',
        controller: 'FriendRequestsCtrl'
      }
    }
  })

  .state('app.event', {
    url: '/event/:eventId',
    resolve: {
      event: function(Event, $stateParams) {
        return Event.get({ id: $stateParams.eventId })
          .$promise.then(function(event) {
            return event;
          });
      },
      invitations: function(Invitations, $stateParams) {
        return Invitations.query({ event_id: $stateParams.eventId })
          .$promise.then(function(invitations) {
            return invitations;
          })
      }
    },
    views: {
      'menuContent': {
        templateUrl: 'components/event/event.html',
        controller: 'EventCtrl'
      }
    }
  })

  .state('app.account', {
    url: '/account',
    views: {
      'menuContent': {
        templateUrl: 'components/account/account.html',
        controller: 'AccountCtrl'
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
