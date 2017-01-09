angular.module('PsychicSource.Push', [])
.factory('PushNotificationService', function($state, ConfigService, Popup, GTM){
  var push = {
    init: function() {
      var notificationHandler = PushNotification.init({
        android: {
            senderID: ConfigService.gcmApiKey
        },
        ios: { alert: true, badge: true, sound: true, clearBadge: true}
      });

      notificationHandler.on('notification', function(data) {
        if(data.additionalData !== null &&
           (data.additionalData.coldstart === true || data.additionalData.foreground === false)){
              GTM.trackEvent('app', 'open', 'from notification', 1);
        }

        Popup.show('alert', {
          title: data.title,
          template: data.message
        });
        $state.go('app.member-home');

        notificationHandler.finish(function() {
          // console.log('finish successfully called');
        });
      });

      notificationHandler.setApplicationIconBadgeNumber(function() {
           // console.log('success');
      }, function() {
           // console.log('error');
      }, 0);

      return notificationHandler;
    }
  };
  return push;
});

