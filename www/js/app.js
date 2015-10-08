/**
 * Author: hollyschinsky
 * twitter: @devgirfl
 * blog: devgirl.org
 * more tutorials: hollyschinsky.github.io
 */

var starter = angular.module('starter', ['ionic','ngCordova','starter.services'])
//.run(function(PushProcessingService) {
  //run once for the app
  //PushProcessingService.initialize();
//});
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('welcome', {
    url: '/welcome',
    templateUrl: 'views/welcome.html',
    controller: 'WelcomeCtrl' 
  })
  .state('become-member',{
    url: '/become_member',
    templateUrl: 'views/become_member.html',
    controller: 'BecomeMemberCtrl'
  })
  .state('member-home',{
    url: '/member_home',
    templateUrl: 'views/member_home.html',
    //controller: 'MemberHomeCtrl'
  })
  .state('preferences',{
    url: '/preferences',
    templateUrl: 'views/preferences.html'
  });

  $urlRouterProvider.otherwise('/welcome');
})


