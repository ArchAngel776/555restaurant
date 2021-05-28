import { FormEvent } from "react";

export default interface OnInputMethod {
    ( event : FormEvent<HTMLInputElement> ) : void;
}