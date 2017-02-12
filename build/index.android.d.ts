import { Position, Address } from "nativescript-geocoder";
export declare class Geocoder {
    getFromLocation(position: Position): Array<Address>;
    getFromName(position: Position): Array<Address>;
}
