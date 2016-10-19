angular.module('PsychicSource.ReturnCalls', [])
.factory('ReturnCallsService',function($q,$state,$rootScope,$timeout,Popup,$ionicLoading,$ionicHistory,$localstorage,USER_ROLES, AuthService,AjaxService,CommonService){
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
      return calls.queuesInfo;
    },
    getQueues: function() {
      $ionicLoading.show({template: 'Loading...'});
      d = $q.defer();
      $q.all([
        AjaxService.getReturnCallQueues(AuthService.id()),
        AjaxService.getReturnCallSettings()
      ]).then(function(res){
        calls.storeReturnCallsInfo(res[0].data);
        CommonService.setMinimumBalance(res[1]);
        $ionicLoading.hide();
        d.resolve(calls.callsObj());
      },function(err){
        $ionicLoading.hide();
        if(err.status === 401){
          $rootScope.$broadcast('user:logout:complete');
        } else {
          Popup.show('alert', {
            title: 'Error',
            template: 'Error while retrieving account information'
          });
          d.reject(err);
        }
      });
      return d.promise;
    },
    deleteReturnCall: function(data,advisorId) {
      $ionicLoading.show({template: 'Updating...'});
      d = $q.defer();
      AjaxService.deleteReturnCall(AuthService.id(),advisorId).then(function(res){
        calls.storeReturnCallsInfo(data);
        $ionicLoading.hide();
        d.resolve(calls.callsObj());
      },function(err){
        $ionicLoading.hide();
        if(err.status === 401){
          $rootScope.$broadcast('user:logout:complete');
        } else {
          Popup.show('alert', {
            title: 'Error',
            template: 'Error while retrieving account information'
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
    getQueues: calls.getQueues,
    deleteReturnCall: calls.deleteReturnCall
  };
  return result;
});
