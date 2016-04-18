angular.module('app.controllers', [])
   
.controller('cameraCtrl', function ($scope, $cordovaCamera) {
   $scope.getPicture = function() {
    var options = {
        quality: 75,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        encodingType: Camera.EncodingType.JPEG,
        popoverOptions: CameraPopoverOptions
   };

    $cordovaCamera.getPicture(options).then(function (imageData) {
    $scope.imgURI =  imageData;
   }, function (err) {
       console.log("err accessing photo library", err)
  });
}
})

.controller('myProfileCtrl', [
  '$scope',
  '$rootScope',  
  'profileService',
  function($scope, $rootScope, profileService) {
    var id = $rootScope.userid;
    $scope.data = {};
    $scope.interests = [];
    $scope.organizations = [];
    $scope.getProfile = function() { 
    profileService.getProfile(id).then(function(data){
      $scope.data.firstname = data.firstname;
      $scope.data.lastname = data.lastname;
      $scope.data.email = data.email;
      $scope.data.phone = data.phone;
      $scope.data.photo = data.photo;
      $scope.data.city = data.city;
      $scope.data.state = data.state;
      $scope.data.interests = data.interests;
      $scope.data.organizations = data.organizations;
      var tempinterests = []; 
      var temporganizations = [];
      for(i = 0; i < data.interests.length; i = i + 1){
         return data.interests[i];
         }
      
      for(i = 0; i < data.organizations.length; i = i + 1){
         temporganizations.push(organizations[i]);
      }
      return temporganizations;
    });
    }
    $scope.getProfile();
  }
  ])
  

.controller('editProfile', [
  '$scope',
  '$rootScope',
  '$editProfileService',
  function($scope, $rootScope, $editProfileService) {
    $scope.data = {};
    var updateInterests = [];
    $scope.editProfile = function() {
    editProfileService.editProfile($scope.data.firstname, $scope.data.lastname,
     $scope.data.email, $scope.data.interests).then(function(data) {
        
    }).error(function(data) {
      console.log("Unable to update settings on server." + data);
    });
  }
  }
  ])


   
.controller('eventFeedCtrl', [
    '$scope',
    '$state',
	'dataService',
    function ($scope, $state, dataService) {
      $scope.search = {};
	  $scope.events = [];
	  $scope.event = {};
	  $scope.newEvents = [];
	  $scope.index = 0;
	  addFive = function(eventss,index){
		var tempevents = [], i = index;
		for (i; i < eventss.length; i = i + 1) {
            if(i == index+5){
				break;
			}
         tempevents.push(eventss[i]);
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
		if($scope.index == $scope.newEvents.length && $scope.newEvents.length != 0){
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
	'$rootScope',
    function ($scope, $state, dataService, $rootScope) {
		$scope.events = [];
		$scope.newEvents = [];
		$scope.index = 0;
     
	 addFive = function(eventss,index){
		var tempevents = [], i = index;
		for (i; i < eventss.length; i = i + 1) {
            if(i == index+5){
				break;
			}
         tempevents.push(eventss[i]);
		}
		return tempevents;
		};
      
	  
	  $scope.loadNext = function () {
		if($scope.events.length == 0){
		dataService.getMyEvents($rootScope.userid).then(function(events){
			$scope.newEvents = events;
			// .then(function (events) {
			  
			  
			  if($scope.newEvents != $scope.events){
			  $scope.events = $scope.newEvents;
			  }
			  $scope.$broadcast('scroll.infiniteScrollComplete');
			
		// .finally(function () 
			});
			 $scope.$broadcast('scroll.infiniteScrollComplete');
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
		if($scope.newEvents.length == $scope.index && $scope.newEvents.length != 0){
			return false;
		}else{
			return true;
		}
	};
	}
	  ])
   
.controller('settingsCtrl', function($rootScope, $scope, SettingsService, $state, $ionicPopup) {

  $scope.data = {};


  $scope.getSettings = function() {
    SettingsService.getSettings().then(function(data){
      $scope.data.pushNotifications = data.push;
      $scope.data.emailNotifications = data.email;
      $scope.data.locationAccess = data.location;
      $scope.data.anonymous = data.anonymous;
      //console.log("push: " + $scope.data.pushNotifications + " email: " + $scope.data.emailNotifications + " location: " + $scope.data.locationAccess);
    });
  }

  $scope.updateSettings = function() {
    SettingsService.updateSettings($scope.data.pushNotifications, $scope.data.emailNotifications, $scope.data.locationAccess).success(function(data) {
      console.log(data);
    }).error(function(data) {
      console.log("Unable to update settings on server." + data);
    });
  }

  $scope.logout = function(){
    //TODO: clear information about current user - iteration3?
    
    //change state to login screen
    $state.go('login');
  }

})
   
.controller('loginCtrl', function($scope, $rootScope, LoginService, $ionicPopup, $state) {

	//Login verifier
	$scope.data = {};
    $scope.login = function() {

    	console.log("LOGIN user: " + $scope.data.email + " - PW: " + $scope.data.password);	//TODO: This will need to be taken out for security reasons
        LoginService.loginUser($scope.data.email, $scope.data.password).success(function(data) {
            $state.go('tabsController.myProfile');
            console.log("Successful login.");
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
   
.controller('signupCtrl', function($scope, $rootScope, SignupService, $ionicPopup, $state) {
  $scope.data = {};

    $scope.signup = function(){

      SignupService.signupUser($scope.data.firstname, $scope.data.lastname, $scope.data.email, $scope.data.password).success(function(data) {
        console.log("Account Created: NAME: " + $scope.data.firstname + " " + $scope.data.lastname + " - EMAIL: " + $scope.data.email + " - PW: " + $scope.data.password); //TODO: remove this line for security reasons
        $state.go('tabsController.editProfile');
        $rootScope.userid = data.userid;
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
	'$timeout',
    function ($scope, $stateParams, $window, $ionicPopup, dataService, $timeout) {
	  $scope.event = {name: '', city: '', district: '', image: '', street: '', number: '', zip: '', city: '', description: '', date: '', contact_name: '', contact_phone: '', contact_first: '', contact_last: '', website: '', state: ''};
	  var i = 0,
	  id = $stateParams.id;
	  $scope.added = false;
	  console.log($stateParams);	
      $scope.loading = true;
	  $scope.buttonText = "Signup for Event";
	  dataService.getEvent(id).then(function(events){
	  $scope.event = events;
		$timeout(function(){$scope.$apply($scope.event);});
		console.log($scope.event);
      }).finally(function () {
		$scope.loading = false
      });

      $scope.reload = function () {
		$scope.loading = true;
        dataService.getEvent(id).then(function(events){
		$scope.event = events;
      }).finally(function () {
        $scope.loading = false;
      });
      };

	  $scope.addEvent = function() {
			//dataService.addUserToEvent(userid, id).then(
				$scope.added = true;
				$scope.buttonText = "Thanks for volunteering!!!"
			//)
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
	  
	  searchFor = function(searchString, events) {
		var founds =[],
		currentEvent,
		i = 0;
		 for (i; i < events.length; i = i + 1) {
          currentEvent = events[i];
          if (currentEvent.name.toLowerCase().indexOf(searchString.toLowerCase()) != -1 ||  currentEvent.organization.toLowerCase().indexOf(searchString.toLowerCase()) != -1){
              founds.push(currentEvent);
          }
        }
		return founds;
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
		  dataService.getEvents().then( function(eventss){
          $scope.events =  searchFor(search,eventss);
          $scope.loading = false;
          $scope.$broadcast('scroll.infiniteScrollComplete');
		  });
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