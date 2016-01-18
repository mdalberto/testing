
PsychicSource.controller('AvailabilityCtrl',function($scope,AuthService, AvailabilityService, availabilityObj, SummaryService,$timeout,_,$state,$ionicLoading){
  $scope.showPhoneDropdown = true;
	$scope.hours = availabilityObj.hours;
  $scope.countryCodes = availabilityObj.countryCodes;
  SummaryService.info_member();
  $scope.summary = SummaryService.summaryObj();
  $scope.phone = $scope.summary.phone;
  $scope.times = {};
  $scope.times.formattedPhone = null;
  $scope.times.availableHours = moment.duration(parseInt($scope.summary.availabilityInSeconds,10),'seconds').format('h:mm');
  if($scope.times.availableHours){
    var hoursArr = $scope.times.availableHours.split(":");
    $scope.times.hour = hoursArr[0];
  }


  $scope.afterPageRender = function(){
    $scope.setFormattedPhone();
    $scope.setFlag();
  };

  $scope.setFormattedPhone = function(){
    $scope.times.formattedPhone = $('input[international-phone-number').val();
  };

  $scope.setFlag = function(){
    $('.selected-flag').find('.iti-flag').removeClass().addClass('iti-flag').addClass($scope.times.countryObj.CountryCode.toLowerCase());
  };

  ($scope.setCountryObj =  function(){
    $scope.times.countryObj = _.find($scope.countryCodes,function(obj){
      return obj.CountryID === $scope.summary.countryId;
    });
  })();
 
  $scope.update = function(){
    var hour;
    hour = moment.duration(parseInt($scope.times.hour,10),'hours').format('h:mm');
    if(hour){
      var hoursArr = hour.split(":");
      $scope.times.availableHours = hour;
      $scope.times.hour = hoursArr[0];
      return true;
    }
    $scope.times.countryObj = _.find($scope.countryCodes,function(obj){
      return obj.CountryCode === $scope.summary.countryId;
    });
    
  };

  $scope.getCountryCodeSelected = function(){
    var classesStr = $('.selected-flag').find('.iti-flag').attr('class');
    var classesArr = classesStr.split(" ");
    return classesArr[1].toUpperCase();
  };

  $scope.reset = function(){
    $ionicLoading.show({template: 'Reseting Info...'});
    $('input[international-phone-number]').on("destroyed",function(){
      console.log('input removed');
    });
    $scope.showPhoneDropdown = false;
    if($scope.times.availableHours){
      var hoursArr = $scope.times.availableHours.split(":");
      $scope.times.hour = hoursArr[0];
    }
    $scope.setCountryObj();
    $timeout(function(){ 
      insertionQ('input[international-phone-number]').every(function() {
        $timeout(function(){
          $scope.afterPageRender();
          $ionicLoading.hide();
        },500);
      });
      $scope.showPhoneDropdown = true;
    },500);
  };

  $timeout(function(){
    $scope.afterPageRender();
  });
  
  //$scope.refresh = function(){
    //SummaryService.getSummary().then(function(summary){
       //$scope.summary = summary;
    //});
  //};
});

