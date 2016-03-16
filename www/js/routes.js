angular.module('app.routes', ['ionicUIRouter'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider.state('tabsController', {
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


  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.eventFeed'
      2) Using $state.go programatically:
        $state.go('tabsController.eventFeed');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab2/EventFeed
      /page1/tab3/EventFeed
  */
  $stateProvider.state('tabsController.eventFeed', {
    url: '/EventFeed',
    views: {
      'tab2': {
        templateUrl: 'templates/eventFeed.html',
        controller: 'eventFeedCtrl'
      }
    }
      })
  
  .state('tabsController.detail', {
    url: '/Detail/:id',
	views: {
	'tab2':{
    templateUrl: 'templates/detail.html',
    controller: 'detailCtrl'
	}
	}
    
  })
  
  .state('tabsController.results', {
	url: '/Results',
	views:{
	'tab2':{
	templateUrl: 'templates/results.html',
	controller: 'resultCtrl'
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