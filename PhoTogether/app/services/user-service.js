'use strict'

var application = require('application');
var contacts = require('nativescript-contacts');
var appSettings = require("application-settings");

function getUserId() {
    var promise = new Promise(function(resolve, reject) {
        var email = appSettings.getString('user-email');
        if (!email) {
            contacts.getContact().then(function(args) {
                if (args.response === 'selected') {
                    email = args.data.emailAddresses[0].value;
                    if (!email) {
                        reject('no email found :/');
                    } else {
                        appSettings.setString('user-email', email);
                        resolve(email);
                    }
                } else {
                    reject("pick contact canceled");
                }
            }, reject);
        } else {
            resolve(email);
        }
    });
    return promise;
}

exports.getUserId = getUserId;