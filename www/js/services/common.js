angular.module('PsychicSource.Common', [])
.factory('CommonService',function($q,$http,ConfigService){
  var commonHandler = {
    callNowNumber: function(){
      if(ionic.Platform.isAndroid())
        return "8669040177";
      else
        return "8668842981";
    }
  };
  return commonHandler;
});
