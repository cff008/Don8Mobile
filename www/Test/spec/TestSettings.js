beforeEach(module('app.services'));	//Make the real service available
beforeEach(module('ui.router'));
beforeEach(module('ionicUIRouter'));
beforeEach(module('app.routes'));



describe('settingsCtrl', function() {
 var scope;
  
    it('test get settings - valid request', function() {
		var $scope = {}
		module('app.controllers');
		inject(function($rootScope, $controller, $q, _$httpBackend_) {
			$scope = $rootScope.$new();
			$rootScope.userid = 1;
			$httpBackend = _$httpBackend_;
			//mock state
	        stateMock = jasmine.createSpyObj('$state.spy', ['go']);

	        // mock $ionicPopup
	        ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['alert']);

	         // instantiate settingsCtrl
	        controller = $controller('settingsCtrl', { 
	                    '$ionicPopup': ionicPopupMock, 
	                    '$state': stateMock, 
	                    '$scope': $scope
			});
	    });

		//Set up http backend expectations
	    $httpBackend.whenGET("http://www.don8don8.site/data/settings.php?id=1").respond({"settings":{"push":"1","email":"1","location":"1","location_radius":"25","anonymous":"1"},"status":"OK"});
	    $httpBackend.expectGET("http://www.don8don8.site/data/settings.php?id=1");
    
    	//$rootScope.userid = 1; 
      	$scope.getSettings();
      	$scope.$root.$digest();
      	$httpBackend.flush();
    });

    it('test get settings - unkown error', function() {
		var $scope = {}
		module('app.controllers');
		inject(function($rootScope, $controller, $q, _$httpBackend_) {
			$scope = $rootScope.$new();
			$rootScope.userid = 1;
			$httpBackend = _$httpBackend_;
			//mock state
	        stateMock = jasmine.createSpyObj('$state.spy', ['go']);

	        // mock $ionicPopup
	        ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['alert']);

	         // instantiate settingsCtrl
	        controller = $controller('settingsCtrl', { 
	                    '$ionicPopup': ionicPopupMock, 
	                    '$state': stateMock, 
	                    '$scope': $scope
			});
	    });

		//Set up http backend expectations
	    $httpBackend.whenGET("http://www.don8don8.site/data/settings.php?id=1").respond({"status":"UNKOWN_ERROR"});
	    $httpBackend.expectGET("http://www.don8don8.site/data/settings.php?id=1");
    
    	
      	$scope.getSettings();
      	$scope.$root.$digest();
      	$httpBackend.flush();
    });

	it('test get settings - invalid request', function() {
		var $scope = {}
		module('app.controllers');
		inject(function($rootScope, $controller, $q, _$httpBackend_) {
			$scope = $rootScope.$new();
			$rootScope.userid = 1;
			$httpBackend = _$httpBackend_;
			//mock state
	        stateMock = jasmine.createSpyObj('$state.spy', ['go']);

	        // mock $ionicPopup
	        ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['alert']);

	         // instantiate settingsCtrl
	        controller = $controller('settingsCtrl', { 
	                    '$ionicPopup': ionicPopupMock, 
	                    '$state': stateMock, 
	                    '$scope': $scope
			});
	    });

		//Set up http backend expectations
	    $httpBackend.whenGET("http://www.don8don8.site/data/settings.php?id=1").respond({"status":"INVALID_REQUEST"});
	    $httpBackend.expectGET("http://www.don8don8.site/data/settings.php?id=1");
    
    	
      	$scope.getSettings();
      	$scope.$root.$digest();
      	$httpBackend.flush();
    });

	it('test set settings - valid', function() {
		var $scope = {}
		module('app.controllers');
		inject(function($rootScope, $controller, $q, _$httpBackend_) {
			$scope = $rootScope.$new();
			$rootScope.userid = 1;
			$httpBackend = _$httpBackend_;
			//mock state
	        stateMock = jasmine.createSpyObj('$state.spy', ['go']);

	        // mock $ionicPopup
	        ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['alert']);

	         // instantiate settingsCtrl
	        controller = $controller('settingsCtrl', { 
	                    '$ionicPopup': ionicPopupMock, 
	                    '$state': stateMock, 
	                    '$scope': $scope
			});
	    });

		//Set up http backend expectations
	    $httpBackend.whenGET("http://www.don8don8.site/data/update_settings.php?anon=0&email=1&location_access=1&push=1&radius=15&userid=1").respond({"status":"OK"});
	    $httpBackend.expectGET("http://www.don8don8.site/data/update_settings.php?anon=0&email=1&location_access=1&push=1&radius=15&userid=1");

    
    	$scope.data.pushNotifications = 1;
    	$scope.data.emailNotifications = 1;
    	$scope.data.locationAccess = 1;
    	$scope.updateSettings();
      	$scope.$root.$digest();
      	$httpBackend.flush();
    });

	it('test set settings - unknown error', function() {
		var $scope = {}
		module('app.controllers');
		inject(function($rootScope, $controller, $q, _$httpBackend_) {
			$scope = $rootScope.$new();
			$rootScope.userid = 1;
			$httpBackend = _$httpBackend_;
			//mock state
	        stateMock = jasmine.createSpyObj('$state.spy', ['go']);

	        // mock $ionicPopup
	        ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['alert']);

	         // instantiate settingsCtrl
	        controller = $controller('settingsCtrl', { 
	                    '$ionicPopup': ionicPopupMock, 
	                    '$state': stateMock, 
	                    '$scope': $scope
			});
	    });

		//Set up http backend expectations
	    $httpBackend.whenGET("http://www.don8don8.site/data/update_settings.php?anon=0&email=1&location_access=1&push=1&radius=15&userid=1").respond({"status":"UNKOWN_ERROR"});
	    $httpBackend.expectGET("http://www.don8don8.site/data/update_settings.php?anon=0&email=1&location_access=1&push=1&radius=15&userid=1");

    
    	$scope.data.pushNotifications = 1;
    	$scope.data.emailNotifications = 1;
    	$scope.data.locationAccess = 1;
    	$scope.updateSettings();
      	$scope.$root.$digest();
      	$httpBackend.flush();
    });

	it('test set settings - invalid request', function() {
		var $scope = {}
		module('app.controllers');
		inject(function($rootScope, $controller, $q, _$httpBackend_) {
			$scope = $rootScope.$new();
			$rootScope.userid = 1;
			$httpBackend = _$httpBackend_;
			//mock state
	        stateMock = jasmine.createSpyObj('$state.spy', ['go']);

	        // mock $ionicPopup
	        ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['alert']);

	         // instantiate settingsCtrl
	        controller = $controller('settingsCtrl', { 
	                    '$ionicPopup': ionicPopupMock, 
	                    '$state': stateMock, 
	                    '$scope': $scope
			});
	    });

		//Set up http backend expectations
	    $httpBackend.whenGET("http://www.don8don8.site/data/update_settings.php?anon=0&email=1&location_access=1&push=1&radius=15&userid=1").respond({"status":"INVALID_REQUEST"});
	    $httpBackend.expectGET("http://www.don8don8.site/data/update_settings.php?anon=0&email=1&location_access=1&push=1&radius=15&userid=1");

    
    	$scope.data.pushNotifications = 1;
    	$scope.data.emailNotifications = 1;
    	$scope.data.locationAccess = 1;
    	$scope.updateSettings();
      	$scope.$root.$digest();
      	$httpBackend.flush();
    });
 
});
