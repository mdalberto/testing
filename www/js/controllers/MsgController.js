PsychicSource.controller('MsgCtrl',function($rootScope, $scope, ConfigService,$ionicActionSheet, AjaxService, AuthService,MessagesService, $ionicLoading, Popup, GTM, CommonService){
$scope.Msgcounts=0;
$scope.MemberMessages=null;
$scope.currentPage=0;
$scope. PageCounts=0;
$scope.filterBtnText="Filters";
$scope.sortBtnText="Sorts";
$scope.imagePath = ConfigService.assetUrlImages;


$scope.showFilters=function(){
    var filters=$ionicActionSheet.show({
        buttons:[
            {text:'All'},
            {text:'Unread'}
        ],
        titleText:'Filters',
        cancelText:'Cancel',
        cancel:function(){
            //cancel action sheet
        },
        buttonClicked:function(index){
            if(index===0){
                $scope.filterBtnText="All";
                return true;
            }else if(index===1){
                $scope.filterBtnText="Unread";
                return true;
            }
        }
    });
}
$scope.showSorts=function(){
    var filters=$ionicActionSheet.show({
        buttons:[
            {text:'By Date'},
            {text:'By Name'}
        ],
        titleText:'Sorts',
        cancelText:'Cancel',
        cancel:function(){
            //cancel action sheet
        },
        buttonClicked:function(index){
            if(index===0){
                $scope.sortBtnText="By Date";
                return true;
            }else if(index===1){
                $scope.sortBtnText="By Name";
                return true;
            }
        }
    });
}
$scope.refresh = function(){
   

    //msgStatusId= 3 for unread and 0 for all
   //$scope.getMessageList();
  };
  $scope.refresh();
$scope.getMessageList=function(){
    $scope.MemberMessages = null
    AjaxService.getMessagesList(AuthService.id(),3).then(function(res){
        $scope.MemberMessages = res.data;
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
/* $scope.isMessages=function(){
    if(Msgcounts===0){
        //show no messges block.
        return false;
    }else{
        return true;
    }
}
$scope.isMarketingMsg=function(MessageTypeId){
    if(MessageTypeId===MSGTYPE.Marketing){
        return true;
    }
    return false;
}
$scope.isMsgCanDelete=function(MessageStatusId,statusCase){
    switch(statusCase){
        case 'save':
            if(MessageStatusId===MSGSTATUS.Saved){
                return true;
            }
            return false;
            break;
        case 'read':
            if(MessageStatusId===MSGSTATUS.UnRead || MessageStatusId===MSGSTATUS.Read ){
                return true;
            }
            break;
    }
   
}
$scope.isShowUnreadMsgBtn=function(MessageStatusId){
    if(MessageStatusId===MSGSTATUS.UnRead ){
        return true;
    }
    return false;
    
}
 */

});