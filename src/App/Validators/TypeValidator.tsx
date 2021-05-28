import { FoodType } from "../../Data/Enums/FoodType";
import Validator from "../Services/Validator";

export default class TypeValidator extends Validator {

    protected setup() : void {

        this.isString("Uncorrect dish type");

        this.equals([ FoodType.PIZZA, FoodType.SOUP, FoodType.SANDWICH ], "You must select a dish type");

    }

}