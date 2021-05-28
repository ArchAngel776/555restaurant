import Validator from "../../App/Services/Validator"

export type ValidatorType = new ( value : string ) => Validator;