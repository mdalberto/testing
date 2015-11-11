
PsychicSource.controller('MemberHomeCtrl',function($scope, SummaryService){
	alert(SummaryService.balance);
	$scope.balance = SummaryService.balance;
});