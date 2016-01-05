
PsychicSource.controller('WelcomeCtrl',function($scope,$rootScope,$state,$ionicLoading,$ionicPopup,AuthService, SummaryService){
  $rootScope.showFooter = false;
  $scope.data = {};

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

  $scope.init = function(){
    var logoElem = document.getElementById('pslogo');
    logoElem.addEventListener('load',function(){
      var logo = svgPanZoom('#pslogo');
      logo.resize();
      logo.fit();
      logo.center();
    },false)
  };

  $scope.init();
});
