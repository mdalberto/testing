
var PsychicSource = angular.module('PsychicSource', ['internationalPhoneNumber','ionic','ionic.utils','ngCordova','PsychicSource.Authentication', 'PsychicSource.Summary', 'PsychicSource.Ajax'])
//.run(function(PushProcessingService) {
//run once for the app
//PushProcessingService.initialize();
//}
.run(function($rootScope, $state, AuthService,AUTH_EVENTS){
  $rootScope.$on('$stateChangeStart',function(event,next,nextParams,fromState){
    if ('data' in next && 'authorizedRoles' in next.data) {
      var authorizedRoles = next.data.authorizedRoles;
      if (!AuthService.isAuthorized(authorizedRoles)) {
        event.preventDefault();
        if('data' in next){
          $rootScope.showFooter = next.data.showFooter;
        }
        $state.go(next,{},{reload: true});
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
      } else {
        if('data' in next){
          $rootScope.showFooter = next.data.showFooter;
        }
      }
    }

    if (!AuthService.isAuthenticated()) {
      if (next.data && 'authorizedRoles' in next.data && next.data.authorizedRoles.indexOf('public_role') == -1) {
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
  member: 'member_role',
  public_role: 'public_role'
})
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.InAppBrowser) {
      window.open = cordova.InAppBrowser.open;
    }
    if(window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }

  });
})
.config(function($ionicConfigProvider, $stateProvider, $urlRouterProvider,USER_ROLES) {
  //$httpProvider.defaults.withCredentials = true;
  $ionicConfigProvider.navBar.alignTitle('center');
  //$ionicConfigProvider.views.maxCache(0);
  $stateProvider
  .state('app',{
    url: "/app",
    abstract: true,
    templateUrl: "views/menu.html",
    controller: 'GeneralCtrl',
  })
  .state('app.welcome', {
    url: '/welcome',
    views: {
      'menuContent':{
        templateUrl: 'views/welcome.html',
        controller: 'WelcomeCtrl'
      }
    },
    data: {
      showFooter: false
    }
  })
  .state('app.become-member',{
    url: '/become_member',
    views: {
      'menuContent':{
        templateUrl: 'views/become_member.html',
        controller: 'BecomeMemberCtrl'
      }
    },
    data: {
      authorizedRoles: [USER_ROLES.public_role],
      showFooter: false
    }
  })
  .state('app.member-home',{
    url: '/member_home',
    views: {
      'menuContent':{
        templateUrl: 'views/member_home.html',
        controller: 'MemberHomeCtrl'
      }
    },
    resolve: {
      summary: function(SummaryService){
        return SummaryService.getSummary();
      }
    },
    data: {
      authorizedRoles: [USER_ROLES.member],
      showFooter: true
    }
    //controller: 'MemberHomeCtrl'
  })
  .state('app.availability',{
    url: '/availability',
    views: {
      'menuContent':{
        templateUrl: 'views/availability.html'
        //controller: 'MemberHomeCtrl'
      }
    },
    //resolve: {
      //summary: function(SummaryService){
        //return SummaryService.getSummary();
      //}
    //},
    data: {
      authorizedRoles: [USER_ROLES.member],
      showFooter: true
    }
  })
  .state('app.preferences',{
    url: '/preferences',
    views: {
      'menuContent':{
        templateUrl: 'views/preferences.html'
      }
    },
    data: {
      authorizedRoles: [USER_ROLES.member],
      showFooter: true
    }
  });

  $urlRouterProvider.otherwise( function($injector, $location) {
    var $state = $injector.get("$state");
    var AuthService = $injector.get("AuthService");
    if(AuthService.isAuthenticated()){
      $state.go('app.member-home');
    } else {
      $state.go('app.welcome');
    }
  });
})


