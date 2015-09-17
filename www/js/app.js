/**
 * Author: hollyschinsky
 * twitter: @devgirfl
 * blog: devgirl.org
 * more tutorials: hollyschinsky.github.io
 */
var starter = angular.module('starter', ['ionic', 'ngCordova', 'starter.services'])
//.run(function(PushProcessingService) {
   //run once for the app
   //PushProcessingService.initialize();
//});
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('welcome', {
    url: '/welcome',
    templateUrl: 'welcome.html'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'login.html'
  });
  $urlRouterProvider.otherwise('/welcome');
})



