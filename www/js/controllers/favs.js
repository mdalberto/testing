PsychicSource.controller('FavsCtrl',function($rootScope, $scope, ConfigService, AjaxService, AuthService, $ionicLoading, Popup, GTM, CommonService){
  $scope.imagePath = ConfigService.assetUrlImages;
  $scope.profileUrl = ConfigService.profileUrl;
  $scope.refresh = function(){
    $scope.favs = null;
    AjaxService.getFavorites(AuthService.id()).then(function(res){
      $scope.favs = res.data;
    }, function(error){
      if(error.status === 401){
        $rootScope.$broadcast('user:logout:complete');
        return;
      }
      Popup.show('alert', {
        title: 'Update operation failed!',
        template: 'Please verify you are connected to the internet'
      });
    });
  };
  $scope.refresh();

  $scope.remove = function(index){
    var confirmPopup = Popup.show('confirm', {
      title: 'Favorite Advisors',
      template: '<center>Are you sure you want to remove this Advisor?</center>'
    });

    confirmPopup.then(function(res){
      if(res){
        selectedAdvisor = $scope.favs[index];
        GTM.trackEvent('favorite advisors remove', 'click', selectedAdvisor.AdvisorName + ' x' + selectedAdvisor.AdvisorExtension, 1);
        advisor = {
          "FavoriteAdvisorId":selectedAdvisor.FavoriteAdvisorId,
          "AdvisorId":selectedAdvisor.AdvisorId,
          "Notes":"removed from mobile app",
          "active":false,
          "isAlert":true};
          AjaxService.saveFavorite(AuthService.id(), advisor).then(function(res){
            $scope.favs = res.data;
          }, function(error){
            if(error.status === 401){
              $rootScope.$broadcast('user:logout:complete');
              return;
            }
            Popup.show('alert', {
              title: 'Update operation failed!',
              template: 'Please verify you are connected to the internet'
            });
          });
      }
    });
  };

  $scope.video_external = function(event){
    if( ionic.Platform.isIOS() )
    {
      var major_version = parseInt(ionic.Platform.version().toString().split('.')[0]);
      if(major_version <= 10){
        Popup.show('alert', {
          template: 'Sorry, video readings are not supported on iOS devices, but are coming soon. Please try another device.',
          buttons: [ { text: 'Close', type: 'button-positive' } ]
        });
        return;
      }
    }
    CommonService.external(event);
  };

  $scope.availableIM = function(fav){
    if(fav.ServiceAvailable === 2 &&
       fav.IsOnIM &&
       fav.IMStatusID === 1 &&
       !fav.OnPhoneConference &&
       !fav.OnVideoConference
      ){
      return 'font-green';
    }
    else{
      return 'font-red';
    }
  };

  $scope.availablePhone = function(fav){
    if(fav.ServiceAvailable === 2 &&
       fav.IsOnPhone &&
       fav.IsPhoneLogIn &&
       !fav.OnPhoneConference &&
       !fav.OnVideoConference
      ){
      return 'font-green';
    }
    else{
      return 'font-red';
    }
  };

  $scope.availableVideo = function(fav){
    if(fav.ServiceAvailable === 2 &&
       fav.IsOnVideo &&
       fav.IsVideoLogIn &&
       !fav.OnPhoneConference &&
       !fav.OnVideoConference
      ){
      return 'font-green';
    }
    else{
      return 'font-red';
    }
  };

});