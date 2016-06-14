"use strict";

let calendar = require("nativescript-calendar");
let moment = require("moment");

class EventsService {
    constructor() {
        this.eventsList = [];
    }
    getEvents() {
        let promise = new Promise((resolve, reject) => {
            let options = {
                startDate: new Date(new Date().getTime() - (50 * 24 * 60 * 60 * 1000)),
                endDate: new Date(new Date().getTime() + (50 * 24 * 60 * 60 * 1000)),
                title: "photogether"
            };

            calendar.requestPermission()
                .then((granted) => {
                    return calendar.findEvents(options);
                }, reject)
                .then((data) => {
                    data.forEach((event) => {
                        event.startDate = moment(event.startDate).format("lll");
                        event.endDate = moment(event.endDate).format("lll");

                        this.eventsList.push(event);
                    });

                    resolve(this.eventsList);
                }, (err) => {
                    reject({
                        message: "Cannot get the events from your calendar."
                    });
                });


        });

        return promise;
    }
}

module.exports = {
    eventsService: new EventsService()
};