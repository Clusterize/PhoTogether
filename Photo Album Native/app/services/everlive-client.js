'use strict';

var Everlive = require('../everlive.all.min');
var userService = require('./user-service.js')

var everlive = new Everlive({
    appId: 'xhpeizqd4hnqef1n',
    scheme: 'https'
});

function uploadImages(event, images) {
    images.forEach(function(image) {
        var file = {
            "Filename": getFolder(event) + "_" +  + uuid.v4() + ".jpg",
            "ContentType": "image/jpeg",
            "UserId": userService.getUserId(),
            "base64": image.toBase64String(enums.ImageFormat.jpeg, 100)
        };
        
        everlive.files.create(file, function(data) {
            console.log(JSON.stringify(data));
        }, function(error) {
            console.log(JSON.stringify(error));
        });
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
                        "date": new Date(file.CreatedAt)
                    };
                });
                console.log(JSON.stringify(images));
            	resolve(images);
            }, reject);
    });
    
    return promise;
}

function getFolder(event) {
    return event.name + "_" + getTime(event.startDate) + "_" + getTime(event.endDate);
}

function getTime(date) {
    return date.getTime() / 100000;
}

exports.uploadImages = uploadImages;
exports.getImages = getImages;