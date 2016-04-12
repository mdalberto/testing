angular.module('PsychicSource.Push', [])
.factory('PushNotificationService',function($ionicPopup,$state,ConfigService){
  var push = {
    badgeCount: 0,
    init: function() {
      var notificationHandler = PushNotification.init({
        android: {
            senderID: ConfigService.gcmApiKey
        },
        ios: {
            alert: true,
            badge: true,
            sound: true,
            clearBadge: true
        }
      });

      notificationHandler.on('notification', function(data) {
            // data.message,
            // data.title,
            // data.count,
            // data.sound,
            // data.image,
            // data.additionalData
        
        var pendingToRead = (push.badgeCount > 0) ? (push.badgeCount + 1) : 1;
        push.badgeCount = pendingToRead;

        var alertPopup = $ionicPopup.alert({
          title: data.title,
          template: data.message
        });
        $state.go('app.member-home'); 

        notificationHandler.setApplicationIconBadgeNumber(function() {
             // console.log('success');
        }, function() {
             // console.log('error');
        }, pendingToRead);

        notificationHandler.finish(function() {
          // console.log('finish successfully called');
        });
          
      });

      return notificationHandler; 
    }
  };

  return push;
});

