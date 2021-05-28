import FormControlStructure from "../../Data/Interfaces/FormControlStructure";
import { MakeOrderMethod } from "../../Data/Interfaces/MakeOrderMethod";
import Order from "../Screens/Order";

export default function OrderValidaion(target : Order, property : string, descriptor : PropertyDescriptor) : void {

    if (property !== "makeOrder") return;

    const makeOrderMethod : MakeOrderMethod = descriptor.value;

    descriptor.value = async function makeOrder( this : Order, fields : FormControlStructure ) : Promise<void> {

        if (this.validate(fields)) {

            makeOrderMethod.call(this, fields);

        }

    }

}