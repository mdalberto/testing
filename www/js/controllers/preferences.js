PsychicSource.controller('PreferencesCtrl',function($scope, $ionicLoading, $ionicPopup, AuthService, PreferencesService, preferences,AjaxService){
 $scope.preferences = preferences;
 
 $scope.preferenceUpdated = function($index){
  $ionicLoading.show({template: 'Updating Setting...'});
  AjaxService.savePreferences(AuthService.id(),$scope.preferences).then(function(res){
    $ionicLoading.hide();
  },function(err){
    $ionicLoading.hide();
    var alertPopup = $ionicPopup.alert({
      title: 'Update operation failed!',
      template: 'Please verify you are connected to the internet'
    });
  });
 };
});
