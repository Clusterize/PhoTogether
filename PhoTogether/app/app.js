var application = require('application');
application.mainModule = './components/homeView/homeView';
application.cssFile = "./app.css";
// START_CUSTOM_CODE_nativeScriptApp
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_nativeScriptApp
application.start();
