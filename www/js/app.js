/**
 * Author: hollyschinsky
 * twitter: @devgirfl
 * blog: devgirl.org
 * more tutorials: hollyschinsky.github.io
 */
var starter = angular.module('starter', ['ionic', 'ngCordova', 'starter.services'])
.run(function(PushProcessingService) {
   //run once for the app
   PushProcessingService.initialize();
});



