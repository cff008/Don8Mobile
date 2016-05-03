angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

.service('ForgotPasswordService', function($q, $http) {
  return{
    retrievePassword: function(email) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      $http({
        method: 'GET',
        url: 'http://www.don8don8.site/data/send_password_email.php',
        params: {email: email}
      }).then(function successCallback(response) {
        if(response.data.status == 'OK'){
          deferred.resolve('Check your email for a password reset link.');
        } else if (response.data.status == 'INVALID_REQUEST'){
          deferred.reject('Invalid username.');
        }else {
          deferred.reject('This shouldn\'t happen.');
        }
      }, function errorCallback(response) {
        deferred.reject('Server communication error');
      });
      promise.success = function(fn) {
        promise.then(fn);
        return promise;
      }
      promise.error = function(fn) {
        promise.then(null, fn);
        return promise;
      }
      return promise;
    }
  }
})

.service('LoginService', function($q, $http, $rootScope) {
  return {
      loginUser: function(email, pw) {
          var deferred = $q.defer();
          var promise = deferred.promise;

          $http({
            method: 'GET',
            url: 'http://www.don8don8.site/data/login.php',
            params: {email: email, password: pw}
          }).then(function successCallback(response) {
            //this callback will be called asynchronously when the response is available
            if(response.data.status == 'OK'){
              deferred.resolve('Welcome ' + email + '!');
              $rootScope.userid = response.data.userid;
            } else if(response.data.status == 'INVALID_REQUEST') {
              deferred.reject('Username or password is incorrect');
            } else if(response.data.status == 'UNKNOWN_ERROR') {
              deferred.reject('Something went wrong. Please try again.');
            } else {
              deferred.reject('This shouldn\'t happen');
            }
          }, function errorCallback(response) {
            //called asynchronously if an error occurs or server returns response with an error status
            deferred.reject('Server communication error');
          });
          promise.success = function(fn) {
              promise.then(fn);
              return promise;
          }
          promise.error = function(fn) {
              promise.then(null, fn);
              return promise;
          }
          return promise;
      }
  }
})

.service('profileService', function($q, $http, $rootScope) {
  this.getProfile = function(){
    var deferred = $q.defer();
    var promise = $http({
      method: 'GET',
      url: 'http://don8don8.site/data/displayprofile.php',
      params: {id: $rootScope.userid}
    }).then(function successCallback(response) {
      if(response.data.status == 'OK'){
        deferred.resolve('Welcome to Don8');
        return response.data.user;
      } else if(response.data.status == 'UNKNOWN_ERROR'){
        deferred.reject('Something went wrong. Please try again.')
      } else if(response.data.status == 'INVALID_REQUEST'){
        deferred.reject('Invalid userid');
      } else {
        deferred.reject('This shouldn\'t happen.');
      }
    }, function errorCallback(response){
      deferred.reject('Server communication error');
    });
    return promise;
  }
})

.service('editProfileService', function($q, $http, $rootScope) {
  return{
    editProfile: function(firstname, lastname, email, interests) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      $http({
        method: 'GET',
        url: 'http://don8don8.site/data/update_profile.php',
        params: {userid: $rootScope.userid, firstname: firstname, lastname: lastname, email: email, interests: interests}
      }).then(function successCallback(response) {
        //this callback will be called asynchronously when the response is available
        if(response.data.status == 'OK'){
          deferred.resolve('Changes Made');
          $rootScope.userid = response.data.userid;
        } else if(response.data.status == 'UNKNOWN_ERROR') {
          deferred.reject('Something went wrong. Please try again.');
        } else if(response.data.status == 'INVALID_REQUEST'){
          deferred.reject('Bad Input');
        } else {
          deferred.reject('This shouldn\'t happen');
        }

        //TODO: Add cases for: username/email already exists, etc.
      }, function errorCallback(response) {
        //called asynchronously if an error occurs or the server returns response with an error status
        deferred.reject('Server communication error');
      });

      promise.success = function(fn) {
        promise.then(fn);
        return promise;
      }
      promise.error = function(fn) {
        promise.then(null, fn);
        return promise;
      }
      return promise;
    }
  }
})
// .service('editProfileService', function($q, $http, $rootScope) {
//   this.editProfile = function(){
//     var deferred = $q.defer();
//     var promise = $http({
//       method: 'GET',
//       url: '/update_profile',
//       params: {firstname: data.firstname, lastname: data.lastname, email: data.email, phone: data.phone, interests: interests}
//     }).then(function successCallback(response) {
//       if(response.data.status == 'OK'){
//         deferred.resolve('Welcome to Don8');
//         return response.data.user;
//       } else if(response.data.status == 'UNKNOWN_ERROR'){
//         deferred.reject('Something went wrong. Please try again.')
//       } else if(response.data.status == 'INVALID_REQUEST'){
//         deferred.reject('Invalid userid');
//       } else {
//         deferred.reject('This shouldn\'t happen.');
//       }
//     }, function errorCallback(response){
//       deferred.reject('Server communication error');
//     });
//     return promise;
//   }
// });



.service('SignupService', function($q, $http, $rootScope) {
  return{
    signupUser: function(firstname, lastname, email, password) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      $http({
        method: 'GET',
        url: 'http://www.don8don8.site/data/create_new_profile.php',
        params: {firstname: firstname, lastname: lastname, email: email, password: password}
      }).then(function successCallback(response) {
        //this callback will be called asynchronously when the response is available
        if(response.data.status == 'OK'){
          deferred.resolve('Welcome ' + firstname + ' ' + lastname + '!');
          $rootScope.userid = response.data.userid;
        } else if(response.data.status == 'UNKNOWN_ERROR') {
          deferred.reject('Something went wrong. Please try again.');
        } else if(response.data.status == 'INVALID_REQUEST'){
          deferred.reject('That email address is already taken');
        } else {
          deferred.reject('This shouldn\'t happen');
        }

        //TODO: Add cases for: username/email already exists, etc.
      }, function errorCallback(response) {
        //called asynchronously if an error occurs or the server returns response with an error status
        deferred.reject('Server communication error');
      });

      promise.success = function(fn) {
        promise.then(fn);
        return promise;
      }
      promise.error = function(fn) {
        promise.then(null, fn);
        return promise;
      }
      return promise;
    }
  }
})

.service('SettingsService', function($q, $http, $rootScope){
  this.getSettings = function(){
    var deferred = $q.defer();
    var promise = deferred.promise;

    $http({
      method: 'GET',
      url: 'http://www.don8don8.site/data/settings.php',
      params: {id: $rootScope.userid}
    }).then(function successCallback(response) {
      if(response.data.status == 'OK'){
        deferred.resolve(response.data.settings);
        console.log("Settings retrieved from server");
        //return response.data.settings;
      } else if(response.data.status == 'UNKNOWN_ERROR'){
        deferred.reject('Something went wrong. Please try again.')
      } else if(response.data.status == 'INVALID_REQUEST'){
        deferred.reject('Invalid userid');
      } else {
        deferred.reject('This shouldn\'t happen.');
      }
    }, function errorCallback(response){
      deferred.reject('Server communication error');
    });

    promise.success = function(fn) {
        promise.then(fn);
        return promise;
    }
    promise.error = function(fn) {
        promise.then(null, fn);
        return promise;
    }
    return promise;
  }

  this.updateSettings = function(push, email, location){
    var deferred = $q.defer();
    var promise = deferred.promise;

    $http({
      method: 'GET',
      url: '/update_settings',
      params: {userid: $rootScope.userid, push: push, email: email, location_access: location}
    }).then(function successCallback(response) {
      if(response.data.status == 'OK'){
        deferred.resolve('Updated settings for user on server.');
      } else if(response.data.status == 'UNKNOWN_ERROR'){
        deferred.reject('Something went wrong. Please try again.')
      } else if(response.data.status == 'INVALID_REQUEST'){
        deferred.reject('Invalid userid');
      } else {
        deferred.reject('This shouldn\'t happen.');
      }
    }, function errorCallback(response){
      deferred.reject('Server communication error');
    });

    promise.success = function(fn) {
        promise.then(fn);
        return promise;
    }
    promise.error = function(fn) {
        promise.then(null, fn);
        return promise;
    }
    return promise;

  }
})

.service('dataService', [ '$http', '$q',
    function ($http, $q) { return {
      getEvents: function(){
		  return $http.get('http://don8don8.site/data/events.php').then(function(resp){
			if(typeof resp.data === 'object'){
			  this.events = resp.data.events;
				console.log(this.events);
			  return $q.resolve(this.events);
			}else{
			  return $q.reject(resp.data);
			}
		   
		  }, function(err){
			return $q.reject(resp.data);
		  });
		},
	getEvent: function(id){
		return $http({
      method: 'GET',
      url: 'http://don8don8.site/data/events.php',
      params: {id: id}
    }).then(function successCallback(response) {
		if(response.data.status == 'OK'){
        return response.data.events;
      } else if(response.data.status == 'UNKNOWN_ERROR'){
        $q.reject('Something went wrong. Please try again.')
      } else if(response.data.status == 'INVALID_REQUEST'){
        $q.reject('Invalid userid');
      } else {
        $q.reject('This shouldn\'t happen.');
      }
    }, function errorCallback(response){
      $q.reject('Server communication error');
    });
	  },
	getMyEvents: function(id){
		return $http({
      method: 'GET',
      url: 'http://don8don8.site/data/events.php',
      params: {userid: id}
    }).then(function successCallback(response) {
		if(response.data.status == 'OK'){
        return response.data.events;
      } else if(response.data.status == 'UNKNOWN_ERROR'){
        $q.reject('Something went wrong. Please try again.')
      } else if(response.data.status == 'INVALID_REQUEST'){
        $q.reject('Invalid userid');
      } else {
        $q.reject('This shouldn\'t happen.');
      }
    }, function errorCallback(response){
      $q.reject('Server communication error');
    });
	  },

    //KAD
      addUserToEvent: function(userid, id){
    return $http({
      method: 'GET',
      url: 'http://don8don8.site/data/signup_for_event.php',
      params: {userid: userid, eventid: id}
    }).then(function successCallback(response) {
    if(response.data.status == 'OK'){
        return "success";
      } else if(response.data.status == 'UNKNOWN_ERROR'){
        $q.reject('Something went wrong. Please try again.')
      } else if(response.data.status == 'INVALID_REQUEST'){
        $q.reject('Invalid userid');
      } else {
        $q.reject('This shouldn\'t happen.');
      }
    }, function errorCallback(response){
      $q.reject('Server communication error');
    });
    }
	  
  }
}
  ]);