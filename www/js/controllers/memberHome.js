
PsychicSource.controller('MemberHomeCtrl',function($scope,AuthService, AvailabilityService, SummaryService, summary){
	$scope.summary = summary;
  $scope.date = {};
  $scope.date.timeLeft = null;

  $scope.refresh = function(){
    SummaryService.getSummary().then(function(summary){
       $scope.summary = summary;
       $scope.getTimeLeft(summary);
    });
  };

  $scope.getTimeLeft = function(summary){
    return $scope.date.timeLeft = AvailabilityService.getTimeLeft(summary);
  };

  $scope.initialize = function(){
    $scope.getTimeLeft($scope.summary);
  };

  $scope.initialize();
});
