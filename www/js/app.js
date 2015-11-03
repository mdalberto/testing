/**
 * Author: hollyschinsky
 * twitter: @devgirfl
 * blog: devgirl.org
 * more tutorials: hollyschinsky.github.io
 */

var PsychicSource = angular.module('PsychicSource', ['ionic','ionic.utils','ngCordova','PsychicSource.Authentication'])
//.run(function(PushProcessingService) {
//run once for the app
//PushProcessingService.initialize();
//}
.run(function($rootScope, $state, AuthService,AUTH_EVENTS){
  $rootScope.$on('$stateChangeStart',function(event,next,nextParams,fromState){
    if('data' in next && 'authorizedRoles' in next.data){
      var authorizedRoles = next.data.authorizedRoles;
      if(!AuthService.isAuthorized(authorizedRoles)){
        event.preventDefault();
        $state.go($state.current,{},{reload: true});
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
      }
    }

    if(!AuthService.isAuthenticated()){
      if(next.name !== 'welcome'){
        event.preventDefault();
        $state.go('welcome');
      }
    }
  });
})
.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})
.constant('USER_ROLES',{
  member: 'member_role'
})
.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized
      }[response.status], response);
      return $q.reject(response);
    }
  };
})
.config(function($stateProvider, $urlRouterProvider, USER_ROLES,$httpProvider) {
  $httpProvider.defaults.withCredentials = true;
  $httpProvider.interceptors.push('AuthInterceptor');
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


