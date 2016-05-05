beforeEach(module('app.services'));	//Make the real service available
beforeEach(module('ui.router'));
beforeEach(module('ionicUIRouter'));
beforeEach(module('app.routes'));



describe('forgotPasswordCtrl', function() {
 var scope;
  
    it('test valid forgot password', function() {
		var $scope = {}
		module('app.controllers');
		inject(function($rootScope, $controller, $q, _$httpBackend_) {
			$scope = $rootScope.$new();
			$httpBackend = _$httpBackend_;
			//mock state
	        stateMock = jasmine.createSpyObj('$state.spy', ['go']);

	        // mock $ionicPopup
	        ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['alert']);

	         // instantiate forgotPasswordCtrl
	        controller = $controller('forgotPasswordCtrl', { 
	                    '$ionicPopup': ionicPopupMock, 
	                    '$state': stateMock, 
	                    '$scope': $scope
			});
	    });

		//Set up http backend expectations
	    $httpBackend.whenGET("http://www.don8don8.site/data/send_password_email.php?email=test@test.com").respond({status: 'OK'});
	    $httpBackend.expectGET("http://www.don8don8.site/data/send_password_email.php?email=test@test.com");
    
      	$scope.data.email = 'test@test.com';    
      	$scope.retrievePassword();
      	$scope.$root.$digest();
      	$httpBackend.flush();
		expect(stateMock.go).toHaveBeenCalledWith('login');
    });

    it('test invalid password recovery', function() {
		var $scope = {}
		module('app.controllers');
		inject(function($rootScope, $controller, $q, _$httpBackend_) {
			$scope = $rootScope.$new();
			$httpBackend = _$httpBackend_;
			//mock state
	        stateMock = jasmine.createSpyObj('$state.spy', ['go']);

	        // mock $ionicPopup
	        ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['alert']);

	         // instantiate forgotPasswordCtrl
	        controller = $controller('forgotPasswordCtrl', { 
	                    '$ionicPopup': ionicPopupMock, 
	                    '$state': stateMock, 
	                    '$scope': $scope
			});
	    });

		//Set up http backend expectations
	    $httpBackend.whenGET("http://www.don8don8.site/data/send_password_email.php?email=invaliduser@test.com").respond({status: 'INVALID_REQUEST'});
	    $httpBackend.expectGET("http://www.don8don8.site/data/send_password_email.php?email=invaliduser@test.com");
    
      	$scope.data.email = 'invaliduser@test.com';    
      	$scope.retrievePassword();
      	$scope.$root.$digest();
      	$httpBackend.flush();
		expect(ionicPopupMock.alert).toHaveBeenCalled();
    });

	it('test server error', function() {
		var $scope = {}
		module('app.controllers');
		inject(function($rootScope, $controller, $q, _$httpBackend_) {
			$scope = $rootScope.$new();
			$httpBackend = _$httpBackend_;
			//mock state
	        stateMock = jasmine.createSpyObj('$state.spy', ['go']);

	        // mock $ionicPopup
	        ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['alert']);

	         // instantiate forgotPasswordCtrl
	        controller = $controller('forgotPasswordCtrl', { 
	                    '$ionicPopup': ionicPopupMock, 
	                    '$state': stateMock, 
	                    '$scope': $scope
			});
	    });

		//Set up http backend expectations
	    $httpBackend.whenGET("http://www.don8don8.site/data/send_password_email.php?email=invaliduser@test.com").respond({status: 'UNKNOWN_ERROR'});
	    $httpBackend.expectGET("http://www.don8don8.site/data/send_password_email.php?email=invaliduser@test.com");
    
      	$scope.data.email = 'invaliduser@test.com';    
      	$scope.retrievePassword();
      	$scope.$root.$digest();
      	$httpBackend.flush();
		expect(ionicPopupMock.alert).toHaveBeenCalled();
    });
 
});
