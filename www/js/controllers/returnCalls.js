
PsychicSource.controller('ReturnCallCtrl',function($scope,AuthService, ReturnCallsService, calls){
	$scope.calls = calls;

  $scope.refresh = function(){
    ReturnCallsService.getQueues().then(function(calls){
       $scope.calls = calls;
    });
  };
});

