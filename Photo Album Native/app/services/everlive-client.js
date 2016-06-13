var Everlive = require('../everlive.all.min');
var userService = require('./user-service.js')

var everlive = new Everlive({
    appId: 'xhpeizqd4hnqef1n',
    scheme: 'https'
});

function uploadImages(event, images) {
    images.forEach(function(image) {
        var file = {
            "Filename": getFolder(event) + "_" +  + createGuid() + ".jpg",
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
    console.log('bla bla bla');
    var query = new Everlive.Query();
    query.where().regex('Filename', '^' + getFolder(event) + '_.*');
    everlive.Files.get(query)
    	.then(function(data) {
        	console.log(JSON.stringify(data));
	    }, function(error) {
        	console.log(JSON.stringify(error));
	    });
}

function getFolder(event) {
    return event.name + "_" + event.startDate.getTime() + "_" + event.endDate.getTime();
}

function createGuid() {
   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
   });
}

exports.uploadImages = uploadImages;
exports.getImages = getImages;