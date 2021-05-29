import React, { Component, CSSProperties, FormEvent, ReactNode } from 'react'
import { STRING } from '../../Data/Constants/String';
import Callback from '../../Data/Interfaces/Callback';
import ControlException from '../../Data/Interfaces/ControlException';
import OnInput from '../../Data/Interfaces/OnInput';
import { ValidatorType } from '../../Data/Types/ValidatorType';
import "../../Styles/Input.css";
import ClearInputExternalException from '../Functional/ClearInputExternalException';
import InputValidation from '../Functional/InputValidation';

// Props

export interface InputProps {
    active : boolean;
    label : string;
    placeholder? : string;
    value : string;
    onInput : OnInput;
    externalException : string | null;
    closeExternalException : Callback;
    validator : ValidatorType;
    clientSideValidation : boolean;
}

// State

export interface InputState {
    exception : ControlException;
}

// Component

export default class Input extends Component<InputProps, InputState> {

    protected static exceptionStyle : CSSProperties = { backgroundColor: "#FF6666" };

    protected static emptyStyle : CSSProperties = {};

    public constructor(props : InputProps) {

        super(props);

        this.state = {
            exception: {
                show: false,
                message: STRING.EMPTY
            }
        };

        this.onInput = this.onInput.bind(this);

    }

    public componentDidUpdate() : void {

        if (this.props.externalException && (!this.state.exception.show || this.state.exception.message !== this.props.externalException)) {

            this.showException(this.props.externalException);

        }

    }

    @InputValidation
    @ClearInputExternalException
    protected onInput(event : FormEvent<HTMLInputElement>) : void {

        const { value } = event.currentTarget;

        this.props.onInput(value);

    }

    protected showException(message : string) : void {

        const exception = { show: true, message };

        this.setState({ exception });

    }

    protected closeException() : void {

        const exception = { show: false, message: STRING.EMPTY };

        this.setState({ exception });

    }

    public render() : ReactNode {

        const style = this.state.exception.show ? Input.exceptionStyle : Input.emptyStyle;

        return this.props.active ? <div className="input-container">

            <label className="input-label">{ this.props.label }</label>

            <input type="text" className="input-control" style={ style } placeholder={ this.props.placeholder || STRING.EMPTY } value={ this.props.value } onInput={ this.onInput } />

            { this.state.exception.show ? <span className="input-exception">{ this.state.exception.message }</span> : null }

        </div> : null;

    }

}