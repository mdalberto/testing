angular.module('PsychicSource.Common', [])
.factory('CommonService',function($q,$http,AjaxService){
  var commonHandler = {
    minimumBalance: null,
    callNowNumber: function(){
      if(ionic.Platform.isAndroid())
        return "8669040177";
      else
        return "8668842981";
    },
   setMinimumBalance: function(data) {
      commonHandler.minimumBalance = parseFloat(data.data.minPurchasedBalance).toPrecision();
    }
  };
  return commonHandler;
});
