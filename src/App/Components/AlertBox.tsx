import React, { Component, ReactNode } from 'react';
import Callback from '../../Data/Interfaces/Callback';
import "../../Styles/AlertBox.css";

// Props

export interface AlertBoxProps {
    show : boolean;
    title : string;
    content : Array<string>;
    onClickButton : Callback;
}

// Component

export default class AlertBox extends Component<AlertBoxProps> {

    public render() : ReactNode {

        return this.props.show ? <div className="alert-box-screen">

            <div className="alert-box-container">

                <div className="alert-box-title-container">

                    <h1 className="alert-box-title">{ this.props.title }</h1>

                </div>

                <div className="alert-box-content-container">

                    { this.props.content.map(message => <span className="alert-box-content">{ message }</span> ) }

                </div>

                <div className="alert-box-menu-container">

                    <button type="button" className="alert-box-menu-button" onClick={ this.props.onClickButton }>OK</button>

                </div>

            </div>

        </div> : null;

    }

}