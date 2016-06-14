"use strict"

let application = require("application");
let eventsService = require("./events-service").eventsService;
let EverliveImage = require("../models/everlive-image").EverliveImage;
let everliveClient = require("./everlive-client");
let image_source = require("image-source");
let enums = require("ui/enums");

class PhotosService {
    _getiOSPhotos(event) {
        let promise = new Promise((resolve, reject) => {
            let fetchResult = PHAsset.fetchAssetsWithMediaTypeOptions(PHAssetMediaType.Image, null);
            for (var i = 0; i < fetchResult.count; i++) {
                let asset = fetchResult.objectAtIndex(i);
                let imageDate = new Date(asset.creationDate.toString());
                if (imageDate >= event.startDate && imageDate < event.endDate) {
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
        });

        return promise;
    }

    _getAndroidPhotos(event) {
        let promise = new Promise((resolve, reject) => {
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
                console.log("---------------------------------------EXIF", exifInterface.hasThumbnail());
                console.dir(exifInterface.getThumbnail());
                console.log(exifInterface.getThumbnail());

                // console.log("TAG_GPS_LATITUDE " + exifInterface.getAttribute(android.media.ExifInterface.TAG_GPS_LATITUDE));
                // console.log("TAG_GPS_LONGITUDE " + exifInterface.getAttribute(android.media.ExifInterface.TAG_GPS_LONGITUDE));
                // console.log("TAG_DATETIME ", exifInterface.getAttribute(android.media.ExifInterface.TAG_DATETIME));
            }
        });

        return promise;
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