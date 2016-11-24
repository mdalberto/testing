module = angular.module('PsychicSource.GTM', []);
module.factory("GTM", function(Logger, ConfigService, $ionicPlatform, $ionicHistory){
  var TagManager = {
    debugger: Logger,
    tagManagerUnsupported: function(){return typeof this.tagManager === 'undefined';},
    init:  function(){
      var intervalPeriod = 30; // seconds
      var trackingId;
      if(ionic.Platform.isIOS()){
        trackingId = ConfigService.gtmiOSContainer;
      }else if(ionic.Platform.isAndroid()){
        trackingId = ConfigService.gtmAndroidContainer;
      }
      else{
        Logger.log("This platform doesn't support Google Tag Manager Plugin");
        return;
      }
      document.addEventListener("deviceready", onDeviceReady.bind(this), false);
      Logger.log("Waiting for device ready...");
      function onDeviceReady(){
        this.tagManager = cordova.require('com.jareddickson.cordova.tag-manager.TagManager');
        this.tagManager.init(Logger.success, Logger.error, trackingId, intervalPeriod);
        Logger.log("GTM intialized");

        //Workaround to track the first view when the app opens.
        this.trackPage($ionicHistory.currentView().url);
      }
    },
    event:  function(){
      if(this.tagManagerUnsupported()) return;
      data = {
          'userId': '1338',
          'dimension1':'4000',
          'event': 'interaction',
          'target': 'event categorie11',
          'action': 'event action11',
          'target-properties': 'event label11',
          'value': '50000',
      };
      this.tagManager.pushEvent(Logger.success, Logger.error, data);
      this.flush();
    },
    trackPage: function(url){
      if(this.tagManagerUnsupported()) return;
      data = {
          'event': 'content-view',
          'content-name': url,
          'userId': '1338',
          'dimension1':'4000',
      };
      this.tagManager.pushEvent(Logger.success, Logger.error, data);
      this.flush();
    },
    flush: function(){
      this.tagManager.dispatch();
    }
  };

  TagManager.init();
  return TagManager;
});
