import { ValidationStatus } from "../Enums/ValidationStatus";

export default interface ValidatorResponse {
    status : ValidationStatus;
    message? : string;
}