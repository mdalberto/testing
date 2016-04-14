var PsychicSource = angular.module('PsychicSource', ['internationalPhoneNumber','ionic','ionic.utils','ngCordova','PsychicSource.Authentication', 'PsychicSource.Summary', 'PsychicSource.Ajax','PsychicSource.ReturnCalls','PsychicSource.Availability','PsychicSource.Preferences','PsychicSource.Push','ordinal','underscore','PsychicSource.Filters','PsychicSource.Config'])
.run(function($ionicPlatform,$ionicPopup,$cordovaSplashscreen,$rootScope, $state, AuthService,AUTH_EVENTS){
    setTimeout(function(){
    $cordovaSplashscreen.hide();
  },5000);
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
.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})
.constant('USER_ROLES',{
  member: 'member_role',
  public_role: 'public_role'
})
.config(function($ionicConfigProvider, $stateProvider, $urlRouterProvider,USER_ROLES) {
  $ionicConfigProvider.navBar.alignTitle('center');
  //$httpProvider.defaults.withCredentials = true;
  //$ionicConfigProvider.views.maxCache(0);
  $stateProvider
  .state('app',{
    url: "/app",
    abstract: true,
    templateUrl: "views/menu.html",
    controller: 'GeneralCtrl',
  })
  .state('app.privacy_policy', {
    url: '/privacy_policy',
    views: {
      'menuContent':{
        templateUrl: 'views/privacy_policy.html',
        controller: 'PrivacyCtrl'
      }
    },
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
    cache: false,
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
  })
  .state('app.availability',{
    cache: false,
    url: '/availability',
    views: {
      'menuContent':{
        templateUrl: 'views/availability.html',
        controller: 'AvailabilityCtrl'
      }
    },
    resolve: {
      availabilityObj: function(AvailabilityService){
        return AvailabilityService.getCountryCodesAndHours();
      }
    },
    data: {
      authorizedRoles: [USER_ROLES.member],
      showFooter: true
    }
  })
  .state('app.return-call',{
    cache: false,
    url: '/return_call',
    views: {
      'menuContent':{
        templateUrl: 'views/return_call.html',
        controller: 'ReturnCallCtrl'
      }
    },
    resolve: {
      calls: function(ReturnCallsService){
        return ReturnCallsService.getQueues();
      }
    },
    data: {
      authorizedRoles: [USER_ROLES.member],
      showFooter: true
    }
  })
  .state('app.preferences',{
    cache: false,
    url: '/preferences',
    views: {
      'menuContent':{
        templateUrl: 'views/preferences.html',
        controller: 'PreferencesCtrl'
      }
    },
    resolve: {
      preferences: function(PreferencesService){
        return PreferencesService.getPreferences();
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


