import { Component, ReactNode, createElement } from "react";
import { TimeInput } from "./components/TimeInput";
import { hot } from "react-hot-loader/root";
import { SimpleTimeWidgetContainerProps } from "../typings/SimpleTimeWidgetProps";

import "./ui/SimpleTimeWidget.css";

class SimpleTimeWidget extends Component<SimpleTimeWidgetContainerProps> {
    private readonly onUpdateHandle = this.onUpdate.bind(this);

    render(): ReactNode {
        return <TimeInput 
                    value={this.props.timeAttribute.value} 
                    style={this.props.style}
                    className={this.props.class}
                    tabIndex={this.props.tabIndex}
                    onUpdate={this.onUpdateHandle}
                    disabled={this.isReadOnly()}
                />;
    }

    private onUpdate(value: Date) {
        this.props.timeAttribute.setValue(value);
    }
    private isReadOnly(): boolean {
        return this.props.editable === "never" || this.props.timeAttribute.readOnly;
    }
}

export default hot(SimpleTimeWidget);
