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
        this.setValues();
        var hourInput = this.renderHours();
        var minuteInput = this.renderMinutes();
        var ampmInput = this.renderAMPM();
        return <div 
                className={this.props.className}
                style={this.props.style}
                tabIndex={this.props.tabIndex}
                >
                    {hourInput}
                    <span> : </span>
                    {minuteInput}
                    <span> </span>
                    {ampmInput}
                </div>; 
    }

    private setValues() {
        if(this.props.value!=null && this.props.value!=undefined){
            var momentValue = Moment(this.props.value);
            this.lastKnownDate = momentValue.format("YYYY-MM-DD");
            this.hourValue = momentValue.format("h");
            this.minuteValue = momentValue.format("mm");
            this.ampmValue = momentValue.format("A");
        }
    }
    private renderHours(): ReactNode {
        if(this.hourValue=="") {
            return <input type="text" 
                          className={this.inputClass} 
                          maxLength={this.inputLength} 
                          size={this.inputLength} 
                          onChange={this.handleChange}
                          disabled={this.props.disabled}
                          placeholder="HH" />
        }
        else {
            return <input type="text" 
                          className={this.inputClass} 
                          maxLength={this.inputLength} 
                          size={this.inputLength} 
                          onChange={this.handleChange}
                          disabled={this.props.disabled}
                          value={this.hourValue}
                          placeholder="HH" />
        }
    }
    private renderMinutes(): ReactNode {
        if(this.minuteValue=="") {
            return <input type="text" 
                          className={this.inputClass} 
                          maxLength={this.inputLength} 
                          size={this.inputLength} 
                          onChange={this.handleChange}
                          disabled={this.props.disabled}
                          placeholder="MM" />
        }
        else {
            return <input type="text" 
                          className={this.inputClass} 
                          maxLength={this.inputLength} 
                          size={this.inputLength} 
                          onChange={this.handleChange}
                          disabled={this.props.disabled}
                          value={this.minuteValue}
                          placeholder="MM" />
        }
    }
    private renderAMPM(): ReactNode {
        if(this.ampmValue=="AM") {
            return <select className={this.inputClass} 
                           onChange={this.handleDropdownChange}
                           disabled={this.props.disabled}>
                        <option value=""></option>
                        <option value="AM" selected>AM</option>
                        <option value="PM">PM</option>
                   </select>
        }
        else if(this.ampmValue=="PM") {
            return <select className={this.inputClass} 
                           onChange={this.handleDropdownChange}
                           disabled={this.props.disabled}>
                        <option value=""></option>
                        <option value="AM">AM</option>
                        <option value="PM" selected>PM</option>
                   </select>
        }
        else {
            return <select className={this.inputClass} 
                           onChange={this.handleDropdownChange}
                           disabled={this.props.disabled}>
                        <option value=""></option>
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                   </select>
        }
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
        if (this.props.onUpdate) { 
            this.props.onUpdate(this.makeTime());
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
        if(this.hourValue=="" || this.minuteValue=="" || this.ampmValue=="") {
            return undefined;
        }
        var hoursInt = parseInt(this.hourValue);
        if(isNaN(hoursInt) || hoursInt<1 || hoursInt>12) {
            return undefined;
        }
        var minutesInt = parseInt(this.minuteValue);
        if(isNaN(minutesInt) || this.minuteValue.length<2 || minutesInt<0 || minutesInt>59) {
            return undefined;
        }
        if(this.ampmValue!="AM" && this.ampmValue!="PM") {
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