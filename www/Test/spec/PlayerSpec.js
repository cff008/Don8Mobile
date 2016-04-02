describe('eventFeedCtrl', function() {
 var scope;

    // load the controller's module
 /*   beforeEach(module('app'));

    beforeEach(inject(function($controller, $q) {
        eventServiceMock = {
			search: jasmine.createSpy('search spy').and.returnValue('pie')
		};
		//mocking the state of the union
		stateMock = jasmine.createSpyObj('$state.spy', ['go']);
		
		//mock da scope
		
		
        controller = $controller('eventFeedCtrl', {'$scope': $scope, '$state': stateMock, 'eventService': eventServiceMock});
    }));*/

  
    it('searchs for strings', function() {
		var $scope = {};
		module('app.controllers');
		inject(function($controller, $q) {
				eventServiceMock = {
					search: jasmine.createSpy('search spy').and.returnValue('pie')
				};
				//mocking the state of the union
				stateMock = jasmine.createSpyObj('$state.spy', ['go']);
				
				//mock da scope
				
				
				controller = $controller('eventFeedCtrl', {'$scope': $scope, '$state': stateMock, 'eventService': eventServiceMock});
			});
    
      $scope.search.string = 'Red Cross';
      $scope.goToList();
      expect($scope.temp.search).toEqual('Red Cross');
    });
 
});
