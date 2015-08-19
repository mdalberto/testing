/**
 * Author: hollyschinsky
 * twitter: @devgirfl
 * blog: devgirl.org
 * more tutorials: hollyschinsky.github.io
 */

// Race condition found when trying to use $ionicPlatform.ready in app.js and calling register to display id in AppCtrl.
// Implementing it here as a factory with promises to ensure register function is called before trying to display the id.
//factory for processing push notifications.
angular.module('starter.services', [])
   .factory('PushProcessingService', function() {
        function onDeviceReady() {
            //alert("my friend");
            console.info('NOTIFY  Device is ready.  Registering with GCM server');
            
            //register with google GCM server
            var pushNotification = window.plugins.pushNotification;
            pushNotification.register(gcmSuccessHandler, gcmErrorHandler,{"senderID":"1084822998549","ecb":"onNotificationGCM"});
        }
        function gcmSuccessHandler(result) {
            console.info('NOTIFY  pushNotification.register succeeded.  Result = '+result)
        }
        function gcmErrorHandler(error) {
            console.error('NOTIFY  '+error);
        }

    
        return {
            initialize: function() {
                console.info('NOTIFY  initializing');
                document.addEventListener('deviceready', onDeviceReady, false);
            },
            registerID: function(id) {
                //Insert code here to store the user's ID on your notification server.
                //You'll probably have a web service (wrapped in an Angular service of course) set up for this.
                //For example:
                MyService.registerNotificationID(id).then(function(response){
                    if (response.data.Result) {
                    	console.info(id);
                        console.info('NOTIFY  Registration succeeded');
                    } else {
                        console.error('NOTIFY  Registration failed');
                    }
                });
            },
            //unregister can be called from a settings area.
            unregister: function() {
                console.info('unregister')
                var push = window.plugins.pushNotification;
                if (push) {
                    push.unregister(function () {
                        console.info('unregister success')
                    });
                }
            }
        }
    });
 
    // ALL GCM notifications come through here.
    function onNotificationGCM(e) {
        console.log('EVENT -&gt; RECEIVED:' + e.event + '');
        //alert("my friend2");
        switch( e.event )
        {
            case 'registered':
                if ( e.regid.length > 0 )
                {
                    console.log('REGISTERED with GCM Server -&gt; REGID:' + e.regid);
                    //alert(e.regid);
                    //call back to web service in Angular.
                    //This works for me because in my code I have a factory called
                    //      PushProcessingService with method registerID
                    var elem = angular.element(document.querySelector('[ng-app]'));
                    var injector = elem.injector();
                    var myService = injector.get('PushProcessingService');
                    myService.registerID(e.regid);
                }
                break;
     
            case 'message':

                //  alert('message = '+e.message+' msgcnt = '+e.msgcnt); 
                break;
     
            case 'error':
                console.log('ERROR -&gt; MSG:' + e.msg + '');
                break;
     
            default:
                console.log('EVENT -&gt; Unknown, an event was received and we do not know what it is');
                break;
        }
}    
