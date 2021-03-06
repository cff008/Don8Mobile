beforeEach(module('app.services'));	//Make the real service available
beforeEach(module('ui.router'));
beforeEach(module('ionicUIRouter'));
beforeEach(module('app.routes'));



describe('loginCtrl', function() {
 var scope;
  
    it('test basic login', function() {
		var $scope = {}
		module('app.controllers');
		inject(function($rootScope, $controller, $q, _$httpBackend_) {
			$scope = $rootScope.$new();
			$httpBackend = _$httpBackend_;
			//mock state
	        stateMock = jasmine.createSpyObj('$state.spy', ['go']);

	        // mock $ionicPopup
	        ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['alert']);

	         // instantiate loginCtrl
	        controller = $controller('loginCtrl', { 
	                    '$ionicPopup': ionicPopupMock, 
	                    '$state': stateMock, 
	                    '$scope': $scope
			});
	    });

		//Set up http backend expectations
	    $httpBackend.whenGET("http://www.don8don8.site/data/login.php?email=user@test.com&password=secret").respond({status: 'OK'});
	    $httpBackend.expectGET("http://www.don8don8.site/data/login.php?email=user@test.com&password=secret");
    
      	$scope.credentials.email = 'user@test.com';
      	$scope.credentials.password = 'secret';     
      	$scope.login();
      	$scope.$root.$digest();
      	$httpBackend.flush();
		expect(stateMock.go).toHaveBeenCalledWith('tabsController.myProfile');
    });

    it('test invalid login', function() {
    	var $scope = {};
		module('app.controllers');
		inject(function($rootScope, $controller, $q, _$httpBackend_) {
			$scope = $rootScope.$new();
			$httpBackend = _$httpBackend_;
			//mock state
	        stateMock = jasmine.createSpyObj('$state.spy', ['go']);

	        // mock $ionicPopup
	        ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['alert']);

	         // instantiate loginCtrl
	        controller = $controller('loginCtrl', { 
	                    '$ionicPopup': ionicPopupMock, 
	                    '$state': stateMock, 
	                    '$scope': $scope
			});
	    });

	    //Set up http backend expectations
	    $httpBackend.whenGET("http://www.don8don8.site/data/login.php?email=nonExistentUser@test.com&password=notAPassword").respond({'status': 'INVALID_REQUEST'});
	    $httpBackend.expectGET("http://www.don8don8.site/data/login.php?email=nonExistentUser@test.com&password=notAPassword");

    
      	$scope.credentials.email = 'nonExistentUser@test.com';
      	$scope.credentials.password = 'notAPassword';
      	$scope.login();
      	$scope.$root.$digest();
      	$httpBackend.flush();
		expect(ionicPopupMock.alert).toHaveBeenCalled();
    });

	it('test server error', function() {
    	var $scope = {};
		module('app.controllers');
		inject(function($rootScope, $controller, $q, _$httpBackend_) {
			$scope = $rootScope.$new();
			$httpBackend = _$httpBackend_;
			//mock state
	        stateMock = jasmine.createSpyObj('$state.spy', ['go']);

	        // mock $ionicPopup
	        ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['alert']);

	         // instantiate loginCtrl
	        controller = $controller('loginCtrl', { 
	                    '$ionicPopup': ionicPopupMock, 
	                    '$state': stateMock, 
	                    '$scope': $scope
			});
	    });

	    //Set up http backend expectations
	    $httpBackend.whenGET("http://www.don8don8.site/data/login.php?email=nonExistentUser@test.com&password=notAPassword").respond({'status': 'UNKNOWN_ERROR'});
	    $httpBackend.expectGET("http://www.don8don8.site/data/login.php?email=nonExistentUser@test.com&password=notAPassword");

    
      	$scope.credentials.email = 'nonExistentUser@test.com';
      	$scope.credentials.password = 'notAPassword';
      	$scope.login();
      	$scope.$root.$digest();
      	$httpBackend.flush();
		expect(ionicPopupMock.alert).toHaveBeenCalled();
    });
 
});
