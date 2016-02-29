
PsychicSource.controller('WelcomeCtrl',function($scope,$rootScope,$state,$ionicLoading,$ionicPopup,AuthService, SummaryService){
  $rootScope.showFooter = false;
  $scope.data = {};
  $scope.data.rememberMe = AuthService.getRememberMe();

  $scope.changeRememberMe = function(){
    AuthService.setRememberMe($scope.data.rememberMe);
  };

  $scope.login = function(data) {
    $ionicLoading.show({template: 'Verifying Credentials...'});
    AuthService.login(data).then(function(authenticated){
      $scope.data = {};
      $state.go('app.member-home'); 
    },function(err){
      $ionicLoading.hide();
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    });
  };
});
