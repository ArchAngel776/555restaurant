import { FormEvent } from "react";
import OnInputMethod from "../../Data/Interfaces/OnInputMethod";
import Input from "../Components/Input";

export default function ClearInputExternalException(target : Input, property : string, descriptor : PropertyDescriptor) : void {

    if (property !== "onInput") return;

    const onInputMethod : OnInputMethod = descriptor.value;

    descriptor.value = function onInput( this : Input, event : FormEvent<HTMLInputElement> ) : void {

        onInputMethod.call(this, event);

        if (this.props.externalException) {

            this.props.closeExternalException();

            this.closeException();

        }

    }

}