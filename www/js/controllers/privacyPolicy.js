PsychicSource.controller('PrivacyCtrl',function($scope,$ionicScrollDelegate,$timeout){
  
  $scope.registerEventListeners = function(){
    $scope.scrollToTop();
  };

  $scope.scrollToTop = function() {
    $('a.go-top').click(function(){
      $ionicScrollDelegate.scrollTop(true);
    });
  };

  $scope.scrollTo= function(){
   $timeout(function(){
     $ionicScrollDelegate.anchorScroll(true);
   },200);
  };

  $scope.registerEventListeners();

});

