// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ngResource', 'starter.controllers', 'starter.factories', 'ionic.utils'])

.run(function($ionicPlatform, $rootScope, $localstorage) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  $localstorage.set('user', 'Chyngyz Arystan uulu')

  if ($localstorage.get('user', '') == '') {
    $rootScope.user = null;
  } else {
    $rootScope.user = $localstorage.get('user');
  };
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: false,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html',
          controller: 'NotifyCtrl'
        }
      }
    })
    .state('app.stuffs', {
      url: '/stuffs',
      views: {
        'menuContent': {
          templateUrl: 'templates/stuffs.html',
          controller: 'StuffsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/stuffs/:stuffId',
    views: {
      'menuContent': {
        templateUrl: 'templates/stuff.html',
        controller: 'StuffCtrl'
      }
    }
    // ,
    // resolve : {
    //   'singleStuff': function ($http, $stateParams) {
    //     $http.get('js/data.json').then(function(resp) {
    //       console.log($stateParams.stuffId);
    //       return resp.data[+$stateParams.stuffId]
    //     })
    //   }
    // }
  })

  .state('app.donationTarget', {
    url: '/donationTarget',
    views: {
      'menuContent': {
        templateUrl: 'templates/donationTarget.html',
        controller: 'DonationTargetCtrl'
      }
    }
    
  })

  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile.html',
        controller: 'ProfileCtrl'
      }
    }
    
  })
  .state('app.thankyou2', {
    url: '/thankyou',
    views: {
      'menuContent': {
        templateUrl: 'templates/thankyou2.html'
      }
    }
    
  })
  .state('app.thankyou', {
    url: '/thankyou',
    views: {
      'menuContent': {
        templateUrl: 'templates/thankyou.html',
        controller: 'ThanksCtrl'
      }
    }
    
  })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/stuffs');
  // $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
});
