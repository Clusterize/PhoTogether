var observable = require("data/observable");
var imageSourceModule = require("image-source");
var fileSystemModule = require("file-system");
var observableArrayModule = require("data/observable-array");
var enums = require("ui/enums");
var cameraModule = require("camera");
var everliveClient = require("../../services/everlive-client");

var galleryModel = new observable.Observable();



Object.defineProperty(galleryModel, "photoItems", {
    get: function () {
		var backendArray = new observableArrayModule.ObservableArray();
		
		everliveClient.getImages(this.event).then(function(data){
			 data.forEach(function (fileMetadata) {
				 console.log(JSON.stringify(fileMetadata));
                        backendArray.push(fileMetadata);
             });
		})
		
        return backendArray;
    },
    enumerable: true,
    configurable: true
});

galleryModel.tapAction = function () {
    
};

exports.galleryModel = galleryModel;
