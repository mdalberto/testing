angular.module('PsychicSource.Config', [])
.factory('ConfigService', ['$window', function($window,_) {

  var environment = 'test';

  function getConfigObject(env){
    switch(env){
      case 'test':
        var config = {
          enableCorsProxy: false,
          baseUrl: 'https://testcontentservice.vseinc.com/elapi/',
          assetUrl: 'http://psychicsource.com/',
        };
        return config; 
      case 'dev':
        var config = {
          enableCorsProxy: true,
          baseUrl: 'http://localhost:1337/testcontentservice.vseinc.com/elapi/',
          assetUrl: 'http://testrm.psychicsource.com/',
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
          enableCorsProxy: false,
          baseUrl: 'https://contentservice.vseinc.com/elapi/',
          assetUrl: 'http://www.psychicsource.com/',
        }
        return config;
      default:
        return {};
    } 
  }
  function getShared(config) {
    var shared = {
      assetUrlImages: config.assetUrl + 'images/psychics/'
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

