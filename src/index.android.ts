import { IAddress, ILocation, IRegion, Geocoder as IGeocoder } from ".";
import * as utils from "utils/utils";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

class Address implements IAddress {

    constructor(private android: any) { }

    get location(): ILocation {
        return {
            latitude: this.android.getLatitude(),
            longitude: this.android.getLongitude()
        };
    }

    get addressLine(): string {
        //Concat with getAddressLine(1)?
        return this.android.getAddressLine(0);
    }

    get countryCode(): string {
        return this.android.getCountryCode();
    }

    get countryName(): string {
        return this.android.getCountryName();
    }

    get locality(): string {
        return this.android.getLocality();
    }

    get featureName(): string {
        return this.android.getFeatureName();
    }

    get phone(): string {
        return this.android.getPhone();
    }

    get postalCode(): string {
        return this.android.getPostalCode();
    }

    get administrativeArea(): string {
        return this.android.getAdminArea();
    }
}

export class Geocoder implements IGeocoder {

    public static readonly MAX_RESULTS: number = 10;

    private android: any;

    constructor() {
        const context = utils.ad.getApplicationContext();
        this.android = new android.location.Geocoder(context);
    }

    getByLocation(location: ILocation): Observable<Array<IAddress>> {
        return Observable.create(observer => {
            try {
                let addresses = this.android.getFromLocation(location.latitude, location.longitude, Geocoder.MAX_RESULTS);
                observer.next(addresses);
                observer.complete();
            } catch (error) {
                observer.error(error);
            }
        }).map(ads => this.toJsArray(ads).map(ad => new Address(ad)));
    }

    getByName(name: string, region?: IRegion): Observable<Array<IAddress>> {
        return Observable.create(observer => {
            try {
                let addresses;
                if (region) {
                    addresses = this.android.getFromLocationName(name, Geocoder.MAX_RESULTS,
                        region.southwest.latitude, region.southwest.longitude, region.nowtheast.latitude, region.nowtheast.longitude)
                } else {
                    addresses = this.android.getFromLocationName(name, Geocoder.MAX_RESULTS);
                }
                observer.next(addresses);
                observer.complete();
            } catch (error) {
                observer.error(error);
            }
        }).map(ads => this.toJsArray(ads).map(ad => new Address(ad)));
    }

    //TODO: Figure out the better way to convert java ArrayList to JS array
    private toJsArray(array: any) {
        let output = [], count = array.size();
        for (var i = 0; i < count; i++) {
            output.push(array.get(i));
        }
        return output;
    }
}