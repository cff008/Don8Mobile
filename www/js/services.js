angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

.service('LoginService', function($q) {
  return {
      loginUser: function(email, pw) {
          var deferred = $q.defer();
          var promise = deferred.promise;

          //TODO: replace these checks with calls to the server
          if (email == 'user' && pw == 'secret') {
              deferred.resolve('Welcome ' + email + '!');
          } else {
              deferred.reject('Wrong credentials.');
          }
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

.service('SignupService', function($q) {
  return{
    signupUser: function(username, email, password) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      //TODO: Call the server
      deferred.resolve('Welcome' + username + '!');

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

.service('dataService', [ '$http', '$q',
    function ($http, $q) { return {
      getEvents: function(){
      return $http.get('/events/all').then(function(resp){
        if(typeof resp.data === 'object'){
          this.events = resp.data.events;
		    console.log(this.events);
          return this.events;
        }else{
          return $q.reject(resp.data);
        }
       
      }, function(err){
        return $q.reject(resp.data);
      })
     
    }
  }
}
  ]);