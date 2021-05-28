import { AppScreen } from "../Enums/AppScreen";

export default interface ChangeScreenCallback {
    ( screenIndex : AppScreen ) : void;
}