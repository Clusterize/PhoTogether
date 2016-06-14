"use strict";

let frame = require("ui/frame");
let modelModule = require("./events-list-service");
let photosService = require("../../services/photos-service").photosService;
let model = modelModule.eventsListViewModel;

function onPageLoaded(args) {
    let page = args.object;
    model = new modelModule.EventsListViewMovel();
    page.bindingContext = model;
    model.getEvents();
    var event = {
        name: '[PhoTogether] bla bla',
        startDate: new Date('2015-01-01T00:00:00Z'),
        endDate: new Date('2016-01-01T00:00:00Z')
    };
    
    if (page.ios) {
        frame.topmost().ios.navBarVisibility = "always";
        page.ios.title = 'Shared Events';
    }
    model.getEvents()
        .then(() => {
            model.eventsList.forEach((event) => {
                photosService.getDevicePhotos(event);
            });
        });

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