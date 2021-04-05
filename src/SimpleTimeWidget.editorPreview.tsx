import { Component, ReactNode, createElement } from "react";
import { TimeInput } from "./components/TimeInput";
import { SimpleTimeWidgetPreviewProps } from "../typings/SimpleTimeWidgetProps";

declare function require(name: string): string;

export class preview extends Component<SimpleTimeWidgetPreviewProps> {
    render(): ReactNode {
        return <TimeInput value={undefined} />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/SimpleTimeWidget.css");
}
