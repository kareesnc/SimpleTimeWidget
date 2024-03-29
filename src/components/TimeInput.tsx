import { Component, ReactNode, Fragment, CSSProperties, ChangeEvent, createElement } from "react";
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
    showAsText?: boolean;
    required?: boolean;
    hasError?: boolean;
    invalidMessage?: string;
    renderNumber?: boolean;
    render24hr?: boolean;
}
interface InputState {
    hourValue?: string;
    minuteValue?: string;
    ampmValue?: string;
    lastKnownDate: string;
    validationString?: string;
    wrapperClassName: string;
}

export class TimeInput extends Component<InputProps> {
    private readonly handleHourChange = this.onHourChange.bind(this);
    private readonly handleMinuteChange = this.onMinuteChange.bind(this);
    private readonly handleBlur = this.onBlur.bind(this);
    private readonly handleDropdownChange = this.onDropdownChange.bind(this);
    private readonly defaultWrapperClass = classNames("time-input",this.props.className);
    private readonly inputLength = 2;
    readonly state: InputState = { 
        hourValue: undefined, 
        minuteValue: undefined, 
        ampmValue: undefined,
        validationString: undefined,
        lastKnownDate: "1970-01-01",
        wrapperClassName: this.defaultWrapperClass
    };
    componentDidUpdate(prevProps: InputProps) {
        if (this.props.value !== prevProps.value) {
            if(this.props.value != undefined){
                const timeValue = Moment(this.props.value);
                if(this.props.render24hr) {
                    this.setState({ 
                        hourValue: timeValue.format("H"), 
                        minuteValue: timeValue.format("mm"), 
                        ampmValue: undefined,
                        lastKnownDate: timeValue.format("YYYY-MM-DD")
                    });
                }
                else {
                    this.setState({ 
                        hourValue: timeValue.format("h"), 
                        minuteValue: timeValue.format("mm"), 
                        ampmValue: timeValue.format("A"),
                        lastKnownDate: timeValue.format("YYYY-MM-DD")
                    });
                }
            }
            else{
                // attempt to fetch date from prior value
                var lastDate = "1970-01-01";
                if(prevProps.value != undefined){
                    lastDate = Moment(prevProps.value).format("YYYY-MM-DD");
                }
                this.setState({ 
                    hourValue: undefined, 
                    minuteValue: undefined, 
                    ampmValue: undefined,
                    lastKnownDate: lastDate
                });
            }
            this.clearError();
        }
    }

    render(): ReactNode {
        const labelledby = `${this.props.id}-label`
            + (this.props.hasError ? ` ${this.props.id}-error` : "");
        if(this.props.disabled && this.props.showAsText){
            var displayText = "";
            if(this.props.value){
                displayText = this.getCurrentHourValue()+":"+this.getCurrentMinuteValue();
                if(!this.props.render24hr) {
                    displayText = displayText+" "+this.getCurrentAMPMValue();
                }
            }
            return <p 
                id={this.props.id}
                className={classNames("form-control-static",this.props.className)}
                style={this.props.style}
                tabIndex={this.props.tabIndex}
                aria-labelledby={labelledby}
                >
                    {displayText}&nbsp;
                </p>;
        }
        return  <Fragment>
                <div 
                    id={this.props.id}
                    className={this.state.wrapperClassName}
                    style={this.props.style}
                    tabIndex={this.props.tabIndex}
                    aria-labelledby={labelledby}
                    aria-invalid={this.props.hasError}
                    aria-required={this.props.required}
                >
                    {this.props.renderNumber ? this.renderNumberInput(true) : this.renderTextInput(true)}
                    <span className="time-input-item">:</span>
                    {this.props.renderNumber ? this.renderNumberInput(false) : this.renderTextInput(false)}
                    {this.props.render24hr ? null : this.renderAMPMInput()}
                </div>
                <Alert 
                    id={this.props.id + "-input-error"}
                    className="time-input-alert"
                >
                    {this.state.validationString}
                </Alert>
                </Fragment>; 
    }

    private renderTextInput(isHours: boolean): ReactNode {
        return <input type="text" 
                    className={classNames("form-control","time-input-item")} 
                    maxLength={this.inputLength} 
                    size={this.inputLength} 
                    onChange={isHours ? this.handleHourChange : this.handleMinuteChange}
                    onBlur={this.handleBlur}
                    disabled={this.props.disabled}
                    value={isHours ? this.getCurrentHourValue() : this.getCurrentMinuteValue()}
                    placeholder={isHours ? "HH" : "MM"} />;
    }
    private renderNumberInput(isHours: boolean): ReactNode {
        var maxNumber = 59;
        if(isHours) {
            maxNumber = 12;
            if(this.props.render24hr) {
                maxNumber = 23;
            }
        }
        return <input type="number" 
                    className={classNames("form-control","time-input-item","number-input")} 
                    min={isHours ? 1 : 0} 
                    max={maxNumber} 
                    onChange={isHours ? this.handleHourChange : this.handleMinuteChange}
                    onBlur={this.handleBlur}
                    disabled={this.props.disabled}
                    value={isHours ? this.getCurrentHourValue() : this.getCurrentMinuteValue()}
                    placeholder={isHours ? "HH" : "MM"} />;
    }
    private renderAMPMInput(): ReactNode {
        return      <select className={classNames("form-control","time-input-item")} 
                           onChange={this.handleDropdownChange}
                           onBlur={this.handleBlur}
                           disabled={this.props.disabled}
                           value={this.getCurrentAMPMValue()}>
                        <option value=""></option>
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                    </select>;
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

    // sets the error message and the has-error class
    // it would be better if has-error could be set on the form-group instead
    private setError() {
        this.setState({ 
            validationString: this.props.invalidMessage,
            wrapperClassName: classNames("has-error", this.defaultWrapperClass)
        });
        
    }
    // clear the error message and remove the has-error class
    private clearError() {
        this.setState({ 
            validationString: undefined,
            wrapperClassName: this.defaultWrapperClass
        });
    }

    // detects whether a change has occurred and, if it has, passes that change up
    // the change will not be passed if the input is disabled, or if the time is invalid
    private onBlur() {
        if(this.props.disabled) {
            return;
        }
        const newTime = this.makeTime();
        // if new time is undefined, the time was invalid
        if(newTime) { 
            // if value is undefined but new time is not, the value used to be empty but is now set
            if(!this.props.value || this.props.value.getTime() !== newTime.getTime()) {
                if (this.props.onUpdate) {
                    this.props.onUpdate(newTime);
                }
            }
            this.clearError();
        }
        // unless all 3 inputs are empty, then set empty
        else if((this.state.hourValue=="" || this.state.hourValue==undefined)
                && (this.state.minuteValue=="" || this.state.minuteValue==undefined) 
                && (this.state.ampmValue=="" || this.state.ampmValue==undefined)) {
            if (this.props.onUpdate) {
                this.props.onUpdate(undefined);
            }
            this.clearError();
        }
        else {
            this.setError();
        }
    }
    // converts the 3 input fields, plus the original date component into a Date object
    // returns undefined if one of the date components is empty or invalid
    private makeTime(): Date | undefined {
        if(this.props.value != undefined) {
            var newTime = Moment(this.props.value);
        }
        else {
            // if the date portion is not set, try to set last date or epoch
            var newTime = Moment(this.state.lastKnownDate);
        }
        if(this.state.hourValue && this.state.minuteValue) {
            var hoursInt = parseInt(this.state.hourValue);
            var minutesInt = parseInt(this.state.minuteValue);
            if(this.props.render24hr) {
                if( isNaN(hoursInt) || hoursInt<0 || hoursInt>23 
                    || isNaN(minutesInt) || minutesInt<0 || minutesInt>59 ) {
                    return undefined;
                }
                newTime.hour(hoursInt);
                newTime.minute(minutesInt);
                return newTime.toDate();
            }
            else {
                if((this.state.ampmValue!="AM" && this.state.ampmValue!="PM") 
                    || isNaN(hoursInt) || hoursInt<1 || hoursInt>12 
                    || isNaN(minutesInt) || minutesInt<0 || minutesInt>59 ) {
                    return undefined;
                }
                if(this.state.ampmValue=="AM" && hoursInt==12) {
                    hoursInt=0;
                }
                if(this.state.ampmValue=="PM" && hoursInt!=12) {
                    hoursInt = hoursInt+12
                }
                newTime.hour(hoursInt);
                newTime.minute(minutesInt);
                return newTime.toDate();
            }
        }
        else {
            return undefined;
        }
    }
}
