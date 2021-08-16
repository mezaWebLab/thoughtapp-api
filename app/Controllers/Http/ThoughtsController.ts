// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Thought from "App/Models/Thought";

export default class ThoughtsController {
    public async index() {
        return await Thought.all();
    }
}
