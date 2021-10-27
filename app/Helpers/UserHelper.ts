import User from "App/Models/User";

export default class UserHelper {
    /**
     * Checks users table for any matching usernames
     * @param username - the user name to search database for
     * @returns whether or not username exists
     */
    static async usernameExists(username: string): boolean {
        // todo: finish. returns false for now
        return false;
    }

    /**
     * Checks users table for any matching emails
     * @param email - the email to search database for
     * @returns whether or not email exists
     */
    static async emailExists(email: string): boolean {
        // todo: finish. returns false for now
        return false;
    }
}