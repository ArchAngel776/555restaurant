import React, { Component, CSSProperties, ReactNode } from 'react';
import "../../Styles/Waiter.css";
import ObjectBuilder from '../Services/ObjectBuilder';
import WaiterIcon from "../../Assets/waiter.png";
import { NUMBER } from '../../Data/Constants/Number';

// Props

export interface WaiterProps {
    show : boolean;
}

// State

export interface WaiterState {
    angle : number;
}

// Component

export default class Waiter extends Component<WaiterProps, WaiterState> {

    protected static maxAngle : number = 360;

    protected static angleRotate : number = 2;

    public constructor(props : WaiterProps) {

        super(props);

        this.state = {
            angle: 0
        };

        this.rotate = this.rotate.bind(this);

    }

    public componentDidMount() : void {

        requestAnimationFrame( this.rotate );

    }

    protected rotate() : void {

        const angle = this.state.angle < Waiter.maxAngle ? this.state.angle + Waiter.angleRotate : NUMBER.ZERO;

        this.setState({ angle }, () => requestAnimationFrame( this.rotate ));

    }

    protected transformStyle() : CSSProperties {

        return new ObjectBuilder<CSSProperties>().add("transform", `rotate(${this.state.angle}deg)`).flush();

    }

    public render() : ReactNode {

        return this.props.show ? <div className="waiter-screen">

            <div className="waiter-container">

                <img src={ WaiterIcon } className="waiter-icon" style={ this.transformStyle() } alt="Icon" />

                <span className="waiter-content">Proszę czekać</span>

            </div>

        </div> : null;

    }

}