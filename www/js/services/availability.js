angular.module('PsychicSource.Availability', [])
.factory('AvailabilityService',function($q,$state,$rootScope,$timeout,Popup,$ionicLoading,$ionicHistory,$localstorage,USER_ROLES, AuthService,AjaxService,CommonService,SummaryService,$filter){
  var availability = {
    hours: null,
    countryCodes: null,
    availabilityObj: function(){
      return {
        hours: availability.hours,
        countryCodes: availability.countryCodes
      }
    },
    getTimeLeft: function(summary){
      if(!summary.availability){
        return "0 secs hour(s)";
      }
      var nyTimeObject = moment.tz(summary.availability, 'America/New_York').add(4,'hours');
      var utcTimeObject = moment.utc();
      var timeLeftHours = nyTimeObject.diff(utcTimeObject,'hours');
      var timeLeftMinutes = nyTimeObject.diff(utcTimeObject,'minutes') % 60;
      var timeLeft = timeLeftHours + ' hour(s) ' + timeLeftMinutes + ' minute(s)';
      return timeLeft;
    },
    getCountryCodesAndHours: function() {
      $ionicLoading.show({template: 'Loading...'});
      d = $q.defer();

      $q.all([
        AjaxService.getCountryCodes(),
        AjaxService.getReturnCallAvailabilityHours(),
        AjaxService.getSummary(AuthService.id()),
        AjaxService.getReturnCallSettings()
      ])
      .then(function(responses){
        availability.countryCodes = responses[0].data;
        availability.hours = responses[1].data;
        SummaryService.updateUserSummary(responses[2].data);
        CommonService.setMinimumBalance(responses[3]);
        $ionicLoading.hide();
        d.resolve(availability.availabilityObj());
      },function(err){
        Popup.show('alert', {
          title: 'Error',
          template: 'Error while retrieving country codes or return call availability hours'
        });
        d.reject(err);
      });
      return d.promise;
    },
    updateReturnCallProfile: function(data){
      $ionicLoading.show({template: 'Saving...'});
      d = $q.defer();
      AjaxService.updateReturnCallProfile(data).then(function(res){
        $ionicLoading.hide();
        d.resolve(true);
      }, function(err){
        $ionicLoading.hide();
        if(err.status === 401){
          $rootScope.$broadcast('user:logout:complete');
        }
        else if(typeof(err.data) === 'object' &&
                typeof(err.data.ReturnCallStatusId) === 'number' &&
                err.data.ReturnCallStatusId == 6){
          Popup.show('alert', {
            title: 'SORRY',
            template: 'To reset your availability and maintain your position in all Return Call line(s), a $'+CommonService.minimumBalance+' account minimum is required. To add dollars now call <'+$filter('phonenumber')(CommonService.callNowNumber())+'.>'
          });
          d.reject(err);
        }
        else {
          Popup.show('alert', {
            title: 'Error',
            template: 'Error while saving return call profile settings'
          });
          d.reject(err);
        }
      });
      return d.promise;
    }
  };
  var result = {
    availabilityObj: availability.availabilityObj,
    getTimeLeft: availability.getTimeLeft,
    getCountryCodesAndHours: availability.getCountryCodesAndHours,
    updateReturnCallProfile: availability.updateReturnCallProfile
  };
  return result;
});
