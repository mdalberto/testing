
PsychicSource.controller('AvailabilityCtrl',function($scope,AuthService, AvailabilityService, availabilityObj, SummaryService,$timeout,_){
	$scope.hours = availabilityObj.hours;
  $scope.countryCodes = availabilityObj.countryCodes;
  SummaryService.info_member();
  $scope.summary = SummaryService.summaryObj();
  $scope.phone = $scope.summary.phone;
  $scope.times = {};
  $scope.times.countryObj = _.find($scope.countryCodes,function(obj){
    return obj.CountryID === $scope.summary.countryId;
  });
  $scope.times.formattedPhone = null;
  $scope.times.availableHours = moment.duration(parseInt($scope.summary.availabilityInSeconds,10),'seconds').format('h:mm');
  if($scope.times.availableHours){
    var hoursArr = $scope.times.availableHours.split(":");
    $scope.times.hour = hoursArr[0];
  }

  $timeout(function(){
    $scope.times.formattedPhone = $('.intl-tel-input').find('input').first().val();
    $('.selected-flag').find('.iti-flag').removeClass().addClass('iti-flag').addClass($scope.times.countryObj.CountryCode.toLowerCase());
  });

  $scope.updateAvailableHours = function(){
    var hour;
    hour = moment.duration(parseInt($scope.times.hour,10),'hours').format('h:mm');
    if(hour){
      var hoursArr = hour.split(":");
      $scope.times.availableHours = hour;
      $scope.times.hour = hoursArr[0];
      return true;
    }
  };

  //$scope.refresh = function(){
    //SummaryService.getSummary().then(function(summary){
       //$scope.summary = summary;
    //});
  //};
});

