PsychicSource.controller('GeneralCtrl',function($scope,$rootScope,$window,$ionicLoading,$ionicHistory,$state,$ionicPlatform,$ionicPopup,$rootScope,AuthService,AUTH_EVENTS){

  $scope.membershipId = AuthService.id;

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
    event.stopPropagation();
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

});

