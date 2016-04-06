angular.module('app.controllers', [])
     
.controller('myProfileCtrl', function($scope) {

})
   
.controller('eventFeedCtrl', [
    '$scope',
    '$state',
	'dataService',
    function ($scope, $state, dataService) {
      $scope.search = {};
	  $scope.events = [];
	  $scope.event = {}
	  $scope.newEvents = [];
	  $scope.index = 0;
	  addFive = function(events,index){
		var tempevents = [], i = index;
		for (i; i < events.length; i = i + 1) {
            if(i == index+5){
				break;
			}
         tempevents.push(events[i]);
		}
		return tempevents;
		};
	  
      $scope.goToList = function () {
		$scope.temp = {search:$scope.search.string};
	
		
		
        $state.go('tabsController.results', $scope.temp );
		
      };

      $scope.loadNext = function () {
		if($scope.events.length == 0){
		dataService.getEvents().then(function(events){
			$scope.newEvents = events;
			// .then(function (events) {
			  
			  
			  if($scope.newEvents != $scope.events){
			  $scope.events = $scope.events.concat(addFive($scope.newEvents,$scope.index));
			  $scope.index += $scope.newEvents.length;
			  }
			  $scope.$broadcast('scroll.infiniteScrollComplete');
			
		// .finally(function () 
			});
		}
		else{
			if($scope.newEvents != $scope.events){
			  $scope.events = $scope.events.concat(addFive($scope.newEvents,$scope.index));
			  $scope.index += $scope.newEvents.length;
			  }
			 $scope.$broadcast('scroll.infiniteScrollComplete');
		}
      };
	  
	$scope.moreDataCanBeLoaded = function(){
		//hardcoded to be amount of dummy data will change once db hookups are in
		if($scope.index > 6){
			return false;
		}else{
			return true;
		}
	};
    }
  ])
   
.controller('myEventsCtrl', [
    '$scope',
    '$state',
    'dataService',
    function ($scope, $state, dataService) {
		$scope.events = [];
		$scope.newEvents = [];
		$scope.index = 0;
     
      $scope.loadNext = function () {
		if($scope.events.length == 0){
		dataService.getEvents().then(function(events){
			$scope.newEvents = events;
			// .then(function (events) {
			  
			  
			  if($scope.newEvents != $scope.events){
			  $scope.events = $scope.events.concat(addFive($scope.newEvents,$scope.index));
			  $scope.index += $scope.newEvents.length;
			  }
			  $scope.$broadcast('scroll.infiniteScrollComplete');
			
		// .finally(function () 
			});
		}
		else{
			if($scope.newEvents != $scope.events){
			  $scope.events = $scope.events.concat(addFive($scope.newEvents,$scope.index));
			  $scope.index += $scope.newEvents.length;
			  }
			 $scope.$broadcast('scroll.infiniteScrollComplete');
		}
      };
	  
	$scope.moreDataCanBeLoaded = function(){
		//hardcoded to be amount of dummy data will change once db hookups are in
		if($scope.newEvents.length == index){
			return false;
		}else{
			return true;
		}
	};
	}
	  ])
   
.controller('settingsCtrl', function($scope) {
  $scope.data = {};

  //TODO: Add functions(s) to update settings based on user input

})
   
.controller('loginCtrl', function($scope, LoginService, $ionicPopup, $state) {

	//Login verifier
	$scope.data = {};
    $scope.login = function() {
    	console.log("LOGIN user: " + $scope.data.email + " - PW: " + $scope.data.password);	//TODO: This will need to be taken out for security reasons
        LoginService.loginUser($scope.data.email, $scope.data.password).success(function(data) {
            $state.go('tabsController.myProfile');
            console.log("Successful login");
        }).error(function(data) {
          //TODO: do different things for invalid password and server errors
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: data
            });
            console.log("Unsuccessful login");
        });
    }
})

.controller('forgotPasswordCtrl', function($scope) {
  $scope.data = {};

  $scope.submitEmail = function(){
    //TODO: call service to validate the email address

    //TODO: alert user to check email / of invalid email address
  }
})
   
.controller('signupCtrl', function($scope, SignupService, $ionicPopup, $state) {
  $scope.data = {};

    $scope.signup = function(){
      console.log("Account Created: NAME: " + $scope.data.firstname + " " + $scope.data.lastname + " - EMAIL: " + $scope.data.email + " - PW: " + $scope.data.password); //TODO: remove this line for security reasons
      SignupService.signupUser($scope.data.firstname, $scope.data.lastname, $scope.data.email, $scope.data.password).success(function(data) {
        $state.go('tabsController.editProfile');
        var alertPopup = $ionicPopup.alert({
          title: 'Welcome to Don8!',
          template: 'Please fill out your user profile.'
        });
      })
      .error(function(data) {
        var alertPopup = $ionicPopup.alert({
          title: 'Unable to create account',
          template: data
        });
      });
    }

})
   
.controller('editProfileCtrl', function($scope) {

})

.controller('detailCtrl', [
    '$scope',
    '$stateParams',
    '$window',
    '$ionicPopup',
    'dataService',
    function ($scope, $stateParams, $window, $ionicPopup, dataService) {
	  var i = 0,
	  id = $stateParams.id;
	  console.log($stateParams);	
      $scope.loading = true;
	  dataService.getEvents().then(function(events){
		for (i; i < events.length; i = i + 1) {
          if (events[i].id.toString() === id.toString()) {
            event = angular.copy(events[i]);
            event.image = 'http://lorempixel.com/620/480/sports/?' + ((new Date()).getTime() + i);
            break;
          }
        }
      }).finally(function () {
        $scope.loading = false;
		$scope.apply
      });

      $scope.reload = function () {
        eventService.getOne($stateParams.id).then(function (event) {
          $scope.event = event;
        }).finally(function () {
          $scope.$broadcast('scroll.refreshComplete');
        });
      };

      $scope.call = function () {
        $window.open('tel:' + $scope.event.contact.tel, '_system');
      };

      $scope.mail = function () {
        $window.open('mailto:' + $scope.event.contact.email, '_system');
      };

      $scope.website = function () {
        $window.open($scope.event.website, '_system');
      };

      $scope.map = function () {
        if (ionic.Platform.isIOS()) {
          $window.open('maps://?q=' + $scope.event.lat + ',' + $scope.event.lng, '_system');
        } else {
          $window.open('geo://0,0?q=' + $scope.event.lat + ',' + $scope.event.lng + '(' + $scope.event.name + '/' + $scope.event.city + ')&z=15', '_system');
        }
      };

      $scope.report = function () {
        $ionicPopup.prompt({
          scope: $scope,
          title: '<span class="energized">Report an issue</span>',
          subTitle: '<span class="stable">What\'s wrong or missing?</span>',
          inputType: 'text',
          inputPlaceholder: ''
        }).then(function (res) {
          if (res) {
            // here connect to backend and send report
          }
        });
      };
    }
  ])

.controller('resultCtrl', [
    '$scope',
    '$stateParams',
    '$state',
    '$timeout',
    '$ionicHistory',
    'dataService',
    function ($scope, $stateParams, $state, $timeout, $ionicHistory, dataService) {
      var first = true;
      $scope.limit = 10;
      $scope.show = {
        list: true
      };
	  searchFor = function(searchString) {
		var founds =[],
		currentEvent,
		i = 0;
		 for (i; i < events.length; i = i + 1) {
          currentEvent = events[i];
          if (currentEvent.name && currentEvent.name.indexOf(searchString) !== -1 || currentEvent.city && currentEvent.city.indexOf(searchString) !== -1 || currentEvent.district && currentEvent.district.indexOf(searchString) !== -1   || currentEvent.organization && currentEvent.organization.indexOf(searchString) !== -1){
//$filter('lowercase')(currentEvent.name)==$filter('lowercase')(searchString)||$filter('lowercase')(currentEvent.organization)==$filter('lowercase')(searchString) ||$filter('lowercase')(currentEvent.city)==$filter('lowercase')(searchString)){
           // if (check(currentEvent, satTrans, wheelChair, wheelChairLift)) {
  
              founds.push(currentEvent);
           // }
          }
        }
		return founds
	  };
      // show next 10
      $scope.loadMore = function () {
        if (!first) {
          $timeout(function () {
            $scope.limit += 10;
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, 2000);
          return;
        }
        first = false;

        var wheelChair = $stateParams.wheelChair === 'true',
            wheelChairLift = $stateParams.wheelChairLift === 'true',
            search = $stateParams.search;

        if ( search !== $scope.search) {
          $scope.search = search;
          $scope.loading = true;
		  $scope.limit = 10;
          $scope.events =  searchFor(search);
          $scope.loading = false;
          $scope.$broadcast('scroll.infiniteScrollComplete');
      }
	  };

      $scope.reload = function () {
        $scope.loading = true;
		events =  searchfor($scope.search);
        $scope.limit = 10;
        $scope.events = events;
        
        $scope.loading = false;
        $scope.$broadcast('scroll.refreshComplete');
        };
      

      $scope.goToMap = function () {
        $ionicHistory.currentView($ionicHistory.backView());
        $ionicHistory.nextViewOptions({
          disableAnimate: true
        });
        $state.go('tabsController.results.map', {
          search: $scope.string,
          wheelChair: $scope.wheelChair,
          wheelChairLift: $scope.wheelChairLift
        });
      };
      $scope.goToList = function () {
        $ionicHistory.currentView($ionicHistory.backView());
        $ionicHistory.nextViewOptions({
          disableAnimate: true
        });
        $state.go('tabsController.results.list', {
          search: $scope.search,
          wheelChair: $scope.wheelChair,
          wheelChairLift: $scope.wheelChairLift
        });
      };
    }
  ])