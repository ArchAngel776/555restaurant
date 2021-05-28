import FormControlStructure from "./FormControlStructure";

export interface MakeOrderMethod {
    ( fields : FormControlStructure ) : Promise<void>;
}