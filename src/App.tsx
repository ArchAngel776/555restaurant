import React, { Component, ReactNode } from 'react';
import AlertBox from './App/Components/AlertBox';
import Waiter from './App/Components/Waiter';
import Order from './App/Screens/Order';
import Result from './App/Screens/Result';
import Welcome from './App/Screens/Welcome';
import LocalStorage from './App/Services/LocalStorage';
import { STORAGE } from './Data/Constants/Storage';
import { STRING } from './Data/Constants/String';
import { AppScreen } from './Data/Enums/AppScreen';
import AlertBoxData from './Data/Interfaces/AlertBoxData';
import { ScreensStructure } from './Data/Types/ScreensStructure';
import "./Styles/App.css";

// Props

export interface AppProps {
    screen : AppScreen;
}

// State

export interface AppState {
    screenIndex : AppScreen;
    alertBoxData : AlertBoxData;
    waiterShow : boolean;
}

// Component

export default class App extends Component<AppProps, AppState> {

    public constructor(props : AppProps) {

        super(props);

        this.state = {
            screenIndex: this.props.screen,
            alertBoxData: {
                show: false,
                title: STRING.EMPTY,
                content: []
            },
            waiterShow: false
        };

        this.changeScreen = this.changeScreen.bind(this);

        this.alertBoxShow = this.alertBoxShow.bind(this);

        this.alertBoxClose = this.alertBoxClose.bind(this);

        this.waiterOn = this.waiterOn.bind(this);

        this.waiterOff = this.waiterOff.bind(this);

    }

    protected changeScreen(screenIndex : AppScreen) : void {

        this.setState({ screenIndex }, () => new LocalStorage(STORAGE.SCREEN).setNumber(screenIndex));

    }

    protected alertBoxShow(title : string, ...content : Array<string>) : void {

        const alertBoxData : AlertBoxData = { show: true, title, content };

        this.setState({ alertBoxData });

    }

    protected alertBoxClose() : void {

        const alertBoxData : AlertBoxData = { show: false, title: STRING.EMPTY, content: [] };

        this.setState({ alertBoxData });

    }

    protected waiterOn() : void {

        this.setState({ waiterShow: true });

    }

    protected waiterOff() : void {

        this.setState({ waiterShow: false });

    } 

    public render() : ReactNode {

        const screens : ScreensStructure = [

            <Welcome changeScreen={ this.changeScreen } />,

            <Order changeScreen={ this.changeScreen } alertBoxShow={ this.alertBoxShow } waiterOn={ this.waiterOn } waiterOff={ this.waiterOff } />,

            <Result changeScreen={ this.changeScreen } />

        ];

        return <div className="app-container">

            { screens[ this.state.screenIndex ] }

            <AlertBox 
                show={ this.state.alertBoxData.show }
                title={ this.state.alertBoxData.title }
                content={ this.state.alertBoxData.content }
                onClickButton={ this.alertBoxClose } />

            <Waiter show={ this.state.waiterShow } />

        </div>;

    }

}