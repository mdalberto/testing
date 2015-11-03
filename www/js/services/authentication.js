angular.module('PsychicSource.Authentication', [])
.factory('AuthService',function($q,$http,$localstorage){
  var auth = {
    baseUrl: 'https://testapi.vseinc.com/',
    networkId: 2,
    isAuthenticated: false,
    tokenName: 'token',
    emailOrPhone: '',
    membershipId: null,
    token: null,
    loadUserCredentials: function(){
      var token = $localstorage.getObject(auth.tokenName).access_token;
      if(token) {
        useCredentials(token);
      }
    },
    storeUserCredentials: function(userData){
      $localstorage.setObject(auth.tokenName,userData);
      useCredentials(userData);
    },
    useCredentials: function(userData){
      isAuthenticated = true;
      auth.token = userData.access_token;
      auth.membershipId = userData.membershipId;
      auth.role = USER_ROLES.member;
      // Set token as header for requests
      $http.defaults.headers.common['Authorization']  = "Bearer " + auth.token;
    },
    destroyUserCredentials: function(){
      auth.token = undefined;
      isAuthenticated = false;
      $http.defaults.headers.common['Authorization'] = undefined;
      $localstorage.remove(auth.tokenName);
    },
    logout: function() {
      auth.destroyUserCredentials();
    },
    login: function(data) {
      sendData = {
        networkId: auth.networkId,
        grantType: 'password'
      };
      sendData.username = data.phone ? data.phone : data.email
      sendData.password = data.pin ? data.pin : data.password
      return $q(function(resolve, reject){
        $http({
          method: 'POST',
          url: auth.baseUrl + 'token' + '?rnd=' + new Date().getTime(),
          data: sendData
        }).then(function(res){
          auth.storeUserCredentials(res);
          resolve('Login success'); 
        },function(err){
          reject('Login failed');
        });
      });
    },
    isAuthorized: function(authorizedRoles){
      if(!angular.isArray(authorizedRoles)){
        authorizedRoles = [authorizedRoles];
      }
      return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
    }

  };
  auth.loadUserCredentials();
  return {
    login: auth.login,
    logout: auth.logout,
    isAuthorized : auth.isAuthorized,
    isAuthenticated: function() {return auth.isAuthenticated;},
    role: function(){return auth.role;},
    id: auth.membershipId
  };

});
