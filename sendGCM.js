var gcm = require('node-gcm');
var message = new gcm.Message();
 
//API Server Key
var sender = new gcm.Sender('AIzaSyB8ksHTY7yuDUdkfKPjL32KNhFmSJIqfR8');
var registrationIds = [];
 
// Value the payload data to send...
message.addData('message', 'Hello Cordova!');
message.addData('title','Push Notification Sample' );
message.addData('msgcnt','2'); // Shows up in the notification in the status bar
message.addData('soundname','beep.wav'); //Sound to play upon notification receipt - put in the www folder in app
message.collapseKey = 'demo';
message.delayWhileIdle = true; //Default is false
message.timeToLive = 3000;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified.
 
// At least one reg id/token is required
registrationIds.push('APA91bFMSEZKBHAnxVIjQXkr8jSqHwkICqUTi_aMX08FdJS1DjIfcVXp7CygJ1me-4EZaO65cFJBhDRg7wxJamBM0-dqdA42UhO6QTPdRgV8lXyuGCizlHAqoyJTTM90rkOcwYv-000-X0zU8j1CXiEyowtYl8YDcw')

/**
 * Parameters: message-literal, registrationIds-array, No. of retries, callback-function
 */
sender.send(message, registrationIds, 4, function (result) {
    console.log(result); //null is actually success
});
