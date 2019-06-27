import { Component, createElement, ReactNode } from "react";
import { SimpleTimeWidgetPreviewProps, VisibilityMap } from "../typings/SimpleTimeWidgetProps";
import { TimeInput } from "./components/TimeInput";
import Moment from "moment";

declare function require(name: string): string;

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class preview extends Component<SimpleTimeWidgetPreviewProps> {
    render(): ReactNode {
        const value = `[${this.props.timeAttribute}]`;
        return <TimeInput value={Moment(value).toDate()} disabled={this.props.editable === "never"} />;
    }
}

export function getVisibleProperties(_valueMap: SimpleTimeWidgetPreviewProps, visibilityMap: VisibilityMap): VisibilityMap {
    /* To hide any property in Mendix Studio, please assign the property in visibilityMap to false */
    return visibilityMap;
}

export function getPreviewCss(): string {
    return require("./ui/SimpleTimeWidget.css");
}
