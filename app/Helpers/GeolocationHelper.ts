import { getDistance, convertDistance } from "geolib";

class GeolocationHelper {
    latitude: number;
    longitude: number;

    constructor(latitude: number, longitude: number) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    getDistanceFromThought(thoughtPosition): number {
        return getDistance({ latitude: this.latitude, longitude: this.longitude }, thoughtPosition);
    }

    metersToMiles(meters: number): number {
        return convertDistance(meters, "mi");
    }
}

export default GeolocationHelper;