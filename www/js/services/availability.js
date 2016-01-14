angular.module('PsychicSource.Availability', [])
.factory('AvailabilityService',function($q,$state,$rootScope,$timeout,$ionicPopup,$ionicLoading,$ionicHistory,$localstorage,USER_ROLES, AuthService,AjaxService){
  var availability = {
    hours: null,
    countryCodes: null,
    availabilityObj: function(){
      return {
        hours: availability.hours,
        countryCodes: availability.countryCodes
      }
    },
    getCountryCodesAndHours: function() {
      $ionicLoading.show({template: 'Loading...'});
      d = $q.defer();

      $q.all([
        AjaxService.getCountryCodes(),
        AjaxService.getReturnCallAvailabilityHours()
      ])
      .then(function(responses){
        console.log(responses[0]);
        availability.countryCodes = responses[0].data;
        availability.hours = responses[1].data;
        $ionicLoading.hide();
        d.resolve(availability.availabilityObj());
      },function(err){
        console.log(err);
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: '(2) Error while retrieving country codes or return call availability hours'
        });  
        d.reject(err);   
      });
      return d.promise;
    }
  };
  var result = {
    availabilityObj: availability.availabilityObj,
    getCountryCodesAndHours: availability.getCountryCodesAndHours
  };
  return result;
});

