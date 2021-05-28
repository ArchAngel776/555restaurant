import Validator from "../Services/Validator";

export default class SlicesOfBreadValidator extends Validator {

    protected setup() : void {

        this.isInt("Slices of bread must an integer number");

        this.min(0, "Hmmm... How we can give you negative number of slices?");

        this.max(255, "No - it wouldn't has a good end");

    }

}