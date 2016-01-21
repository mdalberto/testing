
PsychicSource.controller('WelcomeCtrl',function($scope,$rootScope,$state,$ionicLoading,$ionicPopup,AuthService, SummaryService){
  $rootScope.showFooter = false;
  $scope.data = {};
  $scope.rememberMe = true;
  $scope.callNowNumber = ionic.Platform.isAndroid() ? "8669040177" : "8668842981";
  
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

  $scope.callNow = function(){
    window.open('tel:' + $scope.callNowNumber, '_system', 'location=yes');
    return false;
  };
  

  $scope.init();
});
