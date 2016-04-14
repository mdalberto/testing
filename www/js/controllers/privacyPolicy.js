PsychicSource.controller('PrivacyCtrl',function($scope,$ionicScrollDelegate){
  
  $scope.registerEventListeners = function(){
    $scope.scrollToTop();
  };

  $scope.scrollToTop = function() {
    $('a.go-top').click(function(){
      $ionicScrollDelegate.scrollTop(true);
    });
  };


  $scope.registerEventListeners();

});

