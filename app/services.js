
myApp.service("Auth",['$state', function($state) { 
        this.logged = function() { 
            var auth;
            if ( Parse.User.current() != null){
                auth = true
            }else{
                auth = false;

            }
            return auth}; 
    }]);
    
    
    

myApp.service("AxesService",['$state','$q', function($state, $q) { 
        this.numbers = function() { 
            var result = [];
            var deferred = $q.defer();
            var Axes = Parse.Object.extend("AxesNr");
            var query = new Parse.Query(Axes);
            query.find().then(function(results) {
                         for (var i = 0; i < results.length; i++) {
                             var r = {
                                 axeNr: results[i].get('axeNr'),
                                 id: results[i].id
                             }
                             result.push(r)
                        }
                        
                     deferred.resolve(result);
                    });
                    
              return deferred.promise;       
            
        }; 
    }]);
    
    myApp.service("AxesService",['$state','$q', function($state, $q) { 
        this.numbers = function() { 
            var result = [];
            var deferred = $q.defer();
            var Axes = Parse.Object.extend("AxesNr");
            var query = new Parse.Query(Axes);
            query.find().then(function(results) {
                         for (var i = 0; i < results.length; i++) {
                             var r = {
                                 name: results[i].get('axeNr'),
                                 id: results[i].id
                             }
                             result.push(r)
                        }
                        
                     deferred.resolve(result);
                    });
                    
              return deferred.promise;       
            
        }; 
    }]);
    
    