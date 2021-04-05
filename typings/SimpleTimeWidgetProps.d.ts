/**
 * This file was generated from SimpleTimeWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue } from "mendix";

export type ReadStyleEnum = "control" | "text";

export type InputStyleEnum = "text" | "number";

export type HoursModeEnum = "x12hr" | "x24hr";

export type RequiredEnum = "yes" | "no";

export interface SimpleTimeWidgetContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    id: string;
    timeAttribute: EditableValue<Date>;
    readStyle: ReadStyleEnum;
    inputStyle: InputStyleEnum;
    hoursMode: HoursModeEnum;
    invalidMessage: DynamicValue<string>;
    required: RequiredEnum;
    requiredMessage?: DynamicValue<string>;
    onChangeAction?: ActionValue;
}

export interface SimpleTimeWidgetPreviewProps {
    class: string;
    style: string;
    timeAttribute: string;
    readStyle: ReadStyleEnum;
    inputStyle: InputStyleEnum;
    hoursMode: HoursModeEnum;
    invalidMessage: string;
    required: RequiredEnum;
    requiredMessage: string;
    onChangeAction: {} | null;
}
