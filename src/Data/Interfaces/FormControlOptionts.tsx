import { FieldType } from "../Enums/FieldType";
import { ValidatorType } from "../Types/ValidatorType";
import SelectOption from "./SelectOption";

export default interface FormControlOptions {
    active : boolean;
    type : FieldType;
    value : string;
    externalException : string | null;
    Validator : ValidatorType;
    options? : Array<SelectOption>;
}