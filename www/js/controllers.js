angular.module('app.controllers', [])
     
.controller('myProfileCtrl', function($scope) {

})
   
.controller('eventFeedCtrl', function($scope) {

})
   
.controller('myEventsCtrl', function($scope) {

})
   
.controller('settingsCtrl', function($scope) {

})
   
.controller('loginCtrl', function($scope, LoginService, $ionicPopup, $state) {

	//Login verifier
	$scope.data = {};
 
    $scope.login = function() {
    	console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('tabsController.myProfile');
            //var alertPopup = $ionicPopup.alert({template: 'Hi'});
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
})
   
.controller('signupCtrl', function($scope) {

})
   
.controller('editProfileCtrl', function($scope) {

})
 