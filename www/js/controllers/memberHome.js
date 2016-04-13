
PsychicSource.controller('MemberHomeCtrl',function($scope,AuthService, SummaryService, summary){
	$scope.summary = summary;

  $scope.refresh = function(){
    SummaryService.getSummary().then(function(summary){
       $scope.summary = summary;
    });
  };
});
