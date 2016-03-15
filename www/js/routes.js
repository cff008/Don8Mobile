angular.module('app.routes', ['ionicUIRouter'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('tabsController.myProfile', {
    url: '/MyProfile',
    views: {
      'tab1': {
        templateUrl: 'templates/myProfile.html',
        controller: 'myProfileCtrl'
      }
    }
  })

  .state('tabsController.eventFeed', {
    url: '/EventFeed',
    views: {
      'tab2': {
        templateUrl: 'templates/eventFeed.html',
        controller: 'eventFeedCtrl'
      }
    }
  })

  .state('tabsController.myEvents', {
    url: '/MyEvents',
    views: {
      'tab3': {
        templateUrl: 'templates/myEvents.html',
        controller: 'myEventsCtrl'
      }
    }
  })
  .state('tabsController.settings', {
    url: '/Settings',
    views: {
      'tab4': {
        templateUrl: 'templates/settings.html',
        controller: 'settingsCtrl'
      }
    }
  })

  .state('login', {
    url: '/page9',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/SignUp',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('tabsController.editProfile', {
    url: '/page6',
    views: {
      'tab1': {
        templateUrl: 'templates/editProfile.html',
        controller: 'editProfileCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/page9')

  

});