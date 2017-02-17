angular.module('PsychicSource.Availability', [])
.factory('AvailabilityService', function($q, $state, $rootScope, $timeout, Popup, $ionicLoading, $ionicHistory, $localstorage, USER_ROLES, AuthService, AjaxService, CommonService, SummaryService, $filter){
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
      var availableUntil = moment.tz(summary.availability, 'MM/DD/YYYY h:m:s A', 'America/New_York');
      var currentNYTime = moment.tz('America/New_York');
      var timeLeftHours = availableUntil.diff(currentNYTime,'hours');
      var timeLeftMinutes = availableUntil.diff(currentNYTime,'minutes') % 60;
      if(timeLeftHours < 0 || timeLeftMinutes < 0) {
        timeLeftHours = timeLeftMinutes = 0;
      }
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
        $ionicLoading.hide();
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
                  $rootScope.external = CommonService.externalNoPrompt;
                  $rootScope.callNow = CommonService.callNow;
                  Popup.show('alert', {
                    scope: $rootScope,
                    title: 'SORRY',
                    template: "<center>To reset your availability and maintain your position in all Return Call lines, a $"+CommonService.minimumBalance+" account minimum is required. To add dollars call<br/> <a href=# ng-click='callNow()'>"+$filter('phonenumber')(CommonService.callNowNumber())+"</a><br/> or visit <br/><a href=# data-href='http://psychicsource.com' ng-click='external($event)'>PsychicSource.com</a></center>"
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
