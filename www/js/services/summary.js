angular.module('PsychicSource.Summary', [])
.factory('SummaryService',function($q,$state,$rootScope,$timeout,$ionicPopup,$ionicLoading,$ionicHistory,$localstorage,USER_ROLES, AuthService,AjaxService){
  var summary = {
    prefixKey: 'summary-',
    token: null,
    role: USER_ROLES.public_role,
    balance: null,
    callCount: null,
    availableUntil: null,
    numberOfNotifications: null,
    storeUserSummary: function(userData){
      $localstorage.setObject(summary.prefixKey + AuthService.id(),userData);
      summary.loadUserSummary();
    },
    loadUserSummary: function(){
      var info_summary = $localstorage.getObject(summary.prefixKey + AuthService.id());
      summary.balance = info_summary.Balance;
      summary.callCount = info_summary.ReturnCallQueueCount;
      summary.availableUntil = info_summary.AvailableUntil;
      summary.numberOfNotifications = info_summary.NumberOfNotifications;
    },
    summaryObj: function(){
      return {
        balance: summary.balance,
        callCount: summary.callCount,
        availability: summary.availableUntil,
        notifications: summary.numberOfNotifications
      }
    },
    getSummary: function() {
      $ionicLoading.show({template: 'Loading...'});
      d = $q.defer();
      AjaxService.getSummary(AuthService.id()).then(function(res){
        summary.storeUserSummary(res.data);
        $ionicLoading.hide();
        d.resolve(summary.summaryObj());
      },function(err){                                           
        $ionicLoading.hide();
        if(err.status === 401){
          $rootScope.$broadcast('user:logout:complete');
        } else {
          var alertPopup = $ionicPopup.alert({
            title: 'Error',
            template: '(2) Error while retrieving account information'
          });  
          d.reject(err);   
        }
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
    summaryObj: summary.summaryObj,
    getSummary: summary.getSummary
  };
  return result;
});
