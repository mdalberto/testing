#!/usr/bin/env node

// Save hook under `project-root/hooks/before_prepare/`
//
// Don't forget to install xml2js using npm
// `$ npm install xml2js`

var fs = require('fs');
var xml2js = require('xml2js');
var conf_file = 'www/config.xml';

// Read config.xml
fs.readFile(conf_file, 'utf8', function(err, data) {
  if(err) {
    return console.log(err);
  }
  
  // Get XML
  var xml = data;
  
  // Parse XML to JS Obj
  xml2js.parseString(xml, function (err, result) {
    if(err) {
      return console.log(err);
    }
    
    // Get JS Obj
    var obj = result;
    
    // ios-CFBundleVersion doen't exist in config.xml
    if(typeof obj['widget']['$']['ios-CFBundleVersion'] === 'undefined') {
      obj['widget']['$']['ios-CFBundleVersion'] = "0.0.0";
    }
    
    // android-versionCode doen't exist in config.xml
    if(typeof obj['widget']['$']['android-versionCode'] === 'undefined') {
      obj['widget']['$']['android-versionCode'] = 0;
    }


    // Get the version string (format is x.y.z) and split it to its components
	var currentVersion = obj['widget']['$']['ios-CFBundleVersion'];
	var currentVersionComponents = currentVersion.split(".");

	var first = currentVersionComponents[0];
	var second = currentVersionComponents[1];
	var third = currentVersionComponents[2];
	
	if (third < 9) {
		third ++;	
	} else {
		if (second < 9) {
			second ++;
			third = 0;
		} else {
			if (first < 9) {
				first ++;
				second = 0;
				third = 0;
			}
		}
	}


	// rebuild the version string, and set it on the object
	var newVersion = first + "." + second + "." + third;

    
    // Increment build numbers (separately for iOS and Android)
    obj['widget']['$']['ios-CFBundleVersion'] = newVersion;
    obj['widget']['$']['android-versionCode']++;
    
    // Build XML from JS Obj
    var builder = new xml2js.Builder();
    var xml = builder.buildObject(obj);
    
    // Write config.xml
    fs.writeFile(conf_file, xml, function(err) {
      if(err) {
        return console.log(err);
      }
      
      console.log('Build number successfully incremented');
    });
    
  });
});