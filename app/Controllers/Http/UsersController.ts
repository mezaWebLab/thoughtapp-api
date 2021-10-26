// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User";
import HTTPHelper from "App/Helpers/HTTPHelper";
import UserHelper from "App/Helpers/UserHelper";
import CoreHelper from "App/Helpers/CoreHelper";

export default class UsersController {
    public async create({ request, response }) {
        const body = request.body();

        if (HTTPHelper.postBodyExists(["username", "email", "password"], body)) {
            const user = new User(),
                errors = Array<any>;

            user.username = body.username;
            user.email = body.email;
            user.password = body.password;

            if (user.password.length < 9) errors.push("PASSWORD_NOT_ALLOWED");
            if (!CoreHelper.validateEmail(user.email)) errors.push("EMAIL_NOT_ALLOWED");
            if (!UserHelper.usernameExists(user.username)) errors.push("USERNAME_ALREADY_EXISTS");
            if (!UserHelper.emailExists(user.email)) errors.push("EMAIL_ALREADY_EXISTS");

            if (errors.length > 0) {
                return response.status(400).send(errors);
            } else {
                await user.save();
                return user;
            }
        }

        return response.status(400).send(["MISSING_PARAMETERS"]);
    }
}
