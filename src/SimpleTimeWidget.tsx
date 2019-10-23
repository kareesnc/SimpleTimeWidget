import { Component, ReactNode, Fragment, createElement } from "react";
import { TimeInput } from "./components/TimeInput";
import { Alert } from "./components/Alert";
import { hot } from "react-hot-loader/root";
import { SimpleTimeWidgetContainerProps } from "../typings/SimpleTimeWidgetProps";

import "./ui/SimpleTimeWidget.css";

class SimpleTimeWidget extends Component<SimpleTimeWidgetContainerProps> {
    private readonly onUpdateHandle = this.onUpdate.bind(this);
    componentDidMount() {
        this.props.timeAttribute.setValidator(this.validator.bind(this));
    }

    render(): ReactNode {
        const validationFeedback = this.props.timeAttribute.validation;
        const required = !!(this.props.requiredMessage && this.props.requiredMessage.value);
        return <Fragment>
                    <TimeInput 
                        id={this.props.id}
                        value={this.props.timeAttribute.value} 
                        disabled={this.props.timeAttribute.readOnly}
                        style={this.props.style}
                        className={this.props.class}
                        tabIndex={this.props.tabIndex}
                        onUpdate={this.onUpdateHandle}
                        showAsText={this.readStyle()}
                        required={required}
                        hasError={!!validationFeedback}
                        invalidMessage={this.invalidMessage()}
                        renderNumber={this.inputStyle()}
                        render24hr={this.hoursMode()}
                    />
                    <Alert 
                        id={this.props.id + "-validation-error"}
                        className="time-input-alert"
                    >
                        {validationFeedback}
                    </Alert>
                </Fragment>;
    }

    private onUpdate(value: Date) {
        const { timeAttribute, onChangeAction } = this.props;
        timeAttribute.setValue(value);
        if (onChangeAction && onChangeAction.canExecute) {
            onChangeAction.execute();
        }
    }
    private readStyle(): boolean {
        return this.props.readStyle === "text";
    }
    private invalidMessage(): string | undefined {
        return this.props.invalidMessage ? this.props.invalidMessage.value : "Invalid time";
    }
    private inputStyle(): boolean {
        return this.props.inputStyle === "number";
    }
    private hoursMode(): boolean {
        return this.props.hoursMode === "x24hr";
    }
    private validator(value: Date | undefined): string | undefined {
        const { required, requiredMessage } = this.props;
        if (required==="yes" && requiredMessage && requiredMessage.value && !value) {
            return requiredMessage.value;
        }
        return;
    }
}

export default hot(SimpleTimeWidget);
