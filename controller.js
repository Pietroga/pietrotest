
myApp.controller('logCtrl', ['$scope', function($scope) {
    console.log('logCtrl');
    
}])

.controller('addCtrl', ['$scope', function($scope) {
        
    Parse.initialize("asdvt6Fgkapis3dncjZdf"); 
    Parse.serverURL = 'https://piegaserver.herokuapp.com//parse'
    
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
            alert('Failed to create new object, with error code: ' + error.message);
          }
        });
    }
    
}]);

