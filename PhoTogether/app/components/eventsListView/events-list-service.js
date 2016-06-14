"use strict";

let Observable = require("data/observable").Observable;
let ObservableArray = require("data/observable-array").ObservableArray;
let calendar = require("nativescript-calendar");
let moment = require("moment");

class EventsListViewMovel extends Observable {
    constructor() {
        super();
        this.eventsList = new ObservableArray([]);
        moment.locale("bg");
    }

    getEvents() {
        let that = this;
        let promise = new Promise((resolve, reject) => {
            let options = {
                startDate: new Date(new Date().getTime() - (50 * 24 * 60 * 60 * 1000)),
                endDate: new Date(new Date().getTime() + (50 * 24 * 60 * 60 * 1000)),
                title: 'photogether' 
            };

            calendar.requestPermission()
                .then((granted) => {
                    return calendar.findEvents(options);
                }, reject)
                .then((data) => {
                    data.forEach((event) => {
                        event.startDate = moment(event.startDate).calendar();
                        event.endDate = moment(event.endDate).calendar();

                        that.eventsList.push(event);
                    });

                    resolve(data);
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
    eventsListViewModel: new EventsListViewMovel()
};