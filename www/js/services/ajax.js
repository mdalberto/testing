angular.module('PsychicSource.Ajax', [])
.factory('AjaxService',function($q,$http){

  var ajaxHandler = {
    baseUrl: 'https://testapi.vseinc.com/',
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
    }
    
  };
  return ajaxHandler;

});
