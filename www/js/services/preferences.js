angular.module('PsychicSource.Preferences', [])
.factory('PreferencesService',function($q,$state,$rootScope,$timeout,$ionicPopup,$ionicLoading,$ionicHistory,$localstorage,USER_ROLES, AuthService,AjaxService){
  var preferences = {
    prefixKey: 'preferences-',
    settings: null,
    storeUserPreferences: function(userData){
      $localstorage.setObject(preferences.prefixKey + AuthService.id(),userData);
      preferences.loadUserPreferences();
    },
    loadUserPreferences: function(){
      var info_preferences = $localstorage.getObject(preferences.prefixKey + AuthService.id());
      preferences.settings = info_preferences;
    },
    getPreferences: function() {
      $ionicLoading.show({template: 'Loading...'});
      d = $q.defer();
      AjaxService.getPreferences(AuthService.id()).then(function(res){
        preferences.storeUserPreferences(res.data);
        $ionicLoading.hide();
        d.resolve(preferences.settings);
      },function(err){                                           
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: 'Error while retrieving account information'
        });  
        d.reject(err);                             
      });
      return d.promise;
    }
  };
  preferences.loadUserPreferences();
  var result = {
    preferences: preferences.settings,
    getPreferences: preferences.getPreferences
  };
  return result;
});
