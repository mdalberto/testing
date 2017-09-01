PsychicSource.controller('AvailabilityCtrl', function($scope, AuthService, AvailabilityService, availabilityObj, SummaryService, $timeout, _, $state, $ionicLoading, $window, Popup, CommonService){
  $scope.showPhoneDropdown = true;
  $scope.hours = availabilityObj.hours;
  $scope.countryCodes = availabilityObj.countryCodes;
  SummaryService.info_member();
  $scope.summary = SummaryService.summaryObj();
  $scope.times = {};
  $scope.times.formattedPhone = null;
  $scope.times.hour = String($scope.summary.availabilityInSeconds / 3600);
  $scope.minimumBalance = CommonService.minimumBalance;

  findCountryById = function(id){
    countryData = _.find($scope.countryCodes, function(country){
      return country.CountryID === id
    })
    return countryData
  }

  countryCallingCode = function(){
    countryData = findCountryById($scope.summary.countryId)
    return countryData.CountryCallingCode;
  }

  isSpecialInternationalNumber = function (countryId, phone){
    countryCode = countryCallingCode();
    if(phone.indexOf('011') > -1
        && !(phone.indexOf('011'+countryCode) > -1))
    {
      return true
    }
    return false;
  }

  isInternationalNumber = function (countryId, phone){
    countryCode = countryCallingCode();
    if (countryId === 1
        || countryId === 2
        || !(phone.indexOf('011'+countryCode) > -1))
    {
      return false
    }
    return true
  }

  $scope.onlyCountries = function() {
    return $scope.countryCodes.map(function(c) { return c.CountryCode }).join(',')
  }

  $scope.defaultCountry = function(){
    if($scope.summary.countryId === 0) {
      return 'us'
    }
    countryData = findCountryById($scope.summary.countryId)
    return countryData.CountryCode;
  }

  $scope.times.phone = function(){
    if(isInternationalNumber($scope.summary.countryId, $scope.summary.phone)){
      var internationalCode = '011' + countryCallingCode();

      return $scope.summary.phone.substring(internationalCode.length);
    } else {
      return $scope.summary.phone;
    }
  }();

  $scope.refresh = function(){
    SummaryService.getSummary().then(function(summary){
       $scope.summary = summary;
       $scope.getTimeLeft(summary);
    });
  };

  $scope.afterPageRender = function(){
    $scope.setFormattedPhone();
    $scope.getTimeLeft($scope.summary);
  };

  $scope.setFormattedPhone = function(){
    if(isInternationalNumber($scope.summary.countryId, $scope.summary.phone)){
      var internationalCode = '+(011' + countryCallingCode() + ') ';

      var number = $scope.summary.phone.substring(internationalCode.length-4);
      $scope.times.formattedPhone = internationalCode + number;
    } else if(isSpecialInternationalNumber($scope.summary.countryId, $scope.summary.phone)){
      var internationalCode = '+(011' + countryCallingCode() + ') ';
      var number = $scope.summary.phone.substring(3); // Strips 011
      $scope.times.formattedPhone = internationalCode + number;
    }
    else {
      $scope.times.formattedPhone = 1+$('input[international-phone-number]').val();
    }
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
      $state.go($state.current, {}, {reload: true});
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
    $state.go($state.current, {}, {reload: true});
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
