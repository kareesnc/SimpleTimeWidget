import { Component, ReactNode, createElement } from "react";
import { TimeInput } from "./components/TimeInput";
import { hot } from "react-hot-loader/root";
import { SimpleTimeWidgetContainerProps } from "../typings/SimpleTimeWidgetProps";

import "./ui/SimpleTimeWidget.css";

class SimpleTimeWidget extends Component<SimpleTimeWidgetContainerProps> {
    private readonly onUpdateHandle = this.onUpdate.bind(this);

    render(): ReactNode {
        //alert("this.props.timeAttribute.value "+this.props.timeAttribute.value);
        return <TimeInput 
                    value={this.props.timeAttribute.value} 
                    style={this.props.style}
                    className={this.props.class}
                    tabIndex={this.props.tabIndex}
                    onUpdate={this.onUpdateHandle}
                    disabled={this.isReadOnly()}
                />;
    }

    /*
    So as far as I can tell, the current problem occurrs when going from an invalid time state to another invalid time state. 
    Ex: one 0 in minutes to no digits in minutes ; anything invalid in hours to trying to change something in minutes
    This doesn't happen when the time value is originally empty, but setting the value to null/undefined didn't help
    In one test, it appeared that the renders aren't getting called natually in this state?
    */
    private onUpdate(value: Date) {
        this.props.timeAttribute.setValue(value);
    }
    private isReadOnly(): boolean {
        return this.props.editable === "never" || this.props.timeAttribute.readOnly;
    }
}

export default hot(SimpleTimeWidget);
