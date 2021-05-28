import { ReactNode } from "react";
import { AppScreen } from "../Enums/AppScreen";

export type ScreensStructure = {
    [ key in AppScreen ] : ReactNode;
}