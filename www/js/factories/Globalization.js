(function(){
    "use strict";
    module = angular.module('PsychicSource.Language', []);
    module.factory("Language", function(Logger, ConfigService, $ionicPlatform, $ionicHistory){
        var init = function() {
            // deviceLanguage
            navigator.globalization.getPreferredLanguage(function (language) {
                deviceLanguage = language.value;
            });
    
           
        }
    });
  }());
  