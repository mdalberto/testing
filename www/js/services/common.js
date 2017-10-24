angular.module('PsychicSource.Common', [])
.factory('CommonService', function($q, $http, AjaxService, GTM, Popup){
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
      GTM.trackEvent('linknoprompt', 'open', $event.currentTarget.dataset.href, 1);
      window.open($event.currentTarget.dataset.href,'_system','location=yes');
    },
    callNow: function(){
      GTM.trackEvent('calls', 'call', this.callNowNumber, 1);
      window.open('tel:' + this.callNowNumber, '_system', 'location=yes');
      return false;
    },
    external: function($event){
      var title = 'You are about to leave the app and go to PsychicSource Website';
      var regex = /http(.*)psychicsource.com(.*)$/i;

      if($event.currentTarget.dataset.href.match(regex) === null){
        title = 'You are about to leave the PsychicSource App';
      }

      var confirmPopup = Popup.show('confirm', {
        title: title,
        template: 'Are you sure that you want to do this?'
      });

      confirmPopup.then(function(res){
        if(res){
          if(typeof($event.currentTarget.dataset.eventCategory) !== 'undefined'){
            var event_category = $event.currentTarget.dataset.eventCategory;
            var event_action = 'click';
            var event_label = $event.currentTarget.dataset.href;
            if($event.currentTarget.dataset.eventCategory === 'favorite advisors chat' ||
                $event.currentTarget.dataset.eventCategory === 'favorite advisors video'){
              event_label = event_label.split("?")[0];
            }

            //Only track links that were on the spec
            GTM.trackEvent(event_category, event_action, event_label, 1);
          }

          window.open($event.currentTarget.dataset.href,'_system','location=yes');
        }
      });
    },
  };
  return commonHandler;
});
