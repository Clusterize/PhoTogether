var modelModule = require("./galleryView-service");
var frame = require("ui/frame");
var model = modelModule.galleryModel;

function onPageLoaded(args) {
  var page = args.object;
  page.bindingContext = model;
}

function onNavigatingTo(args){
	model.set("event",args.object.navigationContext);
}

function eventTap(args) {
	console.log(args.index);
	console.log(model.photoItems);
    frame.topmost().navigate({
		moduleName:"components/imageView/imageView",
		context: model.photoItems.getItem(args.index)
    });
}

exports.onPageLoaded = onPageLoaded;
exports.onNavigatingTo = onNavigatingTo;
exports.eventTap = eventTap;