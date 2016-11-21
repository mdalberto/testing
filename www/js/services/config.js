angular.module('PsychicSource.Config', [])
.factory('ConfigService', ['$window', function($window,_) {

  var environment = 'production';

  function getConfigObject(env){
    switch(env){
      case 'test':
        var config = {
          gcmApiKey: "117405771847",
          enableCorsProxy: false,
          baseUrl: 'https://testcontentservice.vseinc.com/elapi/',
          assetUrl: 'http://psychicsource.com/',
          gaTrackingId: 'UA-87400817-1',
          gtmAndroidContainer: 'GTM-MVD9D37',
          gtmiOSContainer: 'GTM-K7M7ZVN'
        };
        return config;
      case 'dev':
        var config = {
          enableCorsProxy: true,
          baseUrl: 'http://localhost:1337/testcontentservice.vseinc.com/elapi/',
          assetUrl: 'http://psychicsource.com/',
        };
        return config;
      case 'rc':
        var config = {
          enableCorsProxy: false,
          baseUrl: 'https://rccontentservice.vseinc.com/elapi/',
          assetUrl: 'http://www.psychicsource.com/',
        }
      case 'production':
        var config = {
          gcmApiKey: "766226653480",
          enableCorsProxy: false,
          baseUrl: 'https://contentservice.vseinc.com/elapi/',
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

