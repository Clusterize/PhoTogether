"use strict"

let application = require("application");

class PhotosService {
    _getiOSPhotos() {
        console.log(PHAssetMediaType.Image);
        let fetchResult = PHAsset.fetchAssetsWithMediaTypeOptions(PHAssetMediaType.Image, null);
        console.log("nadya: " + fetchResult.count);

        for (var i = 0; i < 1; i++) {
            console.log(fetchResult.objectAtIndex(i).localIdentifier.toString());
            console.log(fetchResult.objectAtIndex(i).location.coordinate.latitude.toString());
            console.log(fetchResult.objectAtIndex(i).location.coordinate.longitude.toString());
            console.log(fetchResult.objectAtIndex(i).creationDate.toString());
        }
    }

    _getAndroidPhotos() {
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
            console.log("TAG_GPS_LATITUDE " + exifInterface.getAttribute(android.media.ExifInterface.TAG_GPS_LATITUDE));
            console.log("TAG_GPS_LONGITUDE " + exifInterface.getAttribute(android.media.ExifInterface.TAG_GPS_LONGITUDE));
            console.log("TAG_DATETIME ", exifInterface.getAttribute(android.media.ExifInterface.TAG_DATETIME));
        }
    }

    getDevicePhotos(event) {
        if (application.ios) {
            return _getiOSPhotos(event);
        } else {
            return _getAndroidPhotos(event);
        }
    }
}

module.exports = {
    photosService: new PhotosService()
};