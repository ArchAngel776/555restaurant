import Validator from "../Services/Validator";

export default class NameValidator extends Validator {

    protected setup() : void {

        this.isString("Your name must be a string type");

        this.minLen(1, "Name is required");

        this.maxLen(255, "Hmmmm, probably it is incorrect name");

        this.match(/^[a-zA-Z0-9]+(\s{1}[a-zA-Z0-9]+)*$/g, 'Used incorrect sign. Allowed signs are digits, small and big laters and single whitespaces')

    }

}