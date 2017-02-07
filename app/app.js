'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ngRoute',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

  $routeProvider
  
    .when("/login", {
        templateUrl : "pages/login.html",
        controller: "logCtrl",
    })
    
    .when("/index", {
        templateUrl : "pages/index.html"
    })


  $routeProvider.otherwise({redirectTo: '/index'});
}]);
