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

  $urlRouterProvider.otherwise('/app/welcome');
})


