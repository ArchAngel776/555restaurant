import Callback from "../../Data/Interfaces/Callback";
import OnSelectMethod from "../../Data/Interfaces/OnSelectMethod";
import Select from "../Components/Select";

export default function ClearSelectExternalException(target : Select, property : string, descriptor : PropertyDescriptor) : void {

    if (property !== "onSelect") return;

    const onSelectMethod : OnSelectMethod = descriptor.value;

    descriptor.value = function onSelect( this : Select, value : string ) : Callback {

        const callback = onSelectMethod.call(this, value);

        return () => {

            callback();

            if (this.props.externalException) {

                this.props.closeExternalException();

                this.closeException();

            }

        }

    }

}