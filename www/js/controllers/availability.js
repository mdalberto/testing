
PsychicSource.controller('AvailabilityCtrl',function($scope,AuthService, AvailabilityService, availabilityObj){
	$scope.hours = availabilityObj.hours;
  $scope.countryCodes = availabilityObj.countryCodes;

  //$scope.refresh = function(){
    //SummaryService.getSummary().then(function(summary){
       //$scope.summary = summary;
    //});
  //};
});

