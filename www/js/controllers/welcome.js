PsychicSource.controller('WelcomeCtrl',function($scope,$rootScope,$state,$q,$ionicLoading,Popup,AuthService, SummaryService, AjaxService, CommonService, $localstorage){
  $rootScope.showFooter = false;
  $scope.data = {};
  $scope.callNowNumber = CommonService.callNowNumber();
  $scope.data.rememberMe = AuthService.getRememberMe();

  $scope.changeRememberMe = function(){
    AuthService.setRememberMe($scope.data.rememberMe);
  };

  $scope.login = function(data) {
    $ionicLoading.show({template: 'Verifying Credentials...'});
    AuthService.login(data).then(function(platformId){
      if(platformId) {
        var promise = $scope.sendNotificationId();
        if(promise){
          promise.then(function(res){
            AuthService.updateCredentials({registrationIdSent: true});
            $localstorage.set('platformId-' + AuthService.id(),platformId);
            $scope.data = {};
            $state.go('app.member-home');
          });
        } else {
          $scope.data = {};
          $state.go('app.member-home');
        }
      } else {
        $scope.data = {};
        $state.go('app.member-home');
      }
    },function(err){
      $ionicLoading.hide();
      Popup.show('alert', {
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    });
  };

  $scope.sendNotificationId = function() {
    $ionicLoading.show({template: 'Updating device credentials...'});
    d = $q.defer();
    var data = AuthService.getCredentials();
    if(data.registrationIdSent){
      return false;
    } else {
      AjaxService.sendNotificationId(data).then(function(res){
        $ionicLoading.hide();
        d.resolve(res);
      },function(err){
        $ionicLoading.hide();
        if(err.status === 401){
          $rootScope.$broadcast('user:logout:complete');
        } else {
          Popup.show('alert', {
            title: 'Error',
            template: '(2) Error while updating device information'
          });
          d.reject(err);
        }
      });
    }
    return d.promise;
  };

  $scope.init = function(){
    var logoElem = document.getElementById('pslogo');
    logoElem.addEventListener('load',function(){
      var logo = svgPanZoom('#pslogo',{
        panEnabled: false,
        zoomEnabled: false,
        dblClickZoomEnabled: false,
        mouseWheelZoomEnabled: false
      });
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
