"use strict";

let frame = require("ui/frame");
let modelModule = require("./events-list-service");
let model = modelModule.eventsListViewModel;

function onPageLoaded(args) {
    var page = args.object;
	var event = {
		title: '[PhoTogether] bla bla',
        name: '[PhoTogether] bla bla',
        startDate: new Date('2015-01-01T00:00:00Z'),
        endDate: new Date('2016-01-01T00:00:00Z')
    };
	model.eventsList.push(event);
    page.bindingContext = model;
    model.getEvents();
    
}

function eventTap(args) {
	console.log("navigate");
    frame.topmost().navigate({
		moduleName:"components/galleryView/galleryView",
		context: model.eventsList.getItem(args.index)
    });
}

module.exports = {
    onPageLoaded,
    eventTap
};