angular.module('PsychicSource.Summary', [])
.factory('SummaryService',function($q,$state,$rootScope,$timeout,$ionicLoading,$ionicHistory,$http,$localstorage,USER_ROLES){
  var summary = {
    baseUrl: 'https://testapi.vseinc.com/',
    tokenName: 'token',
    token: null,
    membershipId: null,
    role: USER_ROLES.public_role,
    balance = null,
    callCount = null,
    availableUntil = null,
    numberOfNotifications = null
    loadUserCredentials: function(){
      var hash_token = $localstorage.getObject(summary.tokenName);
      var token = hash_token.access_token;
      if(token) {
        summary.useCredentials(hash_token);
      }
    },
    storeUserSummary: function(userData){
      $localstorage.setObject(summary.membershipId,userData);
    },
    loadUserSummary: function(){
      var info_summary = $localstorage.getObject(summary.membershipId);
      summary.balance = info_summary.Balance;
      summary.callCount = info_summary.ReturnCallQueueCount;
      summary.availableUntil = info_summary.AvailableUntil;
      summary.numberOfNotifications = info_summary.NumberOfNotifications;
    },
    useCredentials: function(userData){
      summary.isAuthenticated = true;
      summary.token = userData.access_token;
      summary.membershipId = userData.membershipId;
      summary.role = USER_ROLES.member;
      // Set token as header for requests
      $http.defaults.headers.common['Authorization']  = "Bearer " + summary.token;
    },
    getSummary: function() {
      d = $q.defer();
      $http({
        method: 'GET',
        cache: false,
        url: 'https://testapi.vseinc.com/member/v1/' + summary.membershipId + '/summary',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': '*',
          'Pragma': 'no-cache',
          'Cache-Control': 'no-cache'
        },
        }).then(function(res){
          summary.storeUserSummary(res.data);
          d.resolve('sucess');
        },function(err){
          d.reject('Login failed');
      });
      return d.promise;
      
    }
  };
  summary.loadUserCredentials();
  return {
    refresh: summary.loadUserCredentials,
    info_member: summary.loadUserSummary,
    balance: summary.balance,
    id: summary.membershipId
  };

});