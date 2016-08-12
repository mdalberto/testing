angular.module('PsychicSource.Ajax', [])
.factory('AjaxService',function($q,$http,ConfigService){
  var mobilePlatforms = {android: 1, ios: 2};
  var ajaxHandler = {
    baseUrl: ConfigService.baseUrl,
    networkId: 2,
    headers: function(contentType){
      var contentType = typeof contentType !== 'undefined' ? contentType : 'application/json';
      return {
        'Content-Type': contentType
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
        headers: ajaxHandler.headers('application/x-www-form-urlencoded'),
        data: jQuery.param(sendData)
      })
    },
    getSummary: function(id){
      return $http({
        method: 'GET',
        cache: false,
        url: ajaxHandler.baseUrl + 'member/v1/' + id + '/summary',
        headers: ajaxHandler.headers(),
      });
    },
    getPreferences: function(id){
      return $http({
        method: 'GET',
        cache: false,
        url: ajaxHandler.baseUrl + 'member/v2/' + id + '/' + ajaxHandler.networkId + '/getnotificationpreferences',
        headers: ajaxHandler.headers(),
      });
    },
    saveFavorite: function(id, favorite){
      return $http({
        method: 'POST',
        cache: false,
        url: ajaxHandler.baseUrl + 'member/v1/' + id + '/' + ajaxHandler.networkId + '/savefavoriteadvisor',
        headers: ajaxHandler.headers(),
        data: favorite
      });
    },
    getFavorites: function(id){
      return $http({
        method: 'GET',
        cache: false,
        url: ajaxHandler.baseUrl + 'member/v1/' + id + '/' + ajaxHandler.networkId + '/getfavoriteadvisors',
        headers: ajaxHandler.headers(),
      });
    },
    savePreferences: function(id,preferences){
      return $http({
        method: 'POST',
        cache: false,
        url: ajaxHandler.baseUrl + 'member/v2/' + id + '/' + ajaxHandler.networkId + '/savenotificationpreferences',
        headers: ajaxHandler.headers(),
        data: JSON.stringify(preferences)
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
          headers: ajaxHandler.headers(),
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
    getReturnCallQueues: function(id){
      return $http({
        method: 'GET',
        cache: false,
        url: ajaxHandler.baseUrl + 'member/v1/' + id + '/ReturnCalls',
        headers: ajaxHandler.headers()
      });
    },
    deleteReturnCall: function(membershipId,advisorId){
      return $http({
        method: 'DELETE',
        cache: false,
        url: ajaxHandler.baseUrl + 'member/v1/' + membershipId + '/DeleteReturnCall/' + advisorId,
        headers: ajaxHandler.headers()
      });
    },
    getCountryCodes: function(){
      return $http({
        method: 'GET',
        cache: false,
        url: ajaxHandler.baseUrl + 'domain/countrycodes',
        headers: ajaxHandler.headers()
      });
    },
    getReturnCallAvailabilityHours: function(){
      return $http({
        method: 'GET',
        cache: false,
        url: ajaxHandler.baseUrl + 'domain/returncallavailabilityhours',
        headers: ajaxHandler.headers()
      });
    },
    updateReturnCallProfile: function(data){
      return $http({
        method: 'POST',
        cache: false,
        url: ajaxHandler.baseUrl + 'member/v1/UpdateReturnCallProfile',
        headers: ajaxHandler.headers(),
        data: data
      });

    }
  };
  return ajaxHandler;

});
