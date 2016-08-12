PsychicSource.controller('FavsCtrl',function($scope, FavsService, ConfigService){
  $scope.imagePath = ConfigService.assetUrlImages;
  $scope.profileUrl = ConfigService.profileUrl;
  $scope.favs = FavsService.all();

  $scope.refresh = function(){
    $scope.favs = FavsService.all();
  };

  $scope.remove = function(index){
    FavsService.remove(index);
  };

  $scope.availableIM = function(fav){
    if(fav.ServiceAvailable && fav.IsOnIM && fav.IMStatusID === 2 && !fav.OnPhoneConference){
      return 'font-green';
    }
    else{
      return 'font-red';
    }
  };
  $scope.availablePhone = function(fav){
    if(fav.ServiceAvailable && fav.IsOnPhone && fav.IsPhoneLogin && !fav.OnPhoneConference){
      return 'font-green';
    }
    else{
      return 'font-red';
    }
  };

});

