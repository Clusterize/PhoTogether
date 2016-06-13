"use strict";

let frame = require("ui/frame");
let modelModule = require("./events-list-service");
let model = modelModule.eventsListViewModel;

function onPageLoaded(args) {
    var page = args.object;
    page.bindingContext = model;
    model.getEvents();
}

function eventTap(args) {
    frame.topmost().navigate({
        view: "../galleryView/galleryView",
        context: model.eventsList.getItem(args.index)
    });
}

module.exports = {
    onPageLoaded,
    eventTap
};