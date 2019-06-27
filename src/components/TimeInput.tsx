import { Component, ReactNode, CSSProperties, ChangeEvent, createElement } from "react";
import Moment from "moment";
import classNames from "classnames";
import { Alert } from "../components/Alert";

export interface InputProps {
    id?: string;
    value: Date | undefined;
    className?: string;
    style?: CSSProperties;
    tabIndex?: number;
    onUpdate?: (value: Date | undefined) => void;
    disabled?: boolean;
    required?: boolean;
    hasError?: boolean;
    invalidMessage?: string;
}
interface InputState {
    hourValue?: string;
    minuteValue?: string;
    ampmValue?: string;
    validationString?: string;
    wrapperClassName: string;
}

export class TimeInput extends Component<InputProps> {
    private readonly handleHourChange = this.onHourChange.bind(this);
    private readonly handleMinuteChange = this.onMinuteChange.bind(this);
    private readonly handleBlur = this.onBlur.bind(this);
    private readonly handleDropdownChange = this.onDropdownChange.bind(this);
    private readonly inputLength = 2;
    readonly state: InputState = { 
        hourValue: undefined, 
        minuteValue: undefined, 
        ampmValue: undefined,
        validationString: undefined,
        wrapperClassName: classNames(this.props.className)
    };
    componentDidUpdate(prevProps: InputProps) {
        if (this.props.value !== prevProps.value) {
            const momentValue = Moment(this.props.value);
            const hourValue = momentValue.format("h");
            const minuteValue = momentValue.format("mm");
            const ampmValue = momentValue.format("A");
            this.setState({ 
                hourValue: hourValue, 
                minuteValue: minuteValue, 
                ampmValue: ampmValue, 
                validationString: undefined,
                wrapperClassName: classNames(this.props.className)
            });
        }
    }

    render(): ReactNode {
        const inputClassName = classNames("form-control", "time-input");
        const labelledby = `${this.props.id}-label`
            + (this.props.hasError ? ` ${this.props.id}-error` : "");
        return <div 
                id={this.props.id}
                className={this.state.wrapperClassName}
                style={this.props.style}
                tabIndex={this.props.tabIndex}
                aria-labelledby={labelledby}
                aria-invalid={this.props.hasError}
                aria-required={this.props.required}
                >
                    <input type="text" 
                          className={inputClassName} 
                          maxLength={this.inputLength} 
                          size={this.inputLength} 
                          onChange={this.handleHourChange}
                          onBlur={this.handleBlur}
                          disabled={this.props.disabled}
                          value={this.getCurrentHourValue()}
                          placeholder="HH" />
                    <span> : </span>
                    <input type="text" 
                          className={inputClassName} 
                          maxLength={this.inputLength} 
                          size={this.inputLength} 
                          onChange={this.handleMinuteChange}
                          onBlur={this.handleBlur}
                          disabled={this.props.disabled}
                          value={this.getCurrentMinuteValue()}
                          placeholder="MM" />
                    <span> </span>
                    <select className={inputClassName} 
                           onChange={this.handleDropdownChange}
                           onBlur={this.handleBlur}
                           disabled={this.props.disabled}
                           value={this.getCurrentAMPMValue()}>
                        <option value=""></option>
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                   </select>
                   <Alert>{this.state.validationString}</Alert>
                </div>; 
    }

    private onHourChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({ hourValue: event.target.value });
    }
    private onMinuteChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({ minuteValue: event.target.value });
    }
    private onDropdownChange(event: ChangeEvent<HTMLSelectElement>) {
        this.setState({ ampmValue: event.target.value });
    }
    private getCurrentHourValue() {
        var nonStateVal = "";
        if(this.props.value != undefined) {
            nonStateVal = Moment(this.props.value).format("h")
        }
        return this.state.hourValue !== undefined
            ? this.state.hourValue
            : nonStateVal;
    }
    private getCurrentMinuteValue() {
        var nonStateVal = "";
        if(this.props.value != undefined) {
            nonStateVal = Moment(this.props.value).format("mm")
        }
        return this.state.minuteValue !== undefined
            ? this.state.minuteValue
            : nonStateVal;
    }
    private getCurrentAMPMValue() {
        var nonStateVal = "";
        if(this.props.value != undefined) {
            nonStateVal = Moment(this.props.value).format("A")
        }
        return this.state.ampmValue !== undefined
            ? this.state.ampmValue
            : nonStateVal;
    }

    // detects whether a change has occurred and, if it has, passes that change up
    // the change will not be passed if the input is disabled, or if the time is invalid
    private onBlur() {
        if(this.props.disabled){
            return;
        }
        const newTime = this.makeTime();
        // if new time is undefined, the time was invalid
        if(newTime){ 
            // if value is undefined but new time is not, the value used to be empty but is now set
            if(!this.props.value || this.props.value.getTime() !== newTime.getTime()){
                if (this.props.onUpdate) {
                    this.props.onUpdate(newTime);
                }
            }
        }
        else {
            this.setState({ 
                validationString: this.props.invalidMessage,
                wrapperClassName: classNames("has-error", this.props.className)
            });
        }
    }
    // converts the 3 input fields, plus the original date component into a Date object
    // returns undefined if one of the date components is empty or invalid
    private makeTime(): Date | undefined {
        if(this.props.value != undefined) {
            var newTime = Moment(this.props.value);
        }
        else {
            // if the date portion is not set, set to epoch - Mendix's default time input also sets epoch in this case
            var newTime = Moment("1970-01-01");
        }
        if(this.state.hourValue && this.state.minuteValue && this.state.ampmValue){
            var hoursInt = parseInt(this.state.hourValue);
            var minutesInt = parseInt(this.state.minuteValue);
            if(this.state.hourValue=="" || this.state.minuteValue=="" || 
                (this.state.ampmValue!="AM" && this.state.ampmValue!="PM") 
                || isNaN(hoursInt) || hoursInt<1 || hoursInt>12 
                || isNaN(minutesInt) || this.state.minuteValue.length<2 
                || minutesInt<0 || minutesInt>59 ) {
                return undefined;
            }
            if(this.state.ampmValue=="AM" && hoursInt==12){
                hoursInt=0;
            }
            if(this.state.ampmValue=="PM" && hoursInt!=12){
                hoursInt = hoursInt+12
            }
            newTime.hour(hoursInt);
            newTime.minute(minutesInt);
            return newTime.toDate();
        }
        else {
            return undefined;
        }
    }
}
