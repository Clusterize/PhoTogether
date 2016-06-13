'use strict'

var application = require('application');
var contacts = require('nativescript-contacts');
var appSettings = require('application-settings');

function getUserInfo() {
    var promise = new Promise(function(resolve, reject) {
        var email = appSettings.getString('user-email');
        var name = appSettings.getString('user-name');
        if (!email || !name) {
            contacts.getContact().then(function(args) {
                if (args.response === 'selected') {
                    email = args.data.emailAddresses[0].value;
                    name = args.data.name.given + ' ' + args.data.name.family;
                    if (!email || !name) {
                        reject('no email found :/');
                    } else {
                        appSettings.setString('user-email', email);
                        appSettings.setString('user-name', name);
                        resolve({
                            name: name,
                            email: email
                        });
                    }
                } else {
                    reject("pick contact canceled");
                }
            }, reject);
        } else {
            resolve({
                name: name,
                email: email
            });
        }
    });
    return promise;
}

exports.getUserInfo = getUserInfo;