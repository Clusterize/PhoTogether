'use strict';

var Everlive = require('../everlive.all.min');
var userService = require('./user-service.js')

var everlive = new Everlive({
    appId: 'xhpeizqd4hnqef1n',
    scheme: 'https'
});

function uploadImages(event, images) {
    var userId = userService.getUserInfo().then(function(info) {
        images.forEach(function(image) {
            var file = {
                "Filename": getFolder(event) + "_" + createGuid() + ".jpg",
                "ContentType": "image/jpeg",
                "UserEmail": info.email,
                "UserName": info.name,
                "ImageDate": image.date,
                "base64": image.toBase64String()
            };

            everlive.files.create(file, function(data) {
            }, function(error) {
                console.log(JSON.stringify(error));
            });
        });
    }, function(error) {
        console.dir(error);
    });
}

function getImages(event) {
    var promise = new Promise(function(resolve, reject) {
        var query = new Everlive.Query();
        query.where().regex('Filename', '^' + getFolder(event) + '_.*');
        everlive.Files.get(query)
            .then(function(data) {
            	var images = data.result.map(function(file) {
                    return {
                        "url": file.Uri,
                        "date": new Date(file.ImageDate),
                        "userName": file.UserName,
                        "userEmail": file.UserEmail
                    };
                });
                console.log(JSON.stringify(images));
            	resolve(images);
            }, reject);
    });
    
    return promise;
}

function createGuid() {
   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
   });
}

function getFolder(event) {
    let startDate = new Date(event.startDate.toString());
    let endDate = new Date(event.endDate.toString());
    return hash(event.title + "_" + getTime(startDate) + "_" + getTime(endDate));
}

function getTime(date) {
    return date.getTime() / 1000000;
}

function hash(str) {
    var hash = 0;
    if (str.length == 0) return hash;
    for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

exports.uploadImages = uploadImages;
exports.getImages = getImages;
exports.getFolder = getFolder;