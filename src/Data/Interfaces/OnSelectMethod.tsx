import Callback from "./Callback";

export default interface OnSelectMethod {
    ( value : string ) : Callback;
}