// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Thought from "App/Models/Thought";
import HTTPHelper from "App/Helpers/HTTPHelper";
import GeolocationHelper from "App/Helpers/GeolocationHelper";

export default class ThoughtsController {
    public async all() {
        return await Thought.all();
    }

    public async getThoughtById({ request }) {
        return await Thought.find(request.requestData.id);
    }

    public async getNearbyThoughts({ request, response }) {
        const body = request.body(),
            errors: string[] = [];

        if (HTTPHelper.postBodyExists(["latitude", "longitude"], body)) {
            console.log(body);
            const geolocationHelper = new GeolocationHelper(body.latitude, body.longitude);
            // todo
            // improve search algorithm. This shit is so bad
            const allThoughts = await Thought.all();
            const nearbyThoughts: any = [];

            allThoughts.forEach(thought => {
                const distance = geolocationHelper.getDistanceFromThought({ latitude: thought.latitude, longitude: thought.longitude });
                if (geolocationHelper.metersToMiles(distance) <= 30) nearbyThoughts.push(thought);
            });

            return response.status(200).json(nearbyThoughts);
        } else {
            errors.push("NO_LATITUDE_OR_LONGITUDE_SENT");
            return response.status(400).json(errors);
        }
    }

    public async newThought({ request, response }) {
        const body = request.body(),
            errors: string[] = [];

        if (HTTPHelper.postBodyExists(["title", "body", "hex", "latitude", "longitude"], body)) {
            const thought = new Thought();

            thought.title = body.title;
            thought.body = body.body;
            thought.hex = body.hex;
            thought.latitude = body.latitude;
            thought.longitude = body.longitude;

            await thought.save();
            return response.status(200).json(thought);
        } else {
            errors.push("NEW_THOUGHT_MISSING_PARAMETERS");
            return response.status(400).json(errors);
        }
    }
}
