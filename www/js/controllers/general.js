
starter.controller('GeneralCtrl',function($scope,$ionicPlatform,$rootScope){
  $scope.showPrivacy = true;
  $rootScope.$on('$ionicView.beforeEnter',function(event,view){
    if(view.stateName == 'member-home' || view.stateName == 'preferences'){
      $scope.showPrivacy = false;
    } else {
      $scope.showPrivacy = true;
    }
  });

});

