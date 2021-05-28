import React, { ReactNode } from 'react';
import ScreenComponent, { ScreenComponentProps, ScreenComponentState } from '../Components/ScreenComponent';
import RenderScreen from '../Functional/RenderScreen';
import "../../Styles/Order.css";
import { AppScreen } from '../../Data/Enums/AppScreen';
import Input from '../Components/Input';
import Select from '../Components/Select';
import { FoodType } from '../../Data/Enums/FoodType';
import PizzaIcon from "../../Assets/pizza.png";
import SoupIcon from "../../Assets/soup.png";
import SandwichIcon from "../../Assets/sandwich.png";
import { STRING } from '../../Data/Constants/String';
import FormControlStructure from '../../Data/Interfaces/FormControlStructure';
import { FieldType } from '../../Data/Enums/FieldType';
import NameValidator from '../Validators/NameValidator';
import PreparationTimeValidator from '../Validators/PreparationTimeValidator';
import TypeValidator from '../Validators/TypeValidator';
import NoOfSlicesValidator from '../Validators/NoOfSlicesValidator';
import DiameterValidator from '../Validators/DiameterValidator';
import SpicinessScaleValidator from '../Validators/SpicinessScaleValidator';
import SlicesOfBreadValidator from '../Validators/SlicesOfBreadValidator';
import AlertBoxShowCallback from '../../Data/Interfaces/AlertBoxShowCallback';
import ObjectBuilder from '../Services/ObjectBuilder';
import { ValidationStatus } from '../../Data/Enums/ValidationStatus';
import HttpRequest from '../Services/HttpClient';
import ObjectStructure from '../../Data/Interfaces/ObjectStructure';
import OrderValidaion from '../Functional/OrderValidation';
import FormControlOptions from '../../Data/Interfaces/FormControlOptionts';
import OrderException from '../../Data/Interfaces/OrderException';
import ResultData from '../../Data/Interfaces/ResultData';
import LocalStorage from '../Services/LocalStorage';
import { STORAGE } from '../../Data/Constants/Storage';
import Callback from '../../Data/Interfaces/Callback';

// Props

export interface OrderProps extends ScreenComponentProps {
    alertBoxShow : AlertBoxShowCallback;
    waiterOn : Callback;
    waiterOff : Callback;
}

// State

export interface OrderState extends ScreenComponentState {
    formStructure : FormControlStructure;
}

// Component

export default class Order extends ScreenComponent<OrderProps, OrderState> {

    public constructor(props : OrderProps) {

        super(props);

        this.state = {
            opacity: 0,
            formStructure: {
                name: {
                    active: true,
                    value: STRING.EMPTY,
                    externalException: null,
                    type: FieldType.STRING,
                    Validator: NameValidator
                },
                preparation_time: {
                    active: true,
                    value: STRING.EMPTY,
                    externalException: null,
                    type: FieldType.STRING,
                    Validator: PreparationTimeValidator
                },
                type: {
                    active: true,
                    value: FoodType.NONE,
                    externalException: null,
                    type: FieldType.STRING,
                    Validator: TypeValidator,
                    options: [
                        {
                            value: FoodType.NONE,
                            name: "--Select Type--"
                        },
                        {
                            value: FoodType.PIZZA,
                            icon: PizzaIcon,
                            name: "Pizza"
                        },
                        {
                            value: FoodType.SOUP,
                            icon: SoupIcon,
                            name: "Soup"
                        },
                        {
                            value: FoodType.SANDWICH,
                            icon: SandwichIcon,
                            name: "Sandwich"
                        }
                    ]
                },
                no_of_slices: {
                    active: false,
                    value: STRING.EMPTY,
                    externalException: null,
                    type: FieldType.INTEGER,
                    Validator: NoOfSlicesValidator
                },
                diameter: {
                    active: false,
                    value: STRING.EMPTY,
                    externalException: null,
                    type: FieldType.FLOAT,
                    Validator: DiameterValidator
                },
                spiciness_scale: {
                    active: false,
                    value: STRING.EMPTY,
                    externalException: null,
                    type: FieldType.INTEGER,
                    Validator: SpicinessScaleValidator
                },
                slices_of_bread: {
                    active: false,
                    value: STRING.EMPTY,
                    externalException: null,
                    type: FieldType.INTEGER,
                    Validator: SlicesOfBreadValidator
                }
            }
        };

        this.enableControl = this.enableControl.bind(this);

        this.disableControl = this.disableControl.bind(this);

        this.changeType = this.changeType.bind(this);

        this.order = this.order.bind(this);

        this.goToWelcome = this.goToWelcome.bind(this);

    }

    protected setControlValue(name : string, value : string) : void {

        const { formStructure } = this.state;

        formStructure[name].value = value;

        this.setState({ formStructure });

    }

    protected enableControl(name : string) : void {

        const { formStructure } = this.state;

        formStructure[name].active = true;

        this.setState({ formStructure });

    }

    protected disableControl(name : string) : void {

        const { formStructure } = this.state;

        formStructure[name].active = false;

        this.setState({ formStructure });

    }

    protected enableManyControls(...names : Array<string>) : void {

        names.forEach( this.enableControl );

    }

    protected disableManyControls(...names : Array<string>) : void {

        names.forEach( this.disableControl );

    }

    protected showExternalException(name : string, exception : string) {

        const { formStructure } = this.state;

        formStructure[name].externalException = exception;

        this.setState({ formStructure });

    }

    protected closeExternalException(name : string) {

        const { formStructure } = this.state;

        formStructure[name].externalException = null;

        this.setState({ formStructure });

    }

    protected detectAddonFields(type : FoodType) : void {

        switch (type) {

            case FoodType.PIZZA:

                this.disableManyControls("spiciness_scale", "slices_of_bread");

                this.enableManyControls("no_of_slices", "diameter");

            break;

            case FoodType.SOUP:

                this.disableManyControls("no_of_slices", "diameter", "slices_of_bread");

                this.enableManyControls("spiciness_scale");

            break;

            case FoodType.SANDWICH:

                this.disableManyControls("no_of_slices", "diameter", "spiciness_scale");

                this.enableManyControls("slices_of_bread");

            break;

            default:

                this.disableManyControls("no_of_slices", "diameter", "spiciness_scale", "slices_of_bread");

            break;

        }

    }

    protected changeType(value : string) : void {

        this.setControlValue("type", value);

        this.detectAddonFields(this.state.formStructure.type.value as FoodType);

    }

    protected getFormControls() : FormControlStructure {

        const builder = new ObjectBuilder<FormControlStructure>();

        for (const field in this.state.formStructure) {

            if (this.state.formStructure[ field ].active) {

                builder.add(field, this.state.formStructure[ field ]);

            }

        }

        return builder.flush();

    }

    protected validate(fields : FormControlStructure) : boolean {

        for (const field in fields) {

            const { value, Validator } = fields[field];

            const result = new Validator(value).validate();

            if (result.status === ValidationStatus.BAD) {

                this.props.alertBoxShow("Woo... Woo... You have written some incorrect informations", "In your order appears same errors and more specifically:", result.message as string);

                return false;

            }

        }

        return true;

    }

    protected parseFormValue(control : FormControlOptions) : number | string {

        switch (control.type) {

            case FieldType.INTEGER:

                return parseInt(control.value);

            case FieldType.FLOAT:

                return parseFloat(control.value);

            case FieldType.STRING:

                return control.value;

            default:

                return control.value.toString();

        }

    }

    protected getFormBody(fields : FormControlStructure) : ObjectStructure {

        const builder = new ObjectBuilder<ObjectStructure>();

        for (const field in fields) {

            if (this.state.formStructure[ field ].value.length > 0) {

                builder.add(field, this.parseFormValue(fields[ field ]));

            }

        }

        return builder.flush();

    }

    protected orderResult(data : ResultData) : void {

        new LocalStorage(STORAGE.RESULT).setString( JSON.stringify(data) );

        this.props.changeScreen(AppScreen.RESULT);

    }

    protected orderException(exception : OrderException) : void {

        for (const name in exception) {

            this.showExternalException(name, exception[ name ]);

        }

    }
    
    @OrderValidaion
    protected async makeOrder(fields : FormControlStructure) : Promise<void> {

        try {

            this.props.waiterOn();

            const json = this.getFormBody(fields);

            const result = await new HttpRequest("https://frosty-wood-6558.getsandbox.com:443/dishes").Header("Content-Type", "application/json").JsonBody(json).Post();

            this.props.waiterOff();

            return result.id ? this.orderResult(result) : this.orderException(result);

        }

        catch (exception) {

            this.props.waiterOff();

            this.props.alertBoxShow("Http Request Error", `Something went wrong during make HTTP request. Exception message: ${exception}`);

        }

    }

    protected order() : void {

        const fields = this.getFormControls();

        this.makeOrder(fields);

    }

    protected goToWelcome() : void {

        this.changeScreen(AppScreen.WELCOME);

    }

    protected menu() : ReactNode {

        return <button type="button" className="order-button-control" onClick={ this.goToWelcome }> Back </button>;

    }

    @RenderScreen 
    public render() : ReactNode {

        return <>
        
            <div className="order-container">

                <h1 className="order-title">Order your meal</h1>

                <div className="order-description-container">

                    <span className="order-description-content">Create your unique, custom dish. You are the boss here! You decide about name and time preparation. It's awesome, isn't it?</span>

                </div>

            </div>

            <form className="order-form">

                <Input 
                    active={ this.state.formStructure.name.active } 
                    label="Name:" 
                    placeholder="eg. Ultra Meal" 
                    value={ this.state.formStructure.name.value } 
                    onInput={ value => this.setControlValue("name", value) }
                    externalException={ this.state.formStructure.name.externalException }
                    closeExternalException={ () => this.closeExternalException("name") }
                    validator={ this.state.formStructure.name.Validator } />

                <Input
                    active={ this.state.formStructure.preparation_time.active }
                    label="Preparation time:"
                    placeholder="00:00:00"
                    value={ this.state.formStructure.preparation_time.value }
                    onInput={ value => this.setControlValue("preparation_time", value) }
                    externalException={ this.state.formStructure.preparation_time.externalException }
                    closeExternalException={ () => this.closeExternalException("preparation_time") }
                    validator={ this.state.formStructure.preparation_time.Validator } />

                <Select
                    active={ this.state.formStructure.type.active }
                    label="Type:"
                    options={ this.state.formStructure.type.options || [] }
                    value={ this.state.formStructure.type.value }
                    onSelect={ this.changeType }
                    externalException={ this.state.formStructure.type.externalException }
                    closeExternalException={ () => this.closeExternalException("type") }
                    validator={ this.state.formStructure.type.Validator } />

                <Input
                    active={ this.state.formStructure.no_of_slices.active }
                    label="Number of slices:"
                    placeholder="eg. 8"
                    value={ this.state.formStructure.no_of_slices.value }
                    onInput={ value => this.setControlValue("no_of_slices", value) }
                    externalException={ this.state.formStructure.no_of_slices.externalException }
                    closeExternalException={ () => this.closeExternalException("no_of_slices") }
                    validator={ this.state.formStructure.no_of_slices.Validator } />

                <Input
                    active={ this.state.formStructure.diameter.active }
                    label="Diameter:"
                    placeholder="eg. 6.8"
                    value={ this.state.formStructure.diameter.value }
                    onInput={ value => this.setControlValue("diameter", value) }
                    externalException={ this.state.formStructure.diameter.externalException }
                    closeExternalException={ () => this.closeExternalException("diameter") }
                    validator={ this.state.formStructure.diameter.Validator } />

                <Input
                    active={ this.state.formStructure.spiciness_scale.active }
                    label="Spiciness scale (1 - 10):"
                    placeholder="eg. 6"
                    value={ this.state.formStructure.spiciness_scale.value }
                    onInput={ value => this.setControlValue("spiciness_scale", value) }
                    externalException={ this.state.formStructure.spiciness_scale.externalException }
                    closeExternalException={ () => this.closeExternalException("spiciness_scale") }
                    validator={ this.state.formStructure.spiciness_scale.Validator } />

                <Input
                    active={ this.state.formStructure.slices_of_bread.active }
                    label="Slices of bread:"
                    placeholder="eg. 2"
                    value={ this.state.formStructure.slices_of_bread.value }
                    onInput={ value => this.setControlValue("slices_of_bread", value) }
                    externalException={ this.state.formStructure.slices_of_bread.externalException }
                    closeExternalException={ () => this.closeExternalException("slices_of_bread") }
                    validator={ this.state.formStructure.slices_of_bread.Validator } />

                <button type="button" className="order-form-button" onClick={ this.order }>Order</button>

            </form>

        </>;

    }

}