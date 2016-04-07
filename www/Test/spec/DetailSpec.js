describe('detailsCtrl', function() {

it('testLoad' , function(){
		var mockEvent= [{id:1, name:'Test Event', organization:'test'}];
module('app.controllers');

		inject(function($rootScope,$controller, $q) {
				$scope = $rootScope.$new()
				eventServiceMock = {
					getNext: jasmine.createSpy('getNext spy').and.returnValue('pie'),
				};
				  eventServiceMock.getEvent = function(id) {
					var deferred = $q.defer();
					deferred.resolve(mockEvent);
					
					return deferred.promise;   
					}
				
				//mocking the state 
				stateMock = jasmine.createSpyObj('$state.spy', ['go']);
				
				
				popUpMock = {};
				windowMock = {};
				
				controller = $controller('detailCtrl', {'$scope': $scope, '$stateParams': stateMock, 'dataService': eventServiceMock, '$window': windowMock, '$ionicPopup': popUpMock});
			});
			
			$scope.reload();
			//expect($scope.event).toEqual(mockEvent[0]);
		});
			
});			