import React, { Component, ReactNode } from 'react';
import "../../Styles/WelcomeRate.css";

export interface WelcomeRateProps {
    icon : string;
    title : string;
    description : string;
}

export default class WelcomeRate extends Component<WelcomeRateProps> {

    public render() : ReactNode {

        return <div className="welcome-rate-container">

            <img className="welcome-rate-icon" src={ this.props.icon } alt="Icon" />

            <span className="welcome-rate-title">{ this.props.title }</span>

            <span className="welcome-rate-break">-</span>

            <span className="welcome-rate-description">{ this.props.description }</span>

        </div>

    }

}