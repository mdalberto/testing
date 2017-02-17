module = angular.module('PsychicSource.Logger', []);
module.service("Logger", function(ConfigService){
  if(ConfigService.debug !== true){
    this.log = this.success = this.error = function(){};
    return;
  }
  console.log(`Environment ${ConfigService.environment} - Debug Messages On`);
  this.log = function(e){
    console.log('Log: '+e);
  };
  this.success = function(e){
    console.log('Success: '+e);
  };
  this.error = function(e){
    console.log('Error: '+e);
  };
});
