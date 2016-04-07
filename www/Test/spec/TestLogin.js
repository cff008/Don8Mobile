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
	    $httpBackend.whenGET("/login?email=user@test.com&password=secret").respond({'status': 'OK'});
	    $httpBackend.expectGET("/login?email=user@test.com&password=secret");
    
      	$scope.data.email = 'user@test.com';
      	$scope.data.password = 'secret';     
      	$scope.login();
      	$scope.$root.$digest();
		expect(stateMock.go).toHaveBeenCalledWith('tabsController.myProfile');
    });

    it('test bad login', function() {
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
	    $httpBackend.whenGET("/login?email=nonExistentUser@test.com&password=notAPassword").respond({'status': 'INVALID_REQUEST'});
	    $httpBackend.expectGET("/login?email=nonExistentUser@test.com&password=notAPassword");

    
      	$scope.data.email = 'nonExistentUser@test.com';
      	$scope.data.password = 'notAPassword';
      	$scope.login();
      	$scope.$root.$digest();
		expect(ionicPopupMock.alert).toHaveBeenCalled();
    });
 
});
