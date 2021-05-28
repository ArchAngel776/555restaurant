import React, { ReactNode } from 'react';
import { STORAGE } from '../../Data/Constants/Storage';
import { STRING } from '../../Data/Constants/String';
import DataMapping from '../../Data/Interfaces/DataMapping';
import ResultData from '../../Data/Interfaces/ResultData';
import ScreenComponent, { ScreenComponentProps, ScreenComponentState } from '../Components/ScreenComponent';
import RenderScreen from '../Functional/RenderScreen';
import Json from '../Services/Json';
import LocalStorage from '../Services/LocalStorage';
import NameIcon from "../../Assets/name.png";
import PreparationTimeIcon from "../../Assets/preparation_time.png";
import TypeIcon from "../../Assets/type.png";
import NumberOfSlicesIcon from "../../Assets/no_of_slices.png";
import DiameterIcon from "../../Assets/diameter.png";
import SpicinessScaleIcon from "../../Assets/spiciness_scale.png";
import SlicesOfBreadIcon from "../../Assets/slices_of_bread.png";
import ResultDataColumn from '../../Data/Interfaces/ResultDataColumn';
import ObjectBuilder from '../Services/ObjectBuilder';
import "../../Styles/Result.css";
import { AppScreen } from '../../Data/Enums/AppScreen';

// Props

export interface ResultProps extends ScreenComponentProps {}

// State

export interface ResultState extends ScreenComponentState {
    data : ResultData;
    dataMapping : DataMapping;
}

// Component

export default class Result extends ScreenComponent<ResultProps, ResultState> {

    public constructor(props : ResultProps) {

        super(props);

        this.state = {
            opacity: 0,
            data: {},
            dataMapping: {
                "Name": {
                    name: "name",
                    icon: NameIcon
                },
                "Preparation time": {
                    name: "preparation_time",
                    icon: PreparationTimeIcon
                },
                "Type": {
                    name: "type",
                    icon: TypeIcon
                },
                "Number of slices": {
                    name: "no_of_slices",
                    icon: NumberOfSlicesIcon
                },
                "Diameter": {
                    name: "diameter",
                    icon: DiameterIcon
                },
                "Spiciness scale": {
                    name: "spiciness_scale",
                    icon: SpicinessScaleIcon
                },
                "Slices of bread": {
                    name: "slices_of_bread",
                    icon: SlicesOfBreadIcon
                }
            }
        };

        this.backToTheWelcome = this.backToTheWelcome.bind(this);

        this.makeANewOrder = this.makeANewOrder.bind(this);

    }

    public componentDidMount() : void {

        super.componentDidMount();

        const resultString = new LocalStorage(STORAGE.RESULT).getString();

        const data = new Json<ResultData>(resultString || STRING.EMPTY_OBJECT).parse();

        this.setState({ data });

    }

    protected createColumnsArray() : Array<ResultDataColumn> {

        const result = [];

        for (const title in this.state.dataMapping) {

            const { name, icon } = this.state.dataMapping[ title ];

            if (name in this.state.data) {

                const column = new ObjectBuilder<ResultDataColumn>().add("name", title).add("value", this.state.data[ name ].toString()).add("icon", icon).flush();

                result.push(column);

            }

        }

        return result;

    }

    protected backToTheWelcome() : void {

        new LocalStorage(STORAGE.RESULT).remove();

        this.changeScreen(AppScreen.WELCOME);

    }

    protected makeANewOrder() : void {

        new LocalStorage(STORAGE.RESULT).remove();

        this.changeScreen(AppScreen.ORDER);

    }

    protected menu() : ReactNode {

        return <> 
        
            <button type="button" className="result-button-control" onClick={ this.backToTheWelcome }> Back to the welcome </button> 
            
            <button type="button" className="result-button-control" onClick={ this.makeANewOrder }> Make a new order </button> 

        </>;

    }

    @RenderScreen
    public render() : ReactNode {

        return <>
        
            <div className="result-container">

                <h1 className="result-title">Congratulations!</h1>

                <span className="result-description">Your order was booked corectly. Now you can back to our welcome screen or order new dish. This decision is your to make!</span>

            </div>

           <div className="result-data-container">

                <h1 className="result-data-title">Your order data</h1>

                { 
                
                    this.createColumnsArray().map((column : ResultDataColumn, index : number) => 
                    
                        <div key={ index } className="result-data-column-container"> 
                        
                            <div className="result-data-column-name-container">
                                
                                <img src={ column.icon } className="result-data-column-name-icon" alt="Icon" />

                                <span className="result-data-column-name-content">{ column.name }</span>

                            </div> 

                            <div className="result-data-column-value-container">

                                <span className="result-data-column-value-content">{ column.value }</span>

                            </div>
                            
                        </div> 
                    
                    ) 
                    
                }

           </div>

        </>;

    }

}