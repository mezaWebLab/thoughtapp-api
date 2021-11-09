import User from "App/Models/User";

export default class UserHelper {
    /**
     * Checks users table for any matching usernames
     * @param username - the user name to search database for
     * @returns whether or not username exists
     */
    static async usernameExists(username: string): Promise<boolean> {
        const existingUser = await User.findBy("username", username);
        return existingUser ? true : false;
    }

    /**
     * Checks users table for any matching emails
     * @param email - the email to search database for
     * @returns whether or not email exists
     */
    static async emailExists(email: string): Promise<boolean> {
        const existingUser = await User.findBy("email", email);
        return existingUser ? true : false;
    }

    static validateEmail(email: string): boolean {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
}