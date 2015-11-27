PsychicSource.controller('PreferencesCtrl',function($scope,AuthService, PreferencesService, preferences){
  console.log(AuthService.id());
 $scope.preferences = preferences;
 console.log(preferences);
});
