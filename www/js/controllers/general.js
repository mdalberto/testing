
starter.controller('GeneralCtrl',function($scope,$ionicPlatform,$rootScope){
  $scope.showPrivacy = true;
  $rootScope.$on('$ionicView.beforeEnter',function(event,view){
    if(view.stateName == 'app.member-home' || view.stateName == 'app.preferences'){
      $scope.showPrivacy = false;
    } else {
      $scope.showPrivacy = true;
    }
  });

});

