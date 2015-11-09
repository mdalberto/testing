PsychicSource.controller('GeneralCtrl',function($scope,$state,$ionicPlatform,$ionicPopup,$rootScope,AuthService,AUTH_EVENTS){

  $scope.showPrivacy = true;
  $scope.membershipId = AuthService.id;
  $rootScope.$on('$ionicView.beforeEnter',function(event,view){
    if(view.stateName == 'app.member-home' || view.stateName == 'app.preferences'){
      $scope.showPrivacy = false;
    } else {
      $scope.showPrivacy = true;
    }
  });

  $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
    var alertPopup = $ionicPopup.alert({
      title: 'Unauthorized!',
      template: 'You are not allowed to access this resource.'
    });
  });

  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('login');
    var alertPopup = $ionicPopup.alert({
      title: 'Session Lost!',
      template: 'Sorry, You have to login again.'
    });
  });

});

