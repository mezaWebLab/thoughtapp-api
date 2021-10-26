// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Thought from "App/Models/Thought";

export default class ThoughtsController {
    public async all() {
        return await Thought.all();
    }

    public async getThoughtById({ request }) {
        return await Thought.find(request.requestData.id);
    }
}
