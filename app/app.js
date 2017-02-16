'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ngRoute',
  'myApp.version',
  'ui.router',
  'angular-growl'
]).

config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/index');
  
  $stateProvider
  
    .state('index',{
      url: "/index",
      views: {
            '': {templateUrl:"pages/index.html"},
            'nav@index': {templateUrl: 'pages_components/nav.html'},
            'main@index': {
                templateUrl: 'pages_components/tables.html',
                controller: 'tablesCtrl'
            }

      }
    })
    
    .state('addAxes',{
      url: "/addAxes",
      views: {
            '': {templateUrl:"pages/index.html"},
            'nav@addAxes': {templateUrl: 'pages_components/nav.html'},
            'main@addAxes': {
                templateUrl: 'pages_components/add.html',
                controller: 'addCtrl'
            }
      }
    })
    
    
     .state('login',{
      url: "/login",
      templateUrl:"pages/login.html",
      controller: "logCtrl",
    })
    
     .state('infoAxe',{
      url: "/infoAxe/?itemId",
          
      views: {
            '': {templateUrl:"pages/index.html"},
            'nav@infoAxe': {templateUrl: 'pages_components/nav.html'},
            'main@infoAxe': {
                templateUrl: 'pages_components/edit.html',
                params: { itemId: "ciao", },
                controller: function($stateParams, $scope){
                        console.log($stateParams.itemId);
                        $scope.myParam = $stateParams.itemId;
                        var Axes = Parse.Object.extend("Axes");
                        var query = new Parse.Query(Axes);
        
                        query.get($scope.myParam, {
                          success: function(object) {
                            
                            $scope.objId = object.id;
                            $scope.axeNr = object.get("axeNr");
                            console.log(object.get("axeNr"))
                            $scope.$apply()
                          },
                          error: function(object, error) {
                              console.log('Failed to create new object, with error code: ' + error.message);
                          }
                        })
                    }
            }
      },
      
      
    })
    



})

.run(function($rootScope, $state) {
    Parse.initialize("asdegFAsrz54h"); 
    Parse.serverURL = 'https://pietroserver.herokuapp.com/parse'
   $rootScope.currentUser = Parse.User.current();
   if ( Parse.User.current() != null){
       $rootScope.user = {
       username: Parse.User.current().get("username"),
       id: Parse.User.current().id,
       organisation: Parse.User.current().get("organisation"),
        }
   }
  })


