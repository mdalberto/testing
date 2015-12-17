angular.module('PsychicSource.Authentication', [])
.factory('AuthService',function($q,$state,$rootScope,$timeout,$ionicLoading,$ionicHistory,$http,$localstorage,USER_ROLES,AjaxService){
  var auth = {
    isAuthenticated: false,
    sessionKey: 'token',
    emailOrPhone: '',
    membershipId: null,
    token: null,
    role: USER_ROLES.public_role,
    loadUserCredentials: function(){
      var data = $localstorage.getObject(auth.sessionKey);
      var token = data.access_token;
      
      if(token) {
        auth.useCredentials(data);
      }
    },
    storeUserCredentials: function(userData){
      $localstorage.setObject(auth.sessionKey,userData);
      auth.useCredentials(userData);
    },
    updateCredentials: function(userData){
      var data = $localstorage.getObject(auth.sessionKey);
      $.extend(data,userData);
      $localstorage.setObject(auth.sessionKey,data);
      auth.useCredentials(data);
    },
    useCredentials: function(userData){
      auth.isAuthenticated = true;
      auth.token = userData.access_token;
      auth.membershipId = userData.membershipId;
      auth.role = USER_ROLES.member;
      // Set token as header for requests
      $http.defaults.headers.common['Authorization']  = "Bearer " + auth.token;
    },
    destroyUserCredentials: function(){
      auth.token = undefined;
      auth.isAuthenticated = false;
      auth.role = USER_ROLES.public_role;
      $http.defaults.headers.common['Authorization'] = undefined;
      $localstorage.remove(auth.sessionKey);
      $localstorage.remove('summary-'+auth.membershipId);
      auth.membershipId = null;
    },
    logout: function() {
      $ionicLoading.show({template:'Logging out....'});
      auth.destroyUserCredentials();
      $timeout(function(){
        $ionicLoading.hide();
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
        $ionicHistory.nextViewOptions({disableBack: true, historyRoot: true});
        $rootScope.$broadcast('user:logout');
      },30);
    },
    login: function(data) {
      return AjaxService.login(data).then(function(res){
        auth.storeUserCredentials(res.data);
        return res.code;
      }); 
    },
    isAuthorized: function(authorizedRoles){
      if(!angular.isArray(authorizedRoles)){
        authorizedRoles = [authorizedRoles];
      }
      if(authorizedRoles == []){
        return true;
      }
      if(authorizedRoles.indexOf(auth.role) !== -1 && auth.role == 'public_role'){
        return true
      }
      return (auth.isAuthenticated && authorizedRoles.indexOf(auth.role) !== -1);
    }

  };
  auth.loadUserCredentials();
  return {
    refresh: auth.loadUserCredentials,
    login: auth.login,
    logout: auth.logout,
    sessionKey: auth.sessionKey,
    isAuthorized : auth.isAuthorized,
    updateCredentials: auth.updateCredentials,
    isAuthenticated: function() {return auth.isAuthenticated;},
    role: function(){return auth.role;},
    id: function(){return auth.membershipId;}
  };

});
