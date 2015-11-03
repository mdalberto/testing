/**
 * Author: hollyschinsky
 * twitter: @devgirfl
 * blog: devgirl.org
 * more tutorials: hollyschinsky.github.io
 */

var PsychicSource = angular.module('PsychicSource', ['ionic','ngCordova','PsychicSource.Authentication'])
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
  });

  $urlRouterProvider.otherwise( function($injector, $location) {
    var $state = $injector.get("$state");
    $state.go("welcome");
  });
})


