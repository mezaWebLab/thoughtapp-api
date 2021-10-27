// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User";
import HTTPHelper from "App/Helpers/HTTPHelper";
import UserHelper from "App/Helpers/UserHelper";
import CoreHelper from "App/Helpers/CoreHelper";
import Hash from '@ioc:Adonis/Core/Hash';

export default class UsersController {
    public async create({ request, response }) {
        const body = request.body();

        if (HTTPHelper.postBodyExists(["username", "email", "password"], body)) {
            const user = new User(),
                errors: string[] = [];

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

    public async login({ request, response, auth }) {
        const body = request.body(),
            errors: string[] = [];

        if (HTTPHelper.postBodyExists(["usernameOrEmail", "password"], body)) {
            try {
                const user = await User
                    .query()
                    .where(CoreHelper.validateEmail(body.usernameOrEmail) ? "email" : "username", body.usernameOrEmail)
                    .firstOrFail();

                if (!(await Hash.verify(user.password, body.password))) {
                    errors.push("PASSWORD_NOT_VALID");
                    return response.status(404).send(errors);
                }

                const token = await auth.use('api').generate(user);
                return response.status(200).send({ user, token });
            } catch (e) {
                errors.push("USERNAME_OR_EMAIL_NOT_FOUND");
                return response.status(404).send(errors);
            }
        } else {    
            errors.push("CREDENTIALS_NOT_PROVIDED");
            return response.status(400).send(errors);
        }
    }
}
