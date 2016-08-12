PsychicSource.controller('FavsCtrl',function($scope, FavsService, ConfigService){
  $scope.imagePath = ConfigService.assetUrlImages;
  $scope.favs = FavsService.all();

  $scope.refresh = function(){
    $scope.favs = FavsService.all();
  };

  $scope.remove = function(index){
    FavsService.remove(index);
  };

  $scope.availableIM = function(fav){
    var css_class = fav.IsOnIM === true ? 'font-green' : 'font-red';
    return css_class;
  };
  $scope.availablePhone = function(fav){
    var css_class = fav.IsOnPhone === true ? 'font-green' : 'font-red';
    return css_class;
  };

});

