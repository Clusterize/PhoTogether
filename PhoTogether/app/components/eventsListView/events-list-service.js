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
        let promise = new Promise((resolve, reject) => {
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
                	
                resolve(this.eventsList);
                });
        });

        return promise;
    }
}

module.exports = {
    eventsListViewModel: new EventsListViewMovel(),
    EventsListViewMovel: EventsListViewMovel
};