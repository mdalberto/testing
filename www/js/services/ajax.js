angular.module('PsychicSource.Ajax', [])
.factory('AjaxService',function($q,$http){

  var ajaxHandler = {
    baseUrl: 'https://testapi.vseinc.com/',
    networkId: 2,
    login: function(data){
      var sendData = {
        networkId: ajaxHandler.networkId,
        grant_type: 'password'
      };
      sendData.username = data.phone ? data.phone : data.email
      sendData.password = data.pin ? data.pin : data.password
      d = $q.defer();
      $http({
        method: 'POST',
        cache: false,
        url: ajaxHandler.baseUrl + 'token',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': '*',
          'Pragma': 'no-cache',
          'Cache-Control': 'no-cache'
        },
        data: jQuery.param(sendData)
        }).then(function(res){
          d.resolve(res);
        },function(err){
          d.reject(err);
        });
      return d.promise;
    }
    
  };
  return ajaxHandler;

});
