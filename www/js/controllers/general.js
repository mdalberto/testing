
starter.controller('GeneralCtrl',function($scope,$ionicPlatform,$rootScope){
  $scope.showPrivacy = true;
  $rootScope.$on('$ionicView.beforeEnter',function(event,view){
    console.log(view.stateName);
    if(view.stateName == 'member-home'){
      $scope.showPrivacy = false;
    }
  });

});

