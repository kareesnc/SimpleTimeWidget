import { Component, ReactNode, Fragment, createElement } from "react";
import { TimeInput } from "./components/TimeInput";
import { Alert } from "./components/Alert";
import { hot } from "react-hot-loader/root";
import { SimpleTimeWidgetContainerProps } from "../typings/SimpleTimeWidgetProps";

import "./ui/SimpleTimeWidget.css";

class SimpleTimeWidget extends Component<SimpleTimeWidgetContainerProps> {
    private readonly onUpdateHandle = this.onUpdate.bind(this);

    render(): ReactNode {
        return <Fragment>
                    <TimeInput 
                        value={this.props.timeAttribute.value} 
                        style={this.props.style}
                        className={this.props.class}
                        tabIndex={this.props.tabIndex}
                        onUpdate={this.onUpdateHandle}
                        disabled={this.isReadOnly()}
                    />
                    <Alert>{this.props.timeAttribute.validation}</Alert>
                </Fragment>;
    }

    private onUpdate(value: Date) {
        const { timeAttribute, onChangeAction } = this.props;
        timeAttribute.setValue(value);
        if (onChangeAction && onChangeAction.canExecute) {
            onChangeAction.execute();
        }
    }
    private isReadOnly(): boolean {
        return this.props.editable === "never" || this.props.timeAttribute.readOnly;
    }
}

export default hot(SimpleTimeWidget);
