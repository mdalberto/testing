PsychicSource.controller('FavsCtrl',function($scope, FavsService, ConfigService){
  $scope.imagePath = ConfigService.assetUrlImages;
  $scope.favs = FavsService.all();

  $scope.refresh = function(){
    $scope.favs = FavsService.all();
  }
  $scope.remove = function(index){
    FavsService.remove(index);
  }
});

