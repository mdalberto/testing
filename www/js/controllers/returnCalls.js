PsychicSource.constant("moment", moment);

PsychicSource.controller('ReturnCallCtrl',function($scope,AuthService, ReturnCallsService, calls){
  $scope.moment = new moment();
	$scope.calls = calls;

  $scope.refresh = function(){
    ReturnCallsService.getQueues().then(function(calls){
       $scope.calls = calls;
    });
  };
});

