angular.module('PsychicSource.Ajax', [])
.factory('AjaxService',function($q,$http){
  var mobilePlatforms = {android: 1, ios: 2};
  var ajaxHandler = {
    baseUrl: 'https://testapi.vseinc.com/',
    networkId: 2,
    headers: function(contentType){
      var contentType = typeof contentType !== 'undefined' ? contentType : 'application/json';
      return {
      'Content-Type': contentType,
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': '*',
      'Pragma': 'no-cache',
      'Cache-Control': 'no-cache'
      };
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
        header: ajaxHandler.headers('application/x-www-form-urlencoded'),
        data: jQuery.param(sendData)
      })
    },
    getSummary: function(id){
      return $http({
        method: 'GET',
        cache: false,
        url: ajaxHandler.baseUrl + 'member/v1/' + id + '/summary',
        header: ajaxHandler.headers(),
        });
    },
    sendNotificationId: function(data){
      var mobileOS = mobilePlatforms[data.platform];
      var counter = 0;
      var queryResults = $q.defer();
      var query = function() {
        $http({
          method: 'POST',
          cache: false,
          url: ajaxHandler.baseUrl + 'member/v1/' + data.membershipId + '/registersnsdevice/' + mobileOS,
          header: ajaxHandler.headers(),
          data: {registrationId: data.platformId}
          }).success(function(result){
           queryResults.resolve(result); 
          }).error(function(err){
            if(counter < 3) {
              query();
              counterr++;
            } else {
              queryResults.reject(err);
            }
          });
      };
      query();
      return queryResults.promise; 
    },
    getPreferences: function(id){
      return $http({
        method: 'GET',
        cache: false,
        url: ajaxHandler.baseUrl + 'member/v1/' + id + '/' + ajaxHandler.networkId + '/getnotificationpreferences',
        header: ajaxHandler.headers(),
      });
    },
    savePreferences: function(id,preferences){
      return $http({
        method: 'POST',
        cache: false,
        url: ajaxHandler.baseUrl + 'member/v1/' + id + '/' + ajaxHandler.networkId + '/savenotificationpreferences',
        header: ajaxHandler.headers(),
        data: JSON.stringify(preferences)
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
    }
  };
  return ajaxHandler;

});
