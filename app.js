'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ngRoute',
  'myApp.version',
  'ui.router'
]).

config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/index');
  
  $stateProvider
  
    .state('index',{
      url: "/index",
      views: {
            '': {templateUrl:"pages/index.html"},
            'nav@index': {templateUrl: 'pages_components/nav.html'},
            'main@index': {templateUrl: 'pages_components/tables.html'}
        
            
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
      templateUrl:"pages/login.html"
    })


});