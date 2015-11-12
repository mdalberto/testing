
PsychicSource.controller('MemberHomeCtrl',function($scope, SummaryService){
	$scope.summary = SummaryService.summaryObj();
});
