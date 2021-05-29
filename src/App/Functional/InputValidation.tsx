import { FormEvent } from "react";
import { STRING } from "../../Data/Constants/String";
import { ValidationStatus } from "../../Data/Enums/ValidationStatus";
import OnInputMethod from "../../Data/Interfaces/OnInputMethod";
import Input from "../Components/Input";

export default function InputValidation(target : Input, property : string, descriptor : PropertyDescriptor) : void {

    if (property !== "onInput") return;

    const onInputMethod : OnInputMethod = descriptor.value;

    descriptor.value = function onInput( this : Input, event : FormEvent<HTMLInputElement> ) : void {

        onInputMethod.call(this, event);

        if (!this.props.clientSideValidation) return this.closeException();

        const { value } = event.currentTarget;

        const Validator = this.props.validator;

        const response = new Validator(value).validate();

        if (response.status === ValidationStatus.OK) {

            this.closeException();

        }

        else if (response.status === ValidationStatus.BAD) {

            this.showException(response.message || STRING.EMPTY);

        }

    }

}