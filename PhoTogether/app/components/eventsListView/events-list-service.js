"use strict";

let Observable = require("data/observable").Observable;
let ObservableArray = require("data/observable-array").ObservableArray;
let eventsService = require("../../services/events-service").eventsService;
let _ = require("lodash");

class EventsListViewMovel extends Observable {
    constructor() {
        super();
        this.eventsList = new ObservableArray([]);
    }

    getEvents() {
        // this.eventsList.slice(0, this.eventsList.length);
        eventsService.getEvents()
            .then((events) => {
                events.forEach((event) => {
                    let hasEvent = false;
                    this.eventsList.forEach((addedEvent) => {
                        hasEvent = addedEvent.title === event.title;
                    });

                    if (!hasEvent) {
                        this.eventsList.push(event);
                    }
                });
            });
    }
}

module.exports = {
    eventsListViewModel: new EventsListViewMovel(),
    EventsListViewMovel: EventsListViewMovel
};