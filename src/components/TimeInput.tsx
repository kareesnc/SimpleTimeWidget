import { Component, ReactNode, CSSProperties, ChangeEvent, createElement } from "react";
import Moment from "moment";
import classNames from "classnames";

export interface InputProps {
    value: Date | undefined;
    className?: string;
    style?: CSSProperties;
    tabIndex?: number;
    onUpdate?: (value: Date | undefined) => void;
    disabled?: boolean;
}

export class TimeInput extends Component<InputProps> {
    private readonly handleChange = this.onChange.bind(this);
    private readonly handleDropdownChange = this.onDropdownChange.bind(this);
    private readonly inputClass = classNames("form-control","time-input");
    private readonly inputLength = 2;
    private lastKnownDate = "1970-01-01";
    private hourValue = "";
    private minuteValue = "";
    private ampmValue = "";

    render(): ReactNode {
        // may need to set Chrome console to verbose to see these log messages
        console.log("rendered value "+this.props.value);
        if(this.props.value!=null && this.props.value!=undefined){
            var momentValue = Moment(this.props.value);
            this.lastKnownDate = momentValue.format("YYYY-MM-DD");
            this.hourValue = momentValue.format("h");
            this.minuteValue = momentValue.format("mm");
            this.ampmValue = momentValue.format("A");
        }
        return <div 
                className={this.props.className}
                style={this.props.style}
                tabIndex={this.props.tabIndex}
                >
                    <input type="text" 
                          className={this.inputClass} 
                          maxLength={this.inputLength} 
                          size={this.inputLength} 
                          onChange={this.handleChange}
                          disabled={this.props.disabled}
                          value={this.hourValue}
                          placeholder="HH" />
                    <span> : </span>
                    <input type="text" 
                          className={this.inputClass} 
                          maxLength={this.inputLength} 
                          size={this.inputLength} 
                          onChange={this.handleChange}
                          disabled={this.props.disabled}
                          value={this.minuteValue}
                          placeholder="MM" />
                    <span> </span>
                    <select className={this.inputClass} 
                           onChange={this.handleDropdownChange}
                           disabled={this.props.disabled}
                           value={this.ampmValue}>
                        <option value=""></option>
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                   </select>
                </div>; 
    }

    private onChange(event: ChangeEvent<HTMLInputElement>) {
        var inputContainer = event.target.parentElement;
        if(inputContainer) {
            this.sharedChangeHandler(inputContainer);
        }
    }
    private onDropdownChange(event: ChangeEvent<HTMLSelectElement>) {
        var inputContainer = event.target.parentElement;
        event.target.options.selectedIndex
        if(inputContainer) {
            this.sharedChangeHandler(inputContainer);
        }
    }
    private sharedChangeHandler(inputContainer: HTMLElement){
        var textBoxes = inputContainer.getElementsByTagName("input");
        var selects = inputContainer.getElementsByTagName("select");
        this.hourValue = textBoxes[0].value;
        this.minuteValue = textBoxes[1].value;
        this.ampmValue = selects[0].value;
        var newTime = this.makeTime();
        if (this.props.onUpdate) { 
            // when you call onUpdate but have no change in value, any text input changes are reversed
            // this is especially noticeable when trying to delete the 2nd character in the minutes field
            // (value is going from empty to empty, and the 2nd character becomes undeletable)
            this.props.onUpdate(Moment().toDate());
            this.props.onUpdate(newTime);
        }
    }
    // converts the 3 input fields, plus the original date component into a Date object
    // returns undefined if one of the date components is empty or invalid
    // attempts to use the last known date portion of the date/time object
    private makeTime(): Date | undefined {
        if(this.props.value==null || this.props.value==undefined){
            var newTime = Moment(this.lastKnownDate);
        }
        else{
            var newTime = Moment(this.props.value);
        }
        var hoursInt = parseInt(this.hourValue);
        var minutesInt = parseInt(this.minuteValue);
        if(this.hourValue=="" || this.minuteValue=="" || (this.ampmValue!="AM" && this.ampmValue!="PM") 
            || isNaN(hoursInt) || hoursInt<1 || hoursInt>12 
            || isNaN(minutesInt) || this.minuteValue.length<2 || minutesInt<0 || minutesInt>59 ) {
            return undefined;
        }
        if(this.ampmValue=="AM" && hoursInt==12){
            hoursInt=0;
        }
        if(this.ampmValue=="PM" && hoursInt!=12){
            hoursInt = hoursInt+12
        }
        newTime.hour(hoursInt);
        newTime.minute(minutesInt);
        return newTime.toDate();
    }
}