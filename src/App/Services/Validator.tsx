import { ValidationStatus } from "../../Data/Enums/ValidationStatus";
import ValidatorResponse from "../../Data/Interfaces/ValidatorResponse";

export default abstract class Validator {

    protected value : string;

    public constructor(value : string) {

        this.value = value;

    }

    protected add(condition : boolean, message : string) : void {

        if (!condition) {

            throw message;

        }

    }

    protected isString(message : string) : void {

        this.add(typeof this.value === "string", message);

    }

    protected equals(values : Array<string>, message : string) : void {

        this.add(values.map(value => this.value === value).filter(value => value === true).length > 0, message);

    }

    protected match(regexp : RegExp, message : string) : void {

        this.add(regexp.test(this.value), message);

    }

    protected minLen(length : number, message : string) : void {

        this.add(this.value.length >= length, message);

    }

    protected maxLen(length : number, message : string) : void {

        this.add(this.value.length <= length, message);

    }

    protected isInt(message : string) : void {

        this.match(/^(-)?[0-9]+$/g, message);

    }

    protected isFloat(message : string) : void {

        this.match(/^(-)?[0-9]+(\.{1}[0-9]+)?$/g, message);

    }

    protected min(value : number, message : string) : void {

        this.add(parseFloat(this.value) >= value, message);

    }

    protected max(value : number, message : string) : void {

        this.add(parseFloat(this.value) <= value, message);

    }

    protected abstract setup() : void;

    public validate() : ValidatorResponse {

        try {

            this.setup();

            return { status: ValidationStatus.OK };

        }

        catch (message) {

            return { status: ValidationStatus.BAD, message };

        }

    }

}