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


