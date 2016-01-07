angular.module('PsychicSource.ReturnCalls', [])
.factory('ReturnCallsService',function($q,$state,$rootScope,$timeout,$ionicPopup,$ionicLoading,$ionicHistory,$localstorage,USER_ROLES, AuthService,AjaxService){
  var calls = {
    prefixKey: 'calls-',
    role: USER_ROLES.public_role,
    queuesInfo: null,
    storeReturnCallsInfo: function(userData){
      $localstorage.setObject(calls.prefixKey + AuthService.id(),userData);
      calls.loadReturnCallsSummary();
    },
    loadReturnCallsSummary: function(){
      calls.queuesInfo = $localstorage.getObject(calls.prefixKey + AuthService.id());
    },
    callsObj: function(){
      return calls.queueInfo;
    },
    getQueues: function() {
      $ionicLoading.show({template: 'Loading...'});
      d = $q.defer();
      AjaxService.getReturnCallQueues(AuthService.id()).then(function(res){
        console.log(res);
        calls.storeReturnCallsInfo(res.data);
        $ionicLoading.hide();
        d.resolve(calls.callsObj());
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
  calls.loadReturnCallsSummary();
  var result = {
    info_member: calls.loadReturnCallsSummary,
    callsObj: calls.callsObj,
    getQueues: calls.getQueues
  };
  return result;
});

