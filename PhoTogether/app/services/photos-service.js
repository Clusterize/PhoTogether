"use strict"

let application = require("application");
let eventsService = require("./events-service").eventsService;
let EverliveImage = require("../models/everlive-image").EverliveImage;
let everliveClient = require("./everlive-client");
let image_source = require("image-source");
let enums = require("ui/enums");

class PhotosService {
    _getiOSPhotos(event) {
        let fetchResult = PHAsset.fetchAssetsWithMediaTypeOptions(PHAssetMediaType.Image, null);
        for (var i = 440; i < fetchResult.count; i++) {
            let asset = fetchResult.objectAtIndex(i);
            let imageDate = new Date(asset.creationDate.toString());
            let startDate = new Date(event.startDate.toString());
            let endDate = new Date(event.endDate.toString());
            if (imageDate >= startDate && imageDate <= endDate) {
                let options = PHImageRequestOptions.alloc().init();
                options.resizeMode = PHImageRequestOptionsResizeMode.PHImageRequestOptionsResizeModeExact;
                options.synchronous = true;
                options.deliveryMode = PHImageRequestOptionsDeliveryMode.PHImageRequestOptionsDeliveryModeOpportunistic;
                PHImageManager.defaultManager().requestImageForAssetTargetSizeContentModeOptionsResultHandler(asset, CGSizeMake(300, 300), PHImageContentMode.AspectFit, options, function (image, info) {
                    let nsdata = UIImagePNGRepresentation(image);
                    let everliveImage = new EverliveImage(imageDate, nsdata); 
                    // Niki check!
                    everliveClient.uploadImages(event, [everliveImage]);
                });
            }
        }
    }

    _getAndroidPhotos(event) {

        let uri = android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI;

        let projection = [];
        projection.push(android.provider.MediaStore.MediaColumns.DATA);
        projection.push(android.provider.MediaStore.Images.Media.BUCKET_DISPLAY_NAME);

        let cursor = application.android.nativeApp.getContentResolver().query(uri, projection, null, null, null);
        let column_index_data = cursor.getColumnIndexOrThrow(android.provider.MediaStore.MediaColumns.DATA);
        let column_index_folder_name = cursor.getColumnIndexOrThrow(android.provider.MediaStore.Images.Media.BUCKET_DISPLAY_NAME);

        let listOfAllImages = [],
            PathOfImage = null;

        while (cursor.moveToNext()) {
            PathOfImage = cursor.getString(column_index_data);
            listOfAllImages.push(PathOfImage);

            let exifInterface = new android.media.ExifInterface(PathOfImage);

            if (exifInterface.hasThumbnail()) {
                let imageDate = new Date(exifInterface.getAttribute(android.media.ExifInterface.TAG_DATETIME));
                let startDate = new Date(event.startDate.toString());
            	let endDate = new Date(event.endDate.toString());

            if (imageDate >= startDate && imageDate <= endDate) {
                    let everliveImage = new EverliveImage(imageDate, new Buffer(exifInterface.getThumbnail()));
                    everliveClient.uploadImages(event, [everliveImage]);
                }
            }
        }

    }

    getDevicePhotos(event) {
        if (application.ios) {
            return this._getiOSPhotos(event);
        } else {
            return this._getAndroidPhotos(event);
        }
    }
}

module.exports = {
    photosService: new PhotosService()
};