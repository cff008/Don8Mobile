angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

.service('LoginService', function($q, $http, $rootScope) {
  return {
      loginUser: function(email, pw) {
          var deferred = $q.defer();
          var promise = deferred.promise;

          //TODO: replace these checks with calls to the server
          /*if (email == 'user' && pw == 'secret') {
              deferred.resolve('Welcome ' + email + '!');
          } else {
              deferred.reject('Wrong credentials.');
          }*/

          $http({
            method: 'GET',
            url: '/login',
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

.service('SignupService', function($q, $http, $rootScope) {
  return{
    signupUser: function(firstname, lastname, email, password) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      $http({
        method: 'GET',
        url: '/create_profile',
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
    var promise = $http({
      method: 'GET',
      url: '/get_settings',
      params: {id: $rootScope.userid}
    }).then(function successCallback(response) {
      if(response.data.status == 'OK'){
        deferred.resolve('Successfully attained stored settings');
        console.log("Settings retrieved from server");
        return response.data.settings;
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

  this.updateSettings = function(push, email, location){
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: '/update_settings',
      params: {userid: $rootScope.userid, push: push, email: email, location_access: location}
    }).then(function successCallback(response) {
      if(response.data.status == 'OK'){
        deferred.resolve('Successfully updated settings');
        console.log("Settings updated on server");
        return response.data.settings;
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
  }
})

.service('eventService', [
    '$q',
    '$timeout',
    'dataService',
    function ($q, $timeout, dataService) {
		
      function check(currentEvent, satTrans, wheelChair, wheelChairLift) {
        if (satTrans && wheelChair && wheelChairLift) {
          if (!currentEvent.satTrans || !currentEvent.wheelChair || !currentEvent.wheelChairLift) {
            return false;
          }
        } else if (satTrans && wheelChair) {
          if (!currentEvent.satTrans || !currentEvent.wheelChair) {
            return false;
          }
        } else if (wheelChair && wheelChairLift) {
          if (!currentEvent.wheelChair || !currentEvent.wheelChairLift) {
            return false;
          }
        } else if (satTrans && wheelChairLift) {
          if (!currentEvent.satTrans || !currentEvent.wheelChairLift) {
            return false;
          }
        } else if (satTrans && !currentEvent.satTrans) {
          return false;
        } else if (wheelChair && !currentEvent.wheelChair) {
          return false;
        } else if (wheelChairLift && !currentEvent.wheelChairLift) {
          return false;
        }

        return true;
      }

	//, satTrans, wheelChair, wheelChairLift
      this.search = function (searchString) {
        var events = dataService.events,
            deferred = $q.defer(),
            founds = [],
            currentEvent,
            i = 0;
		
        for (i; i < events.length; i = i + 1) {
          currentEvent = events[i];
          if (currentEvent.name && currentEvent.name.indexOf(searchString) !== -1 || currentEvent.city && currentEvent.city.indexOf(searchString) !== -1 || currentEvent.district && currentEvent.district.indexOf(searchString) !== -1   || currentEvent.organization && currentEvent.organization.indexOf(searchString) !== -1){
//$filter('lowercase')(currentEvent.name)==$filter('lowercase')(searchString)||$filter('lowercase')(currentEvent.organization)==$filter('lowercase')(searchString) ||$filter('lowercase')(currentEvent.city)==$filter('lowercase')(searchString)){
           // if (check(currentEvent, satTrans, wheelChair, wheelChairLift)) {
              currentEvent.thumb = 'http://lorempixel.com/200/200/sports/?' + ((new Date()).getTime() + i);
              founds.push(currentEvent);
           // }
          }
        }
        // simulate asynchronous requests
        $timeout(function () {
          deferred.resolve(angular.copy(founds));
        }, 2000);

        return deferred.promise;
      };

      this.getNext = function (index) {
        var deferred = $q.defer(),
            events = [],
            i = index;
        dataService.getEvents().then(function(data){
          for (i; i < data.length; i = i + 1) {
            if(i == index+5){
          break;
        }

          data[i].thumb = 'http://lorempixel.com/200/200/sports/?' + ((new Date()).getTime() + i);
          events.push(dataService.events[i]);
        }
        deferred.resolve(events);
        return deferred.promise;
        })
      };

      this.getOne = function (id) {
        var deferred = $q.defer(),
            event,
            i = 0;

        for (i; i < dataService.events.length; i = i + 1) {
          if (dataService.events[i].id.toString() === id.toString()) {
            event = angular.copy(dataService.events[i]);
            event.image = 'http://lorempixel.com/620/480/sports/?' + ((new Date()).getTime() + i);
            break;
          }
        }

        $timeout(function () {
          if (event) {
            deferred.resolve(event);
          } else {
            deferred.reject();
          }
        }, 1000);

        return deferred.promise;
      };
    }
  ])
  .service('dataService', [ '$http',
    function ($http, $q) { return {
      getEvents: function(){
      return $http.get('/events/all').then(function(resp){
        if(typeof resp.data === 'object'){
          this.events = resp.data;
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


