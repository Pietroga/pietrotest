
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
                     alert('Failed to create new object, error code: ' + error.message);
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

.controller('addCtrl', ['$scope', function($scope) {
        
    Parse.initialize("asdvt6Fgkapis3dncjZdf"); 
    Parse.serverURL = 'https://piegaserver.herokuapp.com/parse'
    
    console.log('addCtrl');
    
    $scope.addAxe = function(){
        console.log("Adding a new axe..:");
        var Axe = Parse.Object.extend("Axes");
        var axe = new Axe();
        
        axe.set("axeId", $scope.axeId);
        axe.set("state", $scope.axeState);
        axe.set("fzgNr", $scope.fzgNr);

        axe.save(null, {
          success: function(res) {
            alert('New object created with objectId: ' + res.id);
          },
          error: function(res, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Failed to create new object, error code: ' + error.message);
          }
        });
    }
    
}]);

