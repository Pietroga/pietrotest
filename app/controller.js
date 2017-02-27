
myApp.controller('logCtrl', ['$scope',  function($scope, ParseService) {
    console.log('logCtrl');
    
    $scope.logIn = function() {
            console.log("Logging in...");
             Parse.User.logIn($scope.username, $scope.password, {
                  success: function(user) {
                      console.log("welcome")
                  },
                  error: function(user, error) {
                    // The login failed. Check error to see why.
                     alert('Failed: ' + error.message);
             }
            });
    }
    
    $scope.logOut= function() {
        console.log("logging out..")
           Parse.User.logOut({
          success: function() {
            console.log("user logged out");
          }
        });
}
    
}])

.controller('addCtrl', ['$scope', 'growl','$state',  function($scope, growl, $state, ParseService) {
    console.log('addCtrl');
    
    $scope.addAxe = function(){
        console.log("Adding a new axe.." + $scope.axeState);
        var Axe = Parse.Object.extend("Axes");
        var axe = new Axe();
        
        axe.set("axeNr", $scope.axeNr);
        axe.set("state", $scope.axeState);
        axe.set("fzgNr", $scope.fzgNr);
        axe.set("comment",$scope.comment);
        axe.set("dg",$scope.dgNr);
        axe.set("createdBy",Parse.User.current());
        
        var fileUploadControl = $("#profilePhotoFileUpload")[0];
        if (fileUploadControl.files.length > 0) {
          var file = fileUploadControl.files[0];
          var name = "photo.jpg";
        
          var parseFile = new Parse.File(name, file);
          parseFile.save()
          
          axe.set("img",parseFile);
          }
          
          var myACL = new Parse.ACL(Parse.User.current());
        myACL.setPublicReadAccess(true);
                growl.addSuccessMessage("res.id wurde gespeichert!");
        axe.setACL(myACL);
        axe.save(null, {
          success: function(res) {
            growl.addSuccessMessage("res.id wurde gespeichert!");
            console.log('New object created with objectId: ' + res.id);
          },
          error: function(res, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            console.log('Failed to create new object, error code: ' + error.message);
          }
        });
                    

        }
}])

.controller('tablesCtrl', ['$scope', '$state', function($scope, $state, ParseService, Authorization) {

    console.log('tablesCtrl');
    var res = [];
    $scope.resultData= []
        var Axes = Parse.Object.extend("Axes");
        var query = new Parse.Query(Axes);
        query.limit(10);
        query.find({
          success: function(result) {
              console.log("results: " + result.length)
              
                    for (var i = 0; i < result.length; i++) {
                        var u = result[i].get("createdBy");
                        var data = {
                            id: result[i].id,
                            axeNr: result[i].get("axeNr"),
                            fzgNr: result[i].get("fzgNr"),
                            state: result[i].get("state"),
                            createdAt: result[i].get("createdAt"),
                            createdBy: u,
                            
                        };
                        res.push(data);
                        $scope.resultData = res;
                    }
               $scope.$apply()
          },
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
        })


}])

.controller('myTablesCtrl', ['$scope','Authorization', function($scope,  Authorization) {

    console.log('tablesCtrl');
    var res = [];
    $scope.resultData= []
        var Axes = Parse.Object.extend("Axes");
        var query = new Parse.Query(Axes);
        query.limit(10);
        query.find({
          success: function(result) {
                    for (var i = 0; i < result.length; i++) {
                        var u = result[i].get("createdBy");
                        var data = {
                            id: result[i].id,
                            axeNr: result[i].get("axeNr"),
                            fzgNr: result[i].get("fzgNr"),
                            state: result[i].get("state"),
                            createdAt: result[i].get("createdAt"),
                            createdBy: u,
                            
                        };
                        res.push(data);
                        $scope.resultData = res;
                    }
               $scope.$apply()
          },
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
        })
        console.log("ciao")
        $scope.fromFactory = Authorization.sayHello("World");
        console.log("ciao" + $scope.fromFactory)


}])

.controller('infoCtrl', ['$scope','$http', function($scope, $http) {

    console.log('infoCtrl');

 
        var myArray = [];
        
        $http.get("axes.json")
        .then(function(response) {
        $scope.myWelcome = response.data;
        myArray = response.data
        console.log($scope.myWelcome)
        
            /* for (i = 0; i < myArray.length; i++) { 
                console.log(myArray[i].Axe)
                var Axes = Parse.Object.extend("AxesNr");
                var newAxes = new Axes();
                newAxes.set("axeNr",myArray[i].Axe);
                newAxes.save(null, {
                      success: function(res) {
                        alert('New object created with objectId: ' + res.id);
                      },
                      error: function(res, error) {
                        alert('Failed to create new object, with error code: ' + error.message);
                      }
                    });
            }*/

    });
    


}])

.controller('editCtrl', ['$scope', 'growl','$state','$http',  function($scope, growl, $state, $http) {
        
    console.log('editCtrl');
    
    $scope.update = function(){
    console.log("updating..." + $scope.objId);
    var Axe = Parse.Object.extend("Axes");
    var query = new Parse.Query(Axe);
    query.equalTo("objectId", $scope.objId);
    query.get($scope.objId, {
      success: function(object) {
         object.set("axeNr", $scope.axeNr);
         object.set("fzgNr", $scope.fzgNr);
         object.set("dg", $scope.dg);
         object.set("comment", $scope.comment);
         object.save(null, {
              success: function(gameScore) {
                  console.log("updated!");
              }
            });
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
    }
    
    $scope.cancel = function(){
        $state.reload()
    }
  
}])

.controller('autocompCtrl', ['$scope','$http', function($scope, $http) {

    console.log('autocompCtrl');

         $scope.movies = ["Lord of the Rings",
                                "Drive",
                                "Science of Sleep",
                                "Back to the Future",
                                "Oldboy"];
        
                // gives another movie array on change
                $scope.updateMovies = function(typed){
                    $scope.newmovies = MovieRetriever.getmovies(typed);
                    $scope.newmovies.then(function(data){
                      $scope.movies = data;
                    });
                }


}])

