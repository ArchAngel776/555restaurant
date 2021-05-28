import Validator from "../Services/Validator";

export default class NoOfSlicesValidator extends Validator {

    protected setup() : void {

        this.isInt("Number of slices must be an integer");

        this.min(1, "Emmm... Probably you don't eat yourself. Try with more slices");

        this.max(255, "Woo, Woo, Woo, bro! How we can cut so many slices???");

    }

}