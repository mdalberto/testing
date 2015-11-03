angular.module('PsychicSource.Authentication', [])
.factory('authentication',function($http){
  var auth = {
      baseUrl: '',
      isAuthenticated: false,
      tokenName: 'token',
      emailOrPhone: '',
      authToken: null,
      loadUserCredentials: function(){
        var token = window.localStorage.getItem(auth.tokenName);
        if(token) {
          useCredentials(token);
        }
      },
      storeUserCredentials: function(token){
        window.localStorage.setItem(auth.tokenName,token);
        useCredentials(token);
      },
      useCredentials: function(token){
        isAuthenticated = true;
        auth.authToken = token;
        // Set token as header for requests
        $http.defaults.headers.common['Authorization']  = "Bearer " + token;
      },
      destroyUserCredentials: function(){
        email
        auth.authToken = undefined;
        isAuthenticated = false;
        $http.defaults.headers.common['Authorization'] = undefined;
        window.localStorage.removeItem(auth.tokenName);
      },
      logout: function() {
        auth.destroyUserCredentials();
      },
      errorFnLogin: function(res){
        alert("login error");
        console.log(res);
      },
      successFnLogin: function(res){
        auth.storeUserCredentials(res.access_token);
      },
      login: function(data) {
        $http({
          method: 'POST',
          url: baseUrl,
          data: data
        }).then(auth.successFnLogin,auth.errorFnLogin);
      }

  };
  auth.loadUserCredentials();
  return {
    login: auth.login,
    logout: auth.logout
  };

});

