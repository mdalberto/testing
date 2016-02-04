
PsychicSource.controller('MemberHomeCtrl',function($scope,AuthService, SummaryService, summary){
	$scope.summary = summary;
  $scope.date = {};
  $scope.date.availabilityUntil = new moment().tz('EST').add(parseInt(summary.availabilityInSeconds,10),'seconds').format('h:mm a z M/D/YY')

  $scope.refresh = function(){
    SummaryService.getSummary().then(function(summary){
       $scope.summary = summary;
    });
  };
});
