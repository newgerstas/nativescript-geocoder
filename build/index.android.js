"use strict";
var utils = require("utils/utils");
var Address = (function () {
    function Address(android) {
        this.android = android;
    }
    Object.defineProperty(Address.prototype, "location", {
        get: function () {
            return {
                latitude: this.android.getLatitude(),
                longitude: this.android.getLongitude()
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Address.prototype, "addressLine", {
        get: function () {
            return this.android.getAddressLine(0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Address.prototype, "countryCode", {
        get: function () {
            return this.android.getCountryCode();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Address.prototype, "countryName", {
        get: function () {
            return this.android.getCountryName();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Address.prototype, "locality", {
        get: function () {
            return this.android.getLocality();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Address.prototype, "featureName", {
        get: function () {
            return this.android.getFeatureName();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Address.prototype, "phone", {
        get: function () {
            return this.android.getPhone();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Address.prototype, "postalCode", {
        get: function () {
            return this.android.getPostalCode();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Address.prototype, "administrativeArea", {
        get: function () {
            return this.android.getAdminArea();
        },
        enumerable: true,
        configurable: true
    });
    return Address;
}());
var Geocoder = (function () {
    function Geocoder() {
        var context = utils.ad.getApplicationContext();
        this.android = new android.location.Geocoder(context);
    }
    Geocoder.prototype.getByLocation = function (location) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                var addresses = _this.android.getFromLocation(location.latitude, location.longitude, Geocoder.MAX_RESULTS);
                addresses = addresses || [];
                resolve(addresses.map(function (ad) { return new Address(ad); }));
            }
            catch (error) {
                reject(error);
            }
        });
    };
    Geocoder.prototype.getByName = function (name, region) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                var addresses = void 0;
                if (region) {
                    addresses = _this.android.getFromLocationName(name, Geocoder.MAX_RESULTS, region.southwest.latitude, region.southwest.longitude, region.nowtheast.latitude, region.nowtheast.longitude);
                }
                else {
                    addresses = _this.android.getFromLocationName(name, Geocoder.MAX_RESULTS);
                }
                addresses = addresses || [];
                resolve(addresses.map(function (ad) { return new Address(ad); }));
            }
            catch (error) {
                reject(error);
            }
        });
    };
    return Geocoder;
}());
Geocoder.MAX_RESULTS = 10;
exports.Geocoder = Geocoder;
