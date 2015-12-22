angular.module('PsychicSource.Push', [])
.factory('PushNotificationService',function($ionicPopup,$state){
  var push = {
    init: function() {
      var notificationHandler = PushNotification.init({
        android: {
            senderID: "117405771847"
        },
        ios: {
            alert: "true",
            badge: "true",
            sound: "true"
        }
      });

      notificationHandler.on('notification', function(data) {
            // data.message,
            // data.title,
            // data.count,
            // data.sound,
            // data.image,
            // data.additionalData
          var alertPopup = $ionicPopup.alert({
            title: data.title,
            template: data.message
          });
          $state.go('app.member-home'); 
            
        });

      return notificationHandler; 
    }
  };

  return push;
});

