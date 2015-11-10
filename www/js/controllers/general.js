PsychicSource.controller('GeneralCtrl',function($scope,$rootScope,$window,$ionicLoading,$ionicHistory,$state,$ionicPlatform,$ionicPopup,$rootScope,AuthService,AUTH_EVENTS){

  $rootScope.showFooter = false;
  $scope.membershipId = AuthService.id;

  $scope.logout = function(){
    AuthService.logout();
  };

  $scope.$on('user:logout',function(event){
    $ionicLoading.hide();
    $rootScope.showFooter = false;
    $state.go('app.welcome');
  });

  $scope.isLoggedIn = function(){
    return AuthService.isAuthenticated();
  };

  $scope.$on('$ionicView.beforeEnter',function(event,view){
    event.stopPropagation();
    hash = $window.location.hash;
    var stateObj = {};
    if(hash && hash.length > 0){
      var stateNameArr = hash.split("/");
      var stateNameRaw = stateNameArr[stateNameArr.length - 1];
      var stateName = stateNameRaw.replace('_','-');
      stateObj = $state.get('app.' + stateName);
    }
    if($state.current && 'data' in $state.current && 'authorizedRoles' in $state.current.data){
      var authorizedRoles = $state.current.data.authorizedRoles;
      if(!AuthService.isAuthorized(authorizedRoles)){
        event.preventDefault();
        if('data' in stateObj){
          $rootScope.showFooter = stateObj.data.showFooter;
        }
        $state.go(stateObj,{},{reload: true});
        $scope.notAuthorized();
      } else {
        if('data' in $state.current){
          $rootScope.showFooter = $state.current.data.showFooter;
        }
      }
    }

    if(!AuthService.isAuthenticated()){
      if($state && $state.current.data &&  'authorizeRoles' in  $state.current.data && $state.current.data.authorizedRoles.indexOf('public_role') == -1){
        event.preventDefault();
        $state.go('app.welcome');
      }
    }

  });

  $scope.$on('$stateChangeStart',function(event,next,nextParams,fromState){
  });
   
  $scope.notAuthorized = function(){
    var alertPopup = $ionicPopup.alert({
      title: 'Unauthorized!',
      template: 'You are not allowed to access this resource.'
    });
  };

  $scope.notAuthenticated = function(){
    AuthService.logout();
    $state.go('app.welcome');
    var alertPopup = $ionicPopup.alert({
      title: 'Session Lost!',
      template: 'Sorry, You have to login again.'
    });
  };

});

