(function(){
  "use strict";
  module = angular.module('PsychicSource.GTM', []);
  module.factory("GTM", function(Logger, ConfigService, $ionicPlatform, $ionicHistory){
    var GTM = {
      plugin: null,
      data: {},
      tagManagerUnsupported: function(){return this.plugin === null;},
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
        document.addEventListener("deviceready", onDeviceReady, false);
        Logger.log("Waiting for device ready...");
        function onDeviceReady(){
          GTM.plugin = cordova.require('com.jareddickson.cordova.tag-manager.TagManager');
          GTM.plugin.init(Logger.success, Logger.error, trackingId, intervalPeriod);
          Logger.log("GTM intialized");

          //Workaround to track the first view when the app opens.
          GTM.trackPage($ionicHistory.currentView().url);
        }
      },
      trackEvent:  function(category, action, label, value){
        if(this.tagManagerUnsupported()) { return; }
        var data = {
          'event': 'interaction',
          'target': category,
          'action': action,
          'target-properties': label,
          'value': value,
        };
        GTM.pushEvent(data);
      },
      trackPage: function(url){
        if(this.tagManagerUnsupported()) { return; }
        var data = {
          'event': 'content-view',
          'content-name': url,
        };
        GTM.pushEvent(data);
      },
      pushEvent(data){
        angular.extend(data, GTM.data);
        Logger.log(`pushEvent - data: ${JSON.stringify(data)}`);
        this.plugin.pushEvent(Logger.success, Logger.error, data);
        this.flush();
      },
      startSession: function(userId){
        Logger.log(`setUserId - userId: ${userId}`);
        GTM.data = {'userId': userId};
      },
      endSession: function(){
        GTM.data = {};
      },
      flush: function(){
        if(this.tagManagerUnsupported()) { return; }
        this.plugin.dispatch();
      }
    };

    GTM.init();
    return GTM;
  });
}());
