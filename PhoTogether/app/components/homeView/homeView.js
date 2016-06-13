"use strict";

var modelModule = require("./homeView-service");
var model = modelModule.photoAlbumModel;

function onPageLoaded(args) {
  var page = args.object;
  page.bindingContext = model;
    
    throw new Exception("Test exception");
}

exports.onPageLoaded = onPageLoaded;
