PsychicSource.controller('FavsCtrl',function($scope, FavsService, ConfigService, AjaxService, AuthService, $ionicLoading){
  $scope.imagePath = ConfigService.assetUrlImages;
  $scope.profileUrl = ConfigService.profileUrl;
  $scope.refresh = function(){
    //$ionicLoading.show({template: 'Loading Favorite Advisors...'});
    $scope.favs = null
    AjaxService.getFavorites(AuthService.id(),$scope.preferences).then(function(res){
      $ionicLoading.hide();
      $scope.favs = res.data;
    }, function(error){
      //$ionicLoading.hide();
      var alertPopup = $ionicPopup.alert({
        title: 'Update operation failed! (2)',
        template: 'Please verify you are connected to the internet'
      });
    });
  };
  $scope.refresh();

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

