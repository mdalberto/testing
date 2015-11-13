
PsychicSource.controller('BecomeMemberCtrl',function($scope,$ionicPlatform){
  $scope.callNowNumber = ionic.Platform.isAndroid() ? "8669040177" : "8668842981";
  $scope.callNow = function(){
    window.open('tel:' + $scope.callNowNumber, '_system', 'location=yes');
    return false;
  };
});

