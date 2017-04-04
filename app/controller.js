
myApp.controller('logCtrl', ['$scope','$state','growl',  function( $scope, $state, growl,  ParseService) {
    console.log('logCtrl');
    
    $scope.logIn = function(e) {
            console.log("Logging in..." + $scope.username);
            
            if($scope.username == undefined || $scope.password == undefined){
                growl.info("Username und/oder Password fehlen");
            }
            
             Parse.User.logIn($scope.username, $scope.password, {
                  success: function(user) {
                      console.log("welcome")
                      $state.go('index')
                  },
                  error: function(user, error) {
                 growl.error("username und/oder Password falsch");
                      
             }})
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

.controller('addCtrl', ['$scope', 'growl','$state','$http', 'AxesService',  function($scope, growl, $state, $http, AxesService) {
    console.log('addCtrl');
    
    $scope.addAxe = function(){
        console.log("Adding a new axe.." + $scope.axeNr.id);
        var Axe = Parse.Object.extend("Axes");
        var axe = new Axe();
        
        axe.set("axeNr", $scope.axeNr.axeNr);
        axe.set("linkedAxe", {"__type":"Pointer","className":"AxesNr","objectId":$scope.axeNr.id})
        axe.set("state", $scope.axeState);
        axe.set("fzgNr", $scope.fzgNr);
        axe.set("wgNr", $scope.wgNr);
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
        axe.setACL(myACL);
        axe.save(null, {
          success: function(res) {
              
            growl.addSuccessMessage("Wurde gespeichert!");
            console.log('New object created with objectId: ' + res.id);
          },
          error: function(res, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            console.log('Failed to create new object, error code: ' + error.message);
          }
        });
                    

        }
        
     /*$http.get("axes.json")
        .then(function(response) {
        myData = response.data;
        }).then(function(){
            var list = [];
            for (i = 0; i < 5; i++) {
                list.push(myData[i].Number.toString());
            }
            
            $scope.axes = list
            $scope.axesList= list
        });*/
        
        $scope.axesList= ["0","1","3"]
        
        AxesService.numbers().then(function(result){
            $scope.axes = result
            console.log($scope.axes[0])
        })
        
        
        
        
}])

.controller('tablesCtrl', ['$scope', '$state', function($scope, $state, ParseService) {

    console.log('tablesCtrl');
        console.log("user " + Parse.User.current())
    var res = [];
    $scope.resultData= []
        var Axes = Parse.Object.extend("Axes");
        var query = new Parse.Query(Axes);
        query.limit(10);
        query.descending("createdAt");
        query.find({
          success: function(result) {

                    for (var i = 0; i < result.length; i++) {
                        var u = result[i].get("createdBy");
                        var data = {
                            id: result[i].id,
                            axeNr: result[i].get("axeNr"),
                            fzgNr: result[i].get("fzgNr"),
                            wgNr: result[i].get("wgNr"),
                            state: result[i].get("state"),
                            test: result[i].get("utTest"),
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

.controller('myTablesCtrl', ['$scope', function($scope) {

    console.log('tablesCtrl');
    
    var res = [];
    $scope.resultData= []
        var Axes = Parse.Object.extend("Axes");
        var query = new Parse.Query(Axes);
        query.include("User")
        query.descending("createdAt");
        query.limit(10);
        query.find({
          success: function(result) {
                    for (var i = 0; i < result.length; i++) {
                        var u = result[i].get("createdBy");
                        var data = {
                            id: result[i].id,
                            axeNr: result[i].get("axeNr"),
                            fzgNr: result[i].get("fzgNr"),
                            wgNr: result[i].get("wgNr"),
                            state: result[i].get("state"),
                            test: result[i].get("utTest"),
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

.controller('infoCtrl', ['$scope','$http', function($scope, $http) {

    console.log('infoCtrl');

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

}])

.controller('editCtrl', ['$scope','$state','$stateParams','growl',  function($scope, $state,$stateParams, growl) {
        
    console.log('editCtrl: ' +  $stateParams.itemId);
    
    $scope.myParam = $stateParams.itemId;
    var Axes = Parse.Object.extend("Axes");
    var query = new Parse.Query(Axes);
    query.get($scope.myParam, {
      success: function(object) {
        $scope.objId = object.id;
        $scope.axeNr = object.get("axeNr");
        $scope.axeState = object.get("state");
        $scope.test = object.get("utTest");
        $scope.fzgNr = object.get("fzgNr");
        $scope.wgNr = object.get("wgNr");
        $scope.comment = object.get("comment");
        var imagine = object.get("img");
        if(imagine != null){
            $scope.imgUrl= imagine.url();
        }
            $scope.$apply()

      },
      error: function(object, error) {
          growl.danger("Error! " + error.message);
          console.log('Failed to retrive the object, with error code: ' + error.message);
      }
    })

    $scope.update = function(){
    console.log("updating..." + $scope.objId);
    var Axe = Parse.Object.extend("Axes");
    var query = new Parse.Query(Axe);
    query.equalTo("objectId", $scope.objId);
    query.get($scope.objId, {
      success: function(object) {
         object.set("axeNr", $scope.axeNr);
         object.set("fzgNr", $scope.fzgNr);
         object.set("wgNr", $scope.wgNr);
         object.set("state", $scope.axeState);
         object.set("utTest", $scope.test);
         object.set("dg", $scope.dg);
         object.set("comment", $scope.comment);
         object.save(null, {
              success: function() {
                growl.success("Es wurde gespeichert!");
                $scope.edit= false;
              },
              error: function(object, error) {
                 growl.danger("Error! " + error.message);
                 
                $state.reload()
              }
            });
      },
      error: function(error) {
        growl.addWarnMessage("Error: Sie dürfen nicht diese Daten ändern");
      }
    });
    }
    
    $scope.cancel = function(){
        $state.reload()
    }
  
}])

myApp.controller('autocompCtrl',['$scope','$http','AxesService', function($scope, $http, AxesService){
   /* $http.get("axes.json")
        .then(function(response) {
        myData = response.data;
         console.log(myData.length);
        }).then(function(){
            var list = [];
            for (i = 0; i < 10; i++) {
                var nr = myData[i].Number.toString();
                var typ = myData[i].Typ.toString();
                var Axe = Parse.Object.extend("AxesNr");
                var axe = new Axe();
                axe.set("axeNr", nr );
                axe.set("type", typ );
                axe.save(null, {
                          error: function(gameScore, error) {
                            alert('Failed to create new object, with error code: ' + error.message);
                          }
                        });
            }
        })*/
        
        
        AxesService.numbers().then( function(result){
            $scope.ciao = result
            console.log($scope.ciao)
        })
        
        
        $http.get("fzgnumber.json")
        .then(function(response) {
        myData = response.data;
        }).then(function(){
            var list = [];
            for (i = 0; i < 5; i++) {
                list.push(myData[i].Number.toString());
            }
            
            $scope.fzgList = list
        });
        
            
    }]);
