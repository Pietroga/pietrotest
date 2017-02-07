'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  
  $routeProvider
  
    .when("/login", {
        templateUrl : "pages/login.html"
    })
    .when("/index", {
        templateUrl : "pages/index.html"
    })


  $routeProvider.otherwise({redirectTo: '/index'});
}]);
