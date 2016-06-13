var modelModule = require("./homeView-service");
var model = modelModule.photoAlbumModel;

function onPageLoaded(args) {
  var page = args.object;
  page.bindingContext = model;
}

exports.onPageLoaded = onPageLoaded;
