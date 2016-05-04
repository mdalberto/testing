PsychicSource.controller('GeneralCtrl',function($scope,$rootScope,$window,$ionicLoading,$ionicHistory,$state,$ionicPlatform,$ionicPopup,$rootScope,AuthService,AUTH_EVENTS,$ionicPlatform,$timeout){
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
    var alertPopup = $ionicPopup.alert({
      title: 'Unauthorized!',
      template: 'You are not allowed to access this resource.'
    });
  });

  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event){
    AuthService.logout();
    $state.go('app.welcome');
    var alertPopup = $ionicPopup.alert({
      title: 'Session Lost!',
      template: 'Sorry, You have to login again.'
    });
  });

  $scope.init = function(){
    $scope.isAccount = function() { return $state.is('app.member-home'); };
    $scope.isReturnCall = function() { return $state.is('app.return-call'); };
    $scope.isAvailability = function() { return $state.is('app.availability'); };
    $scope.isPreference = function() { return $state.is('app.preferences'); };
  };


  $scope.external = function($event){
      var confirmPopup = $ionicPopup.confirm({
        title: 'You are about to leave the app and go to PsychicSource Website',
        template: 'Are you sure that you want to do this?'
      });

      confirmPopup.then(function(res){
        if(res){
          var ref = window.open($event.currentTarget.dataset.href,'_system','location=yes');
        }
      }); 
    };

  $scope.init();

});

