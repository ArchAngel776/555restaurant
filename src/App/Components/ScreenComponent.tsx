import React, { Component, CSSProperties, ReactNode } from 'react';
import icon from "../../Assets/logo.png";
import { AppScreen } from '../../Data/Enums/AppScreen';
import ChangeScreenCallback from '../../Data/Interfaces/ChangeScreenCallback';
import "../../Styles/Screen.css"

// Props

export interface ScreenComponentProps {
    changeScreen : ChangeScreenCallback;
}

// State

export interface ScreenComponentState {
    opacity : number;
}

// Component

export default abstract class ScreenComponent<Props extends ScreenComponentProps = ScreenComponentProps, State extends ScreenComponentState = ScreenComponentState> extends Component<Props, State> {

    protected static opacitySubtracker : number = 0.05;

    public componentDidMount() : void {

        const show = () => {

            if (this.state.opacity >= 1) return this.setState({ opacity: 1 });

            const opacity = this.state.opacity + ScreenComponent.opacitySubtracker;

            this.setState({ opacity }, () => requestAnimationFrame( show ));

        }

        requestAnimationFrame( show );

    }

    protected changeScreen(screen : AppScreen) : void {

        const hide = () => {

            if (this.state.opacity <= 0) return this.props.changeScreen(screen);

            const opacity = this.state.opacity - ScreenComponent.opacitySubtracker;

            this.setState({ opacity }, () => requestAnimationFrame( hide ));

        }

        requestAnimationFrame( hide );

    }

    protected getOpacityStyle() : CSSProperties {

        return { opacity: this.state.opacity };

    }

    protected abstract menu() : ReactNode;

    protected root(dom : ReactNode) : ReactNode {

        const opacityStyle= this.getOpacityStyle();

        return <div className="screen-container" style={ opacityStyle }>

            <div className="screen-main-container">

                <div className="screen-icon-container">

                    <div className="screen-icon-wrapper">

                        <img className="screen-icon-image" src={ icon } alt="Logo" />

                    </div>

                </div>

                <div className="screen-content-container">{ dom }</div>

            </div>

            <div className="screen-menu">{ this.menu() }</div>

        </div>;

    }

    public abstract render() : ReactNode;

}