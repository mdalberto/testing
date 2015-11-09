/**
 * Author: hollyschinsky
 * twitter: @devgirfl
 * blog: devgirl.org
 * more tutorials: hollyschinsky.github.io
 */

var PsychicSource = angular.module('PsychicSource', ['ionic','ui.router','ionic.utils','ngCordova','PsychicSource.Authentication'])
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
      if(next.name !== 'app.welcome'){
        event.preventDefault();
        $state.go('app.welcome');
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
  //run once for the app
  //PushProcessingService.initialize();
})
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.InAppBrowser) {
      window.open = cordova.InAppBrowser.open;
    }
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }

  });
})
.config(function($ionicConfigProvider, $stateProvider, $urlRouterProvider) {
  $ionicConfigProvider.navBar.alignTitle('center');
  $stateProvider
  .state('app',{
    url: "/app",
    abstract: true,
    templateUrl: "views/menu.html",
    controller: 'GeneralCtrl'
  })
  .state('app.welcome', {
    url: '/welcome',
    views: {
      'menuContent':{
        templateUrl: 'views/welcome.html',
        controller: 'WelcomeCtrl' 
      }
    }
  })
  .state('app.become-member',{
    url: '/become_member',
    views: {
      'menuContent':{
        templateUrl: 'views/become_member.html',
        controller: 'BecomeMemberCtrl'
      }
    }
  })
  .state('app.member-home',{
    url: '/member_home',
    views: {
      'menuContent':{
        templateUrl: 'views/member_home.html',
      }
    }
    //controller: 'MemberHomeCtrl'
  })
  .state('app.preferences',{
    url: '/preferences',
    views: {
      'menuContent':{
        templateUrl: 'views/preferences.html'
      }
    }
  });

  $urlRouterProvider.otherwise( function($injector, $location) {
    var $state = $injector.get("$state");
    $state.go("app.welcome");
  });
})


