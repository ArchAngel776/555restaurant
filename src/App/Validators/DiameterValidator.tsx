import Validator from "../Services/Validator";

export default class DiameterValidator extends Validator {

    protected setup() : void {

        this.isFloat("Diameter must a number");

        this.min(0, "Sory but this diameter is impossible to make (How do you think why?)");

        this.max(255, "Sory, we going to bankrupt if we prepare pizza with that dimater");

        this.maxLen(20, "Oou man... It so incredible precision... Try with somethng less");

    }

}