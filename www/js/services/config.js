angular.module('PsychicSource.Config', [])
.factory('ConfigService', ['$window', function($window,_) {

  var environment = 'dev';

  function getConfigObject(env){
    switch(env){
     
      case 'test':
        var config = {
          gcmApiKey: "117405771847",
          enableCorsProxy: false,
          baseUrl: 'https://testapi.vseinc.com/',
          assetUrl: 'http://psychicsource.com/',
          gaTrackingId: 'UA-87400817-1',
          gtmAndroidContainer: 'GTM-MVD9D37',
          gtmiOSContainer: 'GTM-K7M7ZVN',
          debug: true
        };
        return config;
      case 'dev':
        var config = {
          gcmApiKey: "117405771847",
          enableCorsProxy: false,
          baseUrl: 'https://devapi.vseinc.com/',
          assetUrl: 'http://psychicsource.com/',
          gaTrackingId: 'UA-87400817-1',
          gtmAndroidContainer: 'GTM-MVD9D37',
          gtmiOSContainer: 'GTM-K7M7ZVN',
          debug: true
        };
        return config;
      case 'rc':
        var config = {
          gcmApiKey: "117405771847",
          enableCorsProxy: false,
          baseUrl: 'https://rcapi.vseinc.com/',
          assetUrl: 'http://www.psychicsource.com/',
        }
      case 'production':
        var config = {
          gcmApiKey: "766226653480",
          enableCorsProxy: false,
          baseUrl: 'https://api.vseinc.com/',
          assetUrl: 'http://www.psychicsource.com/',
          gaTrackingId: 'UA-1433166-15',
          gtmAndroidContainer: 'GTM-N89RS6L',
          gtmiOSContainer: 'GTM-KJHSCRH'
        }
        return config;
      default:
        return {};
    }
  }
  function getShared(config) {
    var shared = {
      assetUrlImages: config.assetUrl + 'images/psychics/',
      profileUrl: config.assetUrl + 'our-psychic/profile?id=',
      environment: environment
    }
    return shared;
  };
  function extendConfig(configObject,additionalAttributesObject) {
   $.extend(configObject,additionalAttributesObject);
   return configObject;
  }
  var config = getConfigObject(environment);
  var shared = getShared(config);
  return extendConfig(config,shared);
}]);