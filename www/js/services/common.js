angular.module('PsychicSource.Common', [])
.factory('CommonService', function($q, $http, AjaxService, GTM){
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
    },
    externalNoPrompt: function($event){
      GTM.trackEvent('LinkNoPrompt', 'open', $event.currentTarget.dataset.href, 1);
      window.open($event.currentTarget.dataset.href,'_system','location=yes');
    },
    callNow: function(){
      GTM.trackEvent('Calls', 'call', this.callNowNumber, 1);
      window.open('tel:' + this.callNowNumber, '_system', 'location=yes');
      return false;
    },
  };
  return commonHandler;
});
