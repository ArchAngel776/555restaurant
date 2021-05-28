import Validator from "../Services/Validator";

export default class PreparationTimeValidator extends Validator {

    protected setup() : void {

        this.isString("Your preparation time must be a string type");

        this.match(/^[0-9]{2}:{1}[0-9]{2}:{1}[0-9]{2}$/g, "Preparation time must be in 00:00:00 format");

    }

}