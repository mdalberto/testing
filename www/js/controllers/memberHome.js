
PsychicSource.controller('MemberHomeCtrl',function($scope,AuthService, SummaryService, summary){
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
    if(!summary.availability){
      return $scope.date.timeLeft = "0 secs hour(s)";
    }
    var nyTimeObject = moment.tz(summary.availability, 'America/New_York').add(4,'hours');
    var utcTimeObject = moment.utc();
    var timeLeftHours = nyTimeObject.diff(utcTimeObject,'hours');
    var timeLeftMinutes = nyTimeObject.diff(utcTimeObject,'minutes') % 60;
    $scope.date.timeLeft = timeLeftHours + ' hour(s) ' + timeLeftMinutes + ' minute(s)';
    return $scope.date.timeLeft;
  };

  $scope.initialize = function(){
    $scope.getTimeLeft($scope.summary);
  };

  $scope.initialize();
});
