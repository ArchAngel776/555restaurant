import React, { Component, CSSProperties, ReactNode } from 'react';
import { NUMBER } from '../../Data/Constants/Number';
import Callback from '../../Data/Interfaces/Callback';
import "../../Styles/SwitchBox.css";
import ObjectBuilder from '../Services/ObjectBuilder';

// Props

export interface SwitchBoxProps {
    label : string;
    enable : boolean;
    onEnabled : Callback;
    onDisabled : Callback;
}

// State

export interface SwitchBoxState {
    left : number;
}

// Component

export default class SwitchBox extends Component<SwitchBoxProps, SwitchBoxState> {

    protected static maxLeft : number = 50;

    protected static transformValue : number = 10;

    public constructor(props : SwitchBoxProps) {

        super(props);

        this.state = {
            left: this.props.enable ? SwitchBox.maxLeft : NUMBER.ZERO
        };

        this.switch = this.switch.bind(this);

    }

    public componentDidUpdate() : void {

        if (this.props.enable && this.state.left === NUMBER.ZERO) this.enable();

        else if (!this.props.enable && this.state.left === SwitchBox.maxLeft) this.disable();

    }

    protected enable() : void {

        const move = () => {

            const { left } = this.state;

            if (left >= SwitchBox.maxLeft) return this.setState({ left: SwitchBox.maxLeft });

            this.setState({ left: left + SwitchBox.transformValue }, () => requestAnimationFrame( move ));

        }

        requestAnimationFrame ( move );

    }

    protected disable() : void {

        const move = () => {

            const { left } = this.state;

            if (left <= NUMBER.ZERO) return this.setState({ left: NUMBER.ZERO });

            this.setState({ left: left - SwitchBox.transformValue }, () => requestAnimationFrame( move ));

        }

        requestAnimationFrame ( move );

    }

    protected switch() : void {

        return this.props.enable ? this.props.onDisabled() : this.props.onEnabled();

    }

    protected getEnableStyle() : CSSProperties {

        return new ObjectBuilder<CSSProperties>().add("backgroundColor", this.props.enable ? "#1A991A" : "#1A1A1A").flush();

    }

    protected getPositionStyle() : CSSProperties {

        return new ObjectBuilder<CSSProperties>().add("left", `${this.state.left}%`).flush();

    }

    public render() : ReactNode {

        return <div className="switch-box-container">
        
            <div className="switch-box-dot-container" style={ this.getEnableStyle() } onClick={ this.switch }>

                <span className="switch-box-dot" style={ this.getPositionStyle() }></span>

            </div>

            <span className="switch-box-label">{ this.props.label }</span>

        </div>

    }

}