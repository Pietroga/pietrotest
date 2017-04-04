'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ngRoute',
  'myApp.version',
  'ui.router',
  'angular-growl',
  'ui.bootstrap',
  'autocomplete'
]).

config(function($stateProvider, $urlRouterProvider, growlProvider) {
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
      },
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
                controller: 'editCtrl',
            }
      },
      
    })
    
    .state('test',{
      url: "/test",
      views: {
            '': {templateUrl:"pages/index.html"},
            'nav@test': {templateUrl: 'pages_components/nav.html'},
            'main@test': {
                templateUrl: 'pages_components/add.html',
                controller: 'autocompCtrl'
            }
      }
    })
    
    
    growlProvider.globalTimeToLive(5000);
    

})

.run( ['$rootScope','$location','Auth',  function($rootScope, $location, Auth) {
    Parse.initialize("asdegFAsrz54h"); 
    Parse.serverURL = 'https://pietroserver.herokuapp.com/parse'
    
   
    $rootScope.$on( '$stateChangeStart', function(event, toState, fromState) {
         $rootScope.currentUser = Parse.User.current();
   if ( $rootScope.currentUser != null){
       $rootScope.user = {
       username: Parse.User.current().get("username"),
       id: Parse.User.current().id,
       organisation: Parse.User.current().get("organisation"),
        }
   }
        if(!Auth.logged()){
            $location.path('/login')
        }
    });
   
  }])
  
myApp.config(['growlProvider', function(growlProvider) {
  growlProvider.globalTimeToLive({success: 1000, error: 2000, warning: 3000, info: 4000});
}]);




 
  
  




