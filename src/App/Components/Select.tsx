import React, { Component, ReactNode, CSSProperties, SyntheticEvent } from 'react';
import { STRING } from '../../Data/Constants/String';
import SelectOption from '../../Data/Interfaces/SelectOption';
import "../../Styles/Select.css";
import Transparent from "../../Assets/transparent.png";
import Callback from '../../Data/Interfaces/Callback';
import { NUMBER } from '../../Data/Constants/Number';
import OnInput from '../../Data/Interfaces/OnInput';
import ControlException from '../../Data/Interfaces/ControlException';
import { ValidatorType } from '../../Data/Types/ValidatorType';
import SelectValidation from '../Functional/SelectValidation';
import ClearSelectExternalException from '../Functional/ClearSelectExternalException';

// Props

export interface SelectProps {
    active : boolean;
    label : string;
    value : string;
    onSelect : OnInput;
    externalException : string | null;
    closeExternalException : Callback;
    validator : ValidatorType;
    options : Array<SelectOption>;
    clientSideValidation : boolean;
}

// State

export interface SelectState {
    height : number;
    showList : boolean;
    exception : ControlException;
}

// Component

export default class Select extends Component<SelectProps, SelectState> {

    protected static exceptionStyle : CSSProperties = { backgroundColor: "#FF6666" };

    protected static hiddenIconStyle : CSSProperties = { width: 0 };

    protected static emptyStyle : CSSProperties = {};

    public constructor(props : SelectProps) {

        super(props);

        this.state = {
            showList: false,
            height: NUMBER.ZERO,
            exception: {
                show: false,
                message: STRING.EMPTY
            }
        };

        this.onLayout = this.onLayout.bind(this);

        this.switchList = this.switchList.bind(this);

        this.onSelect = this.onSelect.bind(this);

        this.createOption = this.createOption.bind(this);

    }

    public componentDidUpdate() : void {

        if (this.props.externalException && (!this.state.exception.show || this.state.exception.message !== this.props.externalException)) {

            this.showException(this.props.externalException);

        }

    }

    protected onLayout(event : SyntheticEvent<HTMLDivElement, Event>) : void {

        const height = event.currentTarget.clientHeight;

        this.setState({ height });

    }

    protected getRadius() : CSSProperties {

        const radius = this.state.height / 2;

        return { borderRadius: `${ radius }px ${ radius }px 0 0` };

    }

    protected switchList() : void {

        this.setState({ showList: !this.state.showList });

    }

    @SelectValidation
    @ClearSelectExternalException
    protected onSelect(value : string) : Callback {

        return () => this.props.onSelect(value);

    }

    protected showException(message : string) : void {

        const exception = { show: true, message };

        this.setState({ exception });

    }

    protected closeException() : void {

        const exception = { show: false, message: STRING.EMPTY };

        this.setState({ exception });

    }

    protected createOption(option : SelectOption, index : number) : ReactNode {

        const iconStyle = option.icon ? Select.emptyStyle : Select.hiddenIconStyle;

        //

        return <div key={ index } className="select-option-container" onClick={ this.onSelect(option.value) }>

            <img src={ option.icon || Transparent } style={ iconStyle } className="select-option-icon" alt="Icon" />

            <span className="select-option-name">{ option.name }</span>

        </div>;

    }

    public render() : ReactNode {

        const option = this.props.options.filter(option => option.value === this.props.value)[0];

        const controlStyle = this.state.showList ? this.getRadius() : Select.emptyStyle;

        const exceptionStyle = this.state.exception.show ? Select.exceptionStyle : Select.emptyStyle;

        const iconStyle = option.icon ? Select.emptyStyle : Select.hiddenIconStyle;

        //

        return this.props.active ? <div className="select-container">

            <label className="select-label">{ this.props.label }</label>

            <div className="select-control-container" style={{ ...controlStyle, ...exceptionStyle }} onLoad={ this.onLayout } onClick={ this.switchList }>

                <img src={ option.icon || Transparent } style={ iconStyle } className="select-control-icon" alt="Icon" />

                <span className="select-control-content">{ option.name || STRING.EMPTY }</span>

                { this.state.showList ? <div className="select-options-container">{ this.props.options.map( this.createOption ) }</div> : null }

            </div>

            { this.state.exception.show ? <span className="input-exception">{ this.state.exception.message }</span> : null }

        </div> : null;

    }

}