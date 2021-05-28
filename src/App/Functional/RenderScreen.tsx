import { ReactNode } from "react";
import RenderMethod from "../../Data/Interfaces/RenderMethod";
import ScreenComponent from "../Components/ScreenComponent";

export default function RenderScreen(target : ScreenComponent, property : string, descriptor : PropertyDescriptor) : void {

    if (property !== "render") return;

    const renderMethod : RenderMethod = descriptor.value;

    descriptor.value = function render( this : ScreenComponent ) : ReactNode {

        const dom = renderMethod.call(this);

        return this.root(dom);

    }

}