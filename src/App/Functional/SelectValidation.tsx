import { STRING } from "../../Data/Constants/String";
import { ValidationStatus } from "../../Data/Enums/ValidationStatus";
import Callback from "../../Data/Interfaces/Callback";
import OnSelectMethod from "../../Data/Interfaces/OnSelectMethod";
import Select from "../Components/Select";

export default function SelectValidation(target : Select, property : string, descriptor : PropertyDescriptor) : void {

    if (property !== "onSelect") return;

    const onSelectMethod : OnSelectMethod = descriptor.value;

    descriptor.value = function onSelect( this : Select, value : string ) : Callback {

        const callback : Callback = onSelectMethod.call(this, value);

        return () => {

            callback();

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

}