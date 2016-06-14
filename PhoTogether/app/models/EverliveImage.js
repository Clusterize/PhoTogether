"use strict";

class EverliveImage {
    constructor(date, image, location) {
        this.date = date;
        this.image = image;
        this.location = location;
    }

    toBase64String() {
        return this.image.toBase64String();
    }
}