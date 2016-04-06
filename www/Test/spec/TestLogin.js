beforeEach(module('app.services'));	//Make the real service available
beforeEach(module('ui.router'));
beforeEach(module('ionicUIRouter'));
beforeEach(module('app.routes'));

describe('loginCtrl', function() {
 var scope;
  
    it('test basic login', function() {
		var $scope = {}
		module('app.controllers');
		inject(function($rootScope, $controller, $q) {
			$scope = $rootScope.$new();
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

    
      	$scope.data.email = 'user';
      	$scope.data.password = 'secret';     
      	$scope.login();
      	$scope.$root.$digest();
		expect(stateMock.go).toHaveBeenCalledWith('tabsController.myProfile');
    });

    it('test bad login', function() {
    	var $scope = {};
		module('app.controllers');
		inject(function($rootScope, $controller, $q) {
			$scope = $rootScope.$new();
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

    
      	$scope.data.email = 'nonExistentUser';
      	$scope.data.password = 'notAPassword';
      	$scope.login();
      	$scope.$root.$digest();
		expect(ionicPopupMock.alert).toHaveBeenCalled();
    });
 
});
