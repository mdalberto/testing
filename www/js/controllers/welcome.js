
PsychicSource.controller('WelcomeCtrl',function($scope,$rootScope,$state,$q,$ionicLoading,$ionicPopup,AuthService, SummaryService, AjaxService, $localstorage){
  $rootScope.showFooter = false;
  $scope.data = {};

  $scope.login = function(data) {
    $ionicLoading.show({template: 'Verifying Credentials...'});
    AuthService.login(data).then(function(authenticated){
      $scope.sendNotificationId().then(function(res){; 
        $scope.data = {};
        $state.go('app.member-home'); 
      });
    },function(err){
      $ionicLoading.hide();
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    });
  };

  $scope.sendNotificationId = function() {
    $ionicLoading.show({template: 'Updating device credentials...'});
    d = $q.defer();
    var data = $localstorage.getObject(AuthService.sessionKey());
    AjaxService.sendNotificationId(data).then(function(res){
      $ionicLoading.hide();
      d.resolve(res);
    },function(err){                                           
      $ionicLoading.hide();
      if(err.status === 401){
        $rootScope.$broadcast('user:logout:complete');
      } else {
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: '(2) Error while updating device information'
        });  
        d.reject(err);   
      }
    });
    return d.promise;
  };

});
