angular.module('PsychicSource.Summary', [])
.factory('SummaryService',function($q,$state,$rootScope,$timeout,$ionicLoading,$ionicHistory,$http,$localstorage,USER_ROLES, AuthService){
  var summary = {
    baseUrl: 'https://testapi.vseinc.com/',
    token: null,
    membershipId: null,
    role: USER_ROLES.public_role,
    balance: null,
    callCount: null,
    availableUntil: null,
    numberOfNotifications: null,
    storeUserSummary: function(userData){
      $localstorage.setObject(summary.membershipId,userData);
      summary.loadUserSummary();
    },
    loadUserSummary: function(){
      var info_summary = $localstorage.getObject(summary.membershipId);
      summary.balance = info_summary.Balance;
      summary.callCount = info_summary.ReturnCallQueueCount;
      summary.availableUntil = info_summary.AvailableUntil;
      summary.numberOfNotifications = info_summary.NumberOfNotifications;
    },
    getSummary: function() {
      d = $q.defer();
      $http({
        method: 'GET',
        cache: false,
        url: 'https://testapi.vseinc.com/member/v1/' + AuthService.id() + '/summary',
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
  summary.loadUserSummary();
  var result = {
    info_member: summary.loadUserSummary,
    balance: function(){return summary.balance},
    callCount: function(){return summary.callCount},
    availability: function(){return summary.availableUntil},
    notifications: function(){return summary.numberOfNotifications},
    summaryObj: function(){ return {
      balance: result.balance(),
      callCount: result.callCount(),
      availability: result.availability(),
      notifications: result.notifications()
    }},
    getSummary: summary.getSummary
  };
  return result;
});
