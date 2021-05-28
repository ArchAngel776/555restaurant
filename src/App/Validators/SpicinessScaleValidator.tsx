import Validator from "../Services/Validator";

export default class SpicinessScaleValidator extends Validator {

    protected setup() : void {

        this.isInt("Scale must an integer number");

        this.min(1, "Scalce must be in between 1 and 10");

        this.max(10, "Scalce must be in between 1 and 10");

    }

}