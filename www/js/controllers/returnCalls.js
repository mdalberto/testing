PsychicSource.constant("moment", moment);

PsychicSource.controller('ReturnCallCtrl',function($scope,AuthService, ReturnCallsService, calls, _){
  $scope.moment = new moment();
	$scope.calls = calls;

  $scope.refresh = function(){
    ReturnCallsService.getQueues().then(function(calls){
       $scope.calls = calls;
    });
  };
  
  $scope.remove = function($index){
    queueToBeRemoved = $scope.calls[$index];
    ReturnCallsService.deleteReturnCall(_.without($scope.calls,queueToBeRemoved),queueToBeRemoved.ExpertId).then(function(calls){
      $scope.calls = calls;
    });
  };
});

