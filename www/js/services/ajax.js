angular.module('PsychicSource.Ajax', [])
.factory('AjaxService',function($q,$http,ConfigService){

  var ajaxHandler = {
    baseUrl: ConfigService.baseUrl,
    networkId: 2,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': '*',
      'Pragma': 'no-cache',
      'Cache-Control': 'no-cache'
    },
    login: function(data){
      var sendData = {
        networkId: ajaxHandler.networkId,
        grant_type: 'password'
      };
      sendData.username = data.phone ? data.phone : data.email
      sendData.password = data.pin ? data.pin : data.password
      return $http({
        method: 'POST',
        cache: false,
        url: ajaxHandler.baseUrl + 'token',
        header: ajaxHandler.headers,
        data: jQuery.param(sendData)
        })
    },
    getSummary: function(id){
      return $http({
        method: 'GET',
        cache: false,
        url: ajaxHandler.baseUrl + 'member/v1/' + id + '/summary',
        header: ajaxHandler.headers,
        });
    },
    getReturnCallQueues: function(id){
      return $http({
        method: 'GET',
        cache: false,
        url: ajaxHandler.baseUrl + 'member/v1/' + id + '/ReturnCalls',
        header: ajaxHandler.headers
      });
    },
    deleteReturnCall: function(membershipId,advisorId){
      return $http({
        method: 'DELETE',
        cache: false,
        url: ajaxHandler.baseUrl + 'member/v1/' + membershipId + '/DeleteReturnCall/' + advisorId,
        header: ajaxHandler.headers
      });
    },
    getCountryCodes: function(){
      return $http({
        method: 'GET',
        cache: false,
        url: ajaxHandler.baseUrl + 'domain/countrycodes',
        header: ajaxHandler.headers
      });
    },
    getReturnCallAvailabilityHours: function(){
      return $http({
        method: 'GET',
        cache: false,
        url: ajaxHandler.baseUrl + 'domain/returncallavailabilityhours',
        header: ajaxHandler.headers
      });
    },
    updateReturnCallProfile: function(data){
      return $http({
        method: 'POST',
        cache: false,
        url: ajaxHandler.baseUrl + 'member/v1/UpdateReturnCallProfile',
        header: $.extend(ajaxHandler.headers, {'Content-Type': 'application/json'}),
        data: data
      });

    }

    
  };
  return ajaxHandler;

});
