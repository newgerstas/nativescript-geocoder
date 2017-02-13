import { Observable } from "rxjs/Observable";

export interface ILocation {
    latitude: number;
    longitude: number;
}

export interface IRegion {
    southwest: ILocation;
    nowtheast: ILocation;
}

export interface IAddress {
    location: ILocation;
    addressLine: string;
    countryName: string;
    countryCode: string;
    locality: string
    featureName: string;
    phone: string;
    postalCode: string;
    administrativeArea: string;
}

export class Geocoder {
    constructor();
    getByLocation(location: ILocation): Observable<Array<IAddress>>;
    getByName(name: string, region?: IRegion): Observable<Array<IAddress>>;
}