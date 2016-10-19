PsychicSource.constant("moment", moment);
PsychicSource.controller('ReturnCallCtrl', function($scope, AuthService, ReturnCallsService, calls, _, Popup, ConfigService, CommonService){
  $scope.moment = new moment();
  $scope.calls = calls;
  $scope.imagePath = ConfigService.assetUrlImages;
  $scope.minimumBalance = CommonService.minimumBalance;

  $scope.refresh = function(){
    ReturnCallsService.getQueues().then(function(calls){
      $scope.calls = calls;
    });
  };

  $scope.remove = function($index){
    queueToBeRemoved = $scope.calls[$index];
    var confirmPopup = Popup.show('confirm', {
      title: 'Remove Confirmation',
      template: "Are you sure you want to remove yourself from " + queueToBeRemoved.ExpertName  + "'s line?"
    });

    confirmPopup.then(function(res) {
      if(res) {
        ReturnCallsService.deleteReturnCall(_.without($scope.calls,queueToBeRemoved),queueToBeRemoved.ExpertId).then(function(calls){
          $scope.calls = calls;
        });
      }
    });
  };
});

