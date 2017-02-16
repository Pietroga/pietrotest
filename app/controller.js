
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

.controller('addCtrl', ['$scope', 'growl',  function($scope, growl, ParseService) {
        
    console.log('addCtrl');
    
    $scope.addAxe = function(){
        console.log("Adding a new axe..");
        var Axe = Parse.Object.extend("Axes");
        var axe = new Axe();
        
        axe.set("axeNr", $scope.axeNr);
        axe.set("state", $scope.axeState);
        axe.set("fzgNr", $scope.fzgNr);
        axe.set("comment",$scope.comment);
        axe.set("createdBy",Parse.User.current());
        
        var fileUploadControl = $("#profilePhotoFileUpload")[0];
        if (fileUploadControl.files.length > 0) {
          var file = fileUploadControl.files[0];
          var name = "photo.jpg";
        
          var parseFile = new Parse.File(name, file);
          parseFile.save()
          
          axe.set("img",parseFile);
          
          var myACL = new Parse.ACL(Parse.User.current());
        myACL.setPublicReadAccess(true);
        axe.setACL(myACL);
        axe.save(null, {
          success: function(res) {
            console.log('New object created with objectId: ' + res.id);
            growl.addWarnMessage("This adds a warn message");
          },
          error: function(res, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            console.log('Failed to create new object, error code: ' + error.message);
          }
        });
    };
    
        }
        
        
        
        
        
    
}])

.controller('tablesCtrl', ['$scope', function($scope, ParseService) {

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

.controller('myTablesCtrl', ['$scope', function($scope, ParseService) {

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

.controller('infoCtrl', ['$scope', function($scope, ParseService, $stateParams) {

    console.log('infoCtrl');

    console.log("id: " + this.$stateParams.myParam)
    
        var Axes = Parse.Object.extend("Axes");
        var query = new Parse.Query(Axes);
        
        /*query.get("xWMyZ4YEGZ", {
          success: function(gameScore) {
            // The object was retrieved successfully.
          },
          error: function(object, error) {
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
          }
        })*/


}]);

