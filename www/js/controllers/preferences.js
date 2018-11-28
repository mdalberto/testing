PsychicSource.controller('PreferencesCtrl',function($scope, $ionicLoading, AuthService, PreferencesService, preferences, AjaxService, Popup){
 $scope.preferences = preferences;

 $scope.preferenceUpdated = function($index){
  $ionicLoading.show({template: 'Updating Setting...'});
  AjaxService.savePreferences(AuthService.id(),$scope.preferences).then(function(res){
    PreferencesService.getPreferences().then(function(preferences){
      $ionicLoading.hide();
      $scope.preferences = preferences;
    }, function(err2){
      $ionicLoading.hide();
      Popup.show('alert', {
        title: 'Update operation failed! (2)',
        template: 'Please verify you are connected to the internet'
      });
    });
  },function(err){
    $ionicLoading.hide();
    Popup.show('alert', {
      title: 'Update operation failed!',
      template: 'Please verify you are connected to the internet'
    });
  });
 };
});