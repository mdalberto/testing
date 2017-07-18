PsychicSource.controller('GeneralCtrl',function($scope,$rootScope,$window,$ionicLoading,$ionicHistory,$state,$ionicPlatform,$rootScope,AuthService,AUTH_EVENTS,$ionicPlatform,$timeout,$ionicSideMenuDelegate,Popup,GTM){
  $scope.membershipId = AuthService.id();

  $scope.logout = function(){
    AuthService.logout();
  };

  $scope.$on('user:logout:complete',function(){
    $scope.logout();
  });

  $scope.$on('user:logout',function(event){
    $ionicLoading.hide();
    $rootScope.showFooter = false;
    $state.go('app.welcome');
  });

  $scope.isLoggedIn = function(){
    return AuthService.isAuthenticated();
  };

  $rootScope.$on('$stateChangeSuccess', function(){
    if($ionicSideMenuDelegate.isOpen()){
      $ionicSideMenuDelegate.toggleLeft();
    }
  });

  $scope.$on('$ionicView.beforeEnter',function(event,view){
    if(view.stateName === 'app.privacy-policy' && $scope.isLoggedIn()){
      $rootScope.showFooter = true;
    } else if(view.stateName === 'app.privacy-policy'){
      $rootScope.showFooter = false;
    }
    event.stopPropagation();
    if(ionic.Platform.isIOS()){
      $timeout(function(){
        $('.bar-header').each(function(i,elem){
          $(elem).find('.title').css('margin-top',0);
          $(elem).find('.buttons-left').css('margin-top',0);
        });
      });
    }
  });

  $scope.$on(AUTH_EVENTS.notAuthorized, function(event){
    Popup.show('alert', {
      title: 'Unauthorized!',
      template: 'You are not allowed to access this resource.'
    });
  });

  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event){
    AuthService.logout();
    $state.go('app.welcome');
    Popup.show('alert', {
      title: 'Session Lost!',
      template: 'Sorry, You have to login again.'
    });
  });

  $scope.init = function(){
    $scope.isAccount = function() { return $state.is('app.member-home'); };
    $scope.isReturnCall = function() { return $state.is('app.return-call'); };
    $scope.isAvailability = function() { return $state.is('app.availability'); };
    $scope.isFavs = function() { return $state.is('app.favs'); };
    $scope.isPreference = function() { return $state.is('app.preferences'); };
  };

  $scope.external = function($event){
    var title = 'You are about to leave the app and go to PsychicSource Website';
    var regex = /http(.*)psychicsource.com(.*)$/i;

    if($event.currentTarget.dataset.href.match(regex) === null){
      title = 'You are about to leave the PsychicSource App';
    }

    var confirmPopup = Popup.show('confirm', {
      title: title,
      template: 'Are you sure that you want to do this?'
    });

    confirmPopup.then(function(res){
      if(res){
        if(typeof($event.currentTarget.dataset.eventCategory) !== 'undefined'){
          var event_category = $event.currentTarget.dataset.eventCategory;
          var event_action = 'click';
          var event_label = $event.currentTarget.dataset.href;
          if($event.currentTarget.dataset.eventCategory === 'favorite advisors chat' ||
            $event.currentTarget.dataset.eventCategory === 'favorite advisors video'){
              event_label = event_label.split("?")[0];
            }

          //Only track links that were on the spec
          GTM.trackEvent(event_category, event_action, event_label, 1);
        }

        window.open($event.currentTarget.dataset.href,'_system','location=yes');
      }
    });
  };

  $scope.init();

});

