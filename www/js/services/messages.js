angular.module('PsychicSource.Messages', [])
.factory('MessagesService',function($q,$state,$rootScope,$timeout,Popup,$ionicLoading,$ionicHistory,$localstorage,USER_ROLES, AuthService,AjaxService){
  var messages = {   
      currentPage:0,
      MemberMessages:null,
      MsgCounts:0,
      PageCounts:0,
      messagesListPrefix:'MsgList-',
    storeMessageList:function(data){
        $localstorage.setObject(messges.messagesListPrefix + AuthService.id(),data);
        messages.readMsgList();
    },
    readMsgList:function(){
        var info_Messages = $localstorage.getObject(messges.messagesListPrefix+ AuthService.id());
        messages.currentPage= info_Messages.CurrentPage;
        messages.MemberMessages= info_Messages.MemberMessages;
        messages.MsgCounts= info_Messages.MessageCount;
        messages.PageCounts= info_Messages.PageCount;
    },
    msgObj: function(){
        return {
         currentPage:messages.currentPage,
         MemberMessages:menubar.MemberMessages,
         MsgCounts:messages.MsgCounts,
         PageCounts:messages.PageCounts
        }
      },
    updateMsgList:function(msgData){
        var data =$localstorage.getObject(messges.messagesListPrefix+ AuthService.id());
      $.extend(data,msgData);
      $localstorage.setObject(messges.messagesListPrefix + AuthService.id(),data);
      summary.loadUserSummary(data);
      },
    getMsgPerConversation:function(conversationid){
        $ionicLoading.show({template: 'Loading...'});
        d = $q.defer();
        AjaxService.getMessagesPerConversation(AuthService.id(),conversationid).then(function(res){
        d.resolve(res.data);
      },function(err){
        $ionicLoading.hide();
        if(err.status === 401){
          $rootScope.$broadcast('user:logout:complete');
        } else {
          Popup.show('alert', {
            title: 'Error',
            template: 'Error while retrieving Messges.'
          });
          d.reject(err);
        }
      });
      return d.promise;
    },
    getMessages: function(messagestatusid) {
        $ionicLoading.show({template: 'Loading...'});
        d = $q.defer();
        AjaxService.getMessagesList(AuthService.id(),messagestatusid).then(function(res){
        messages.storeMessageList(res.data);        
        $ionicLoading.hide();
        d.resolve(messages.msgObj());
      },function(err){
        $ionicLoading.hide();
        if(err.status === 401){
          $rootScope.$broadcast('user:logout:complete');
        } else {
          Popup.show('alert', {
            title: 'Error',
            template: 'Error while retrieving Messges.'
          });
          d.reject(err);
        }
      }); 
      return d.promise;
    }
  };
messages.readMsgList();
  var result = {
   info_member: messages.readMsgList(),
   currentPage: function(){return messages.currentPage},
   PageCounts: function(){return messages.PageCounts},
   MemberMessages: function(){return messages.MemberMessages},
   MsgCounts: function(){return messages.MsgCounts},
    
  };
  return result;
});
