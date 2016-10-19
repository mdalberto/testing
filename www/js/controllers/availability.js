PsychicSource.controller('AvailabilityCtrl',function($scope,AuthService, AvailabilityService, availabilityObj, SummaryService,$timeout,_,$state,$ionicLoading,$window,Popup,CommonService){
  $scope.showPhoneDropdown = true;
  $scope.hours = availabilityObj.hours;
  $scope.countryCodes = availabilityObj.countryCodes;
  SummaryService.info_member();
  $scope.summary = SummaryService.summaryObj();
  $scope.times = {};
  $scope.times.phone = $scope.summary.phone;
  $scope.times.formattedPhone = null;
  $scope.times.hour = String($scope.summary.availabilityInSeconds / 3600);
  $scope.minimumBalance = CommonService.minimumBalance;

  $scope.refresh = function(){
    SummaryService.getSummary().then(function(summary){
       $scope.summary = summary;
       $scope.getTimeLeft(summary);
    });
  };

  $scope.afterPageRender = function(){
    $scope.setFormattedPhone();
    $scope.setFlag();
    $scope.getTimeLeft($scope.summary);
  };

  $scope.setFormattedPhone = function(){
    $scope.times.formattedPhone = $('input[international-phone-number]').val();
  };

  $scope.setFlag = function(){
    $('.selected-flag').find('.iti-flag').removeClass().addClass('iti-flag').addClass($scope.times.countryObj.CountryCode.toLowerCase());
  };

  ($scope.setCountryObj =  function(){
    $scope.times.countryObj = _.find($scope.countryCodes,function(obj){
      return obj.CountryID === $scope.summary.countryId;
    });
  })();

  $scope.getTimeLeft = function(summary){
    return $scope.times.availableHours = AvailabilityService.getTimeLeft(summary);
  };

  $scope.update = function(){
    var hour;
    hour = moment.duration(parseInt($scope.times.hour,10),'hours').format('h:mm');
    if(hour){
      var hoursArr = hour.split(":");
      $scope.times.availableHours = hour;
      $scope.times.hour = hoursArr[0];
    }
    $scope.times.countryObj = _.find($scope.countryCodes,function(obj){
      return obj.CountryCode === $scope.summary.countryId;
    });
    var countryId = $scope.getCountryIdFromCode($scope.getCountryCodeSelected());
    AvailabilityService.updateReturnCallProfile({
      "MembershipId": AuthService.id(),
      "Duration": $scope.times.hour,
      "Phone": String($scope.times.phone),
      "CountryId": countryId
    }).then(function(success){
      SummaryService.updateUserSummary({
        availabilityTime: $scope.times.hour * 3600,
        phone: String($scope.times.phone),
        countryId: countryId
      });
      $scope.getTimeLeft(SummaryService.summaryObj());
      $window.location.reload();
    });
  };

  $scope.getCountryCodeSelected = function(){
    var classesStr = $('.selected-flag').find('.iti-flag').attr('class');
    var classesArr = classesStr.split(" ");
    return classesArr[1].toUpperCase();
  };

  $scope.getCountryIdFromCode = function(code){
    var countryObj = _.find($scope.countryCodes,function(obj){
      return obj.CountryCode === code;
    });
    return countryObj.CountryID;
  };

  $scope.reset = function(){
    $ionicLoading.show({template: 'Reseting Info...'});
    $window.location.reload();
  };

  $timeout(function(){
    $scope.afterPageRender();
    $('ul.country-list').wrap("<ion-scroll direction='y'></ion-scroll>");
  },500);

  $scope.warnInvalid = function(form){
    if(!form.$valid){
        Popup.show('alert', {
          title: 'Invalid Phone Number',
          template: 'Please verify your country code and phone number'
        });
    }
    return form.$valid;
  };
});
