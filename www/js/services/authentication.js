angular.module('PsychicSource.Authentication', ['ionic'])
.factory('AuthService',function($q,$state,$rootScope,$timeout,$ionicLoading,$ionicHistory,$http,$localstorage,USER_ROLES,AjaxService,PushNotificationService){
  var auth = {
    credentials: null,
    rememberMe: true,
    isAuthenticated: false,
    registrationIdSent: false,
    sessionKey: 'token',
    emailOrPhone: '',
    membershipId: null,
    token: null,
    role: USER_ROLES.public_role,
    autoLogin: function(){
      data = $localstorage.getObject(auth.sessionKey);
      if(auth.loadUserCredentials(data)){
        auth.initPushNotificationService();
      }
    },
    loadUserCredentials: function(data){
      if(!data){
        data = $localstorage.getObject(auth.sessionKey);
      }

      var token = (data && data.access_token) ? data.access_token : null;
      if(token) {
        auth.useCredentials(data);
        return true;
      }
    },
    storeUserCredentials: function(userData){
      auth.updateCredentials(userData);
    },
    updateCredentials: function(userData){
      if(auth.rememberMe){
        var data = $localstorage.getObject(auth.sessionKey);
        $.extend(data,userData);
        $localstorage.setObject(auth.sessionKey,data);
        auth.useCredentials(data);
      } else {
        $.extend(auth.credentials,userData);
        auth.useCredentials(auth.credentials);
      }
    },
    useCredentials: function(userData){
      auth.credentials = userData;
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
      $localstorage.remove('preferences-'+auth.membershipId);
      $localstorage.remove('call-'+auth.membershipId);

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
    getRememberMe: function(){
      return auth.rememberMe;
    },
    setRememberMe: function(remember) {
      auth.rememberMe = remember;
    },
    initPushNotificationService: function(){
      ionic.Platform.ready(function() {
        var push = PushNotificationService.init();
        push.on('registration', function(pushData) {
           var currentRegistrationId = $localstorage.get('platformId-'+auth.membershipId);
           var platform = ionic.Platform.platform();

           if(currentRegistrationId && currentRegistrationId !== pushData.registrationId){
            var credentials = {platform: platform, platformId: pushData.registrationId};

            auth.updateCredentials(credentials);
            auth.sendRegistrationId();
           }
        });
      });
    },
    sendRegistrationId: function(){
      var data = auth.credentials;
      AjaxService.sendNotificationId(data).then(function(res){
          // This is transparent to the user, but if it fails it will logout the user.
        },function(err){
          alert("Error: Updating credentials failed");
          $rootScope.$broadcast('user:logout:complete');
        }
      );
    },
    login: function(data) {
      return AjaxService.login(data).then(function(res){
        d = $q.defer();
        var platform = ionic.Platform.platform();
        try {
          var push = PushNotificationService.init();
          push.on('registration', function(pushData) {
            var platform = ionic.Platform.platform();
            user_loaded = auth.rememberMe ? auth.storeUserCredentials(res.data) : auth.loadUserCredentials(res.data);
            auth.updateCredentials({platform: platform, platformId: pushData.registrationId});
            var storePlatformId = $localstorage.get('platformId-'+auth.membershipId);
            if(storePlatformId && storePlatformId === pushData.registrationId){
              d.resolve(false);
            } else {
              d.resolve(pushData.registrationId);
            }
          });

          push.on('error', function(e) {
            d.reject(e);
            alert(e);
          });
          return d.promise;
        }
        catch(err)
        {
          console.log("Loading Browser Version without Notifications");
          user_loaded = auth.rememberMe ? auth.storeUserCredentials(res.data) : auth.loadUserCredentials(res.data);
          d.resolve(false);
          return d.promise;
        }
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
  auth.autoLogin();
  return {
    refresh: auth.loadUserCredentials,
    getRememberMe: auth.getRememberMe,
    setRememberMe: auth.setRememberMe,
    login: auth.login,
    logout: auth.logout,
    getCredentials: function(){ return auth.credentials; },
    sessionKey: function() { return auth.sessionKey;},
    isAuthorized : auth.isAuthorized,
    updateCredentials: auth.updateCredentials,
    isAuthenticated: function() {return auth.isAuthenticated;},
    role: function(){return auth.role;},
    id: function(){return auth.membershipId;}
  };

});
