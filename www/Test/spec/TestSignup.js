beforeEach(module('app.services'));	//Make the real service available
beforeEach(module('ui.router'));
beforeEach(module('ionicUIRouter'));
beforeEach(module('app.routes'));



describe('signupCtrl', function() {
 var scope;
  
    it('test basic signup', function() {
		var $scope = {}
		module('app.controllers');
		inject(function($rootScope, $controller, $q, _$httpBackend_) {
			$scope = $rootScope.$new();
			$httpBackend = _$httpBackend_;
			//mock state
	        stateMock = jasmine.createSpyObj('$state.spy', ['go']);

	        // mock $ionicPopup
	        ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['alert']);

	         // instantiate signupCtrl
	        controller = $controller('signupCtrl', { 
	                    '$ionicPopup': ionicPopupMock, 
	                    '$state': stateMock, 
	                    '$scope': $scope
			});
	    });

		//Set up http backend expectations
	    $httpBackend.whenGET("/create_profile?email=user@test.com&firstname=John&lastname=Doe&password=secret").respond({status: 'OK'});
	    $httpBackend.expectGET("/create_profile?email=user@test.com&firstname=John&lastname=Doe&password=secret");
    
      	$scope.data.email = 'user@test.com';
      	$scope.data.password = 'secret';     
      	$scope.data.firstname = 'John';
      	$scope.data.lastname = 'Doe';
      	$scope.signup();
      	$scope.$root.$digest();
      	$httpBackend.flush();
		expect(stateMock.go).toHaveBeenCalledWith('tabsController.editProfile');
    });



 	it('test basic signup for existing email', function() {
		var $scope = {}
		module('app.controllers');
		inject(function($rootScope, $controller, $q, _$httpBackend_) {
			$scope = $rootScope.$new();
			$httpBackend = _$httpBackend_;
			//mock state
	        stateMock = jasmine.createSpyObj('$state.spy', ['go']);

	        // mock $ionicPopup
	        ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['alert']);

	         // instantiate signupCtrl
	        controller = $controller('signupCtrl', { 
	                    '$ionicPopup': ionicPopupMock, 
	                    '$state': stateMock, 
	                    '$scope': $scope
			});
	    });

		//Set up http backend expectations
	    $httpBackend.whenGET("/create_profile?email=user@test.com&firstname=John&lastname=Doe&password=secret").respond({status: 'INVALID_REQUEST'});
	    $httpBackend.expectGET("/create_profile?email=user@test.com&firstname=John&lastname=Doe&password=secret");
    
      	$scope.data.email = 'user@test.com';
      	$scope.data.password = 'secret';     
      	$scope.data.firstname = 'John';
      	$scope.data.lastname = 'Doe';
      	$scope.signup();
      	$scope.$root.$digest();
      	$httpBackend.flush();
		expect(ionicPopupMock.alert).toHaveBeenCalledWith({title: 'Unable to create account', template: 'That email address is already taken'});
    });

	it('test basic signup for server error', function() {
		var $scope = {}
		module('app.controllers');
		inject(function($rootScope, $controller, $q, _$httpBackend_) {
			$scope = $rootScope.$new();
			$httpBackend = _$httpBackend_;
			//mock state
	        stateMock = jasmine.createSpyObj('$state.spy', ['go']);

	        // mock $ionicPopup
	        ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['alert']);

	         // instantiate signupCtrl
	        controller = $controller('signupCtrl', { 
	                    '$ionicPopup': ionicPopupMock, 
	                    '$state': stateMock, 
	                    '$scope': $scope
			});
	    });

		//Set up http backend expectations
	    $httpBackend.whenGET("/create_profile?email=user@test.com&firstname=John&lastname=Doe&password=secret").respond({status: 'UNKNOWN_ERROR'});
	    $httpBackend.expectGET("/create_profile?email=user@test.com&firstname=John&lastname=Doe&password=secret");
    
      	$scope.data.email = 'user@test.com';
      	$scope.data.password = 'secret';     
      	$scope.data.firstname = 'John';
      	$scope.data.lastname = 'Doe';
      	$scope.signup();
      	$scope.$root.$digest();
      	$httpBackend.flush();
		expect(ionicPopupMock.alert).toHaveBeenCalledWith({title: 'Unable to create account', template: 'Something went wrong. Please try again.'});
    });
 
});
