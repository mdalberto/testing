
PsychicSource.controller('WelcomeCtrl',function($scope,$rootScope,$state,$ionicLoading,$ionicPopup,AuthService){
  $rootScope.showFooter = false;
  $scope.data = {};

  $scope.login = function(data) {
    $ionicLoading.show({template: 'Verifying Credentials'});
    AuthService.login(data).then(function(authenticated){
      $ionicLoading.hide();
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
