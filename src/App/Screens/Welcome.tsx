import React, { ReactNode } from 'react';
import "../../Styles/Welcome.css";
import PlaceIcon from "../../Assets/place.png";
import StarIcon from "../../Assets/star.png";
import PriceIcon from "../../Assets/price.png";
import WelcomeRate from '../Components/WelcomeRate';
import WelcomeRateStructure from '../../Data/Interfaces/WelcomeRateStructure';
import ScreenComponent, { ScreenComponentProps, ScreenComponentState } from '../Components/ScreenComponent';
import RenderScreen from '../Functional/RenderScreen';
import { AppScreen } from '../../Data/Enums/AppScreen';

// Props

export interface WelcomeProps extends ScreenComponentProps {}

// State

export interface WelcomeState extends ScreenComponentState {
    rates : Array<WelcomeRateStructure>;
}

// Component

export default class Welcome extends ScreenComponent<WelcomeProps, WelcomeState> {

    public constructor(props : WelcomeProps) {

        super(props);

        this.state = {
            opacity: 0,
            rates: []
        };

        this.goToOrder = this.goToOrder.bind(this);

    }

    public componentDidMount() : void {

        super.componentDidMount();

        const rates : Array<WelcomeRateStructure> = [
            {
                iconRate: PlaceIcon,
                titleRate: "5 Places",
                descriptionRate: "Opened in our restaurant chain"
            },
            {
                iconRate: StarIcon,
                titleRate: "5 Stars",
                descriptionRate: "In Polska Policja's ranking"
            },
            {
                iconRate: PriceIcon,
                titleRate: "5 zł",
                descriptionRate: "For the cheapest meal"
            }
        ];

        this.setState({ rates });

    }

    protected goToOrder() : void {

        this.changeScreen(AppScreen.ORDER);

    }

    protected menu() : ReactNode {

        return <button type="button" className="welcome-button-control" onClick={ this.goToOrder }> Try us </button>;

    }

    @RenderScreen 
    public render() : ReactNode {

        return <>
        
            <div className="welcome-container">

                <h1 className="welcome-title">555 Restaurant</h1>

                <div className="welcome-description-container">

                    <span className="welcome-description-content">Hello body! Welcome in 555 Restaurant - 5 / 5 quality place where you would know innermost nooks of your taste buds</span>

                    <span className="welcome-description-content">Don't read further - Just see for yourself!</span>

                </div>

            </div>

            <div className="welcome-rating-container">

                { this.state.rates.map((welcomeRate : WelcomeRateStructure, index : number) => <WelcomeRate key={ index } icon={ welcomeRate.iconRate } title={ welcomeRate.titleRate } description={ welcomeRate.descriptionRate } /> ) }

            </div>
        
        </>
        
    }

}