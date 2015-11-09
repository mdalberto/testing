
PsychicSource.controller('WelcomeCtrl',function($scope,$state,$ionicPopup,AuthService){
  $scope.data = {};

  $scope.login = function(data) {
    AuthService.login(data).then(function(authenticated){
      $state.go('app.member-home',{},{reload: true});
    },function(err){
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    });
  };
});
