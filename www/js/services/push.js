angular.module('PsychicSource.Push', [])
.factory('PushNotificationService',function(){
  var push = {
    init: function() {
      return PushNotification.init({
        android: {
            senderID: "117405771847"
        },
        ios: {
            alert: "true",
            badge: "true",
            sound: "true"
        }
      });
    }
  };

  return push;
});

