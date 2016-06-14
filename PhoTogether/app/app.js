"use strict";
var application = require('application');
application.mainModule = './components/startView/startView';
application.cssFile = "./app.css";

// START_CUSTOM_CODE_nativeScriptApp
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
//let Analytics = require('nativescript-telerik-analytics');

application.on(application.launchEvent, function(context) {
    // Initialize the Analytics plugin and start a new session when the application starts
    //Analytics.init({ appId: 'xhpeizqd4hnqef1n' });
    //Analytics.start();
});

// END_CUSTOM_CODE_nativeScriptApp
application.start();
