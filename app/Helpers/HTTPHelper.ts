export default class HTTPHelper {
    /**
     * 
     */
    static postBodyExists(bodyItems: Array<string>, body: any): boolean {
        if (bodyItems instanceof Array) {
            for (let i = 0; bodyItems.length > i; i++) {
                if (!body[bodyItems[i]]) return false;
            }

            return true;
        } else {
            return false;
        }
    }
}