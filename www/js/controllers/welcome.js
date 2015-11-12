
PsychicSource.controller('WelcomeCtrl',function($scope,$rootScope,$state,$ionicLoading,$ionicPopup,AuthService, SummaryService){
  $rootScope.showFooter = false;
  $scope.data = {};

  $scope.login = function(data) {
    $ionicLoading.show({template: 'Verifying Credentials...'});
    AuthService.login(data).then(function(authenticated){
      $scope.data = {};
      SummaryService.getSummary().then(function(summaryMsg){
        $ionicLoading.hide();
        $state.go('app.member-home'); 
      }, function(err2){
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: 'Error while retrieving account information'
        });  
      });
    },function(err){
      $ionicLoading.hide();
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    });
  };
});
