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
				
				
				controller = $controller('eventFeedCtrl', {'$scope': $scope, '$state': stateMock, 'dataService': eventServiceMock});
			});
    
      $scope.search.string = 'Red Cross';
      $scope.goToList();
      expect($scope.temp.search).toEqual('Red Cross');
    });
	
   it('moreCanbeloaded', function(){
	var $scope = {};
		module('app.controllers');
		inject(function($controller, $q) {
				eventServiceMock = {
					search: jasmine.createSpy('search spy').and.returnValue('pie')
				};
				//mocking the state of the union
				stateMock = jasmine.createSpyObj('$state.spy', ['go']);
				
				//mock da scope
				
				
				controller = $controller('eventFeedCtrl', {'$scope': $scope, '$state': stateMock, 'dataService': eventServiceMock});
			});
		//no data
		expect($scope.moreDataCanBeLoaded()).toEqual(true);
		$scope.index = 1;
		$scope.newEvents = [{id:1, name:'Test Event', organization:'test'}];
		//no difference between newEvents and Events
		expect($scope.moreDataCanBeLoaded()).toEqual(false);
});

it('Load ', function() {
		
		var mockEvent= [{id:1, name:'Test Event', organization:'test'}];
		var mockEvent2 = [{id:1, name:'Test Event', organization:'test'}, {id:1, name:'Test Event', organization:'test'}]
		module('app.controllers');

		inject(function($rootScope,$controller, $q) {
				$scope = $rootScope.$new()
				eventServiceMock = {
					getNext: jasmine.createSpy('getNext spy').and.returnValue('pie'),
				};
				  eventServiceMock.getEvents = function(id) {
					var deferred = $q.defer();
					deferred.resolve(mockEvent);
					
					return deferred.promise;   
					}
				
				//mocking the state 
				stateMock = jasmine.createSpyObj('$state.spy', ['go']);
				
				
				
				
				controller = $controller('eventFeedCtrl', {'$scope': $scope, '$state': stateMock, 'dataService': eventServiceMock});
			});
    
      $scope.loadNext();
	  $scope.$root.$digest();
      expect($scope.events[0]).toEqual(mockEvent[0]);
	  expect($scope.index).toEqual(1);
	  $scope.loadNext();
	  $scope.$root.$digest();
	  expect($scope.index).toEqual(2);
	  expect($scope.events).toEqual(mockEvent);
    });

	it('Load ', function() {
		
		var mockEvent= [{id:1, name:'Test Event', organization:'test'}];
		var mockEvent2 = [{id:1, name:'Test Event', organization:'test'}, {id:1, name:'Test Event', organization:'test'}]
		module('app.controllers');

		inject(function($rootScope,$controller, $q) {
				$scope = $rootScope.$new()
				eventServiceMock = {
					getNext: jasmine.createSpy('getNext spy').and.returnValue('pie'),
				};
				  eventServiceMock.getMyEvents = function(id) {
					var deferred = $q.defer();
					deferred.resolve(mockEvent);
					
					return deferred.promise;   
					}
				
				//mocking the state 
				stateMock = jasmine.createSpyObj('$state.spy', ['go']);
				
				
				
				
				controller = $controller('myEventsCtrl', {'$scope': $scope, '$state': stateMock, 'dataService': eventServiceMock});
			});
    
      $scope.loadNext();
	  $scope.$root.$digest();
      expect($scope.events[0]).toEqual(mockEvent[0]);
	  expect($scope.index).toEqual(1);
	  $scope.loadNext();
	  $scope.$root.$digest();
	  expect($scope.index).toEqual(2);
	  expect($scope.events).toEqual(mockEvent);
    });


	

})
