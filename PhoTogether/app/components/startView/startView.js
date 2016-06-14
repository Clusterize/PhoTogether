"use strict";
let frame = require("ui/frame");

function onPageLoaded(args) {
//    var page = args.object;
//    page.bindingContext = model;
}

function listEvents() {
    frame.topmost().navigate("components/eventsListView/eventsList");
}

function upload() {
    
}

exports.onPageLoaded = onPageLoaded;
exports.upload = upload;
exports.listEvents = listEvents;
