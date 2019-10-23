/**
 * This file was generated from SimpleTimeWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { CSSProperties } from "react";
import { ActionPreview } from "@mendix/pluggable-widgets-typing-generator/dist/typings";
import { ActionValue, DynamicValue, EditableValue } from "mendix";

interface CommonProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
}

export type ReadStyleEnum = "control" | "text";

export type InputStyleEnum = "text" | "number";

export type HoursModeEnum = "x12hr" | "x24hr";

export type RequiredEnum = "yes" | "no";

export interface SimpleTimeWidgetContainerProps extends CommonProps {
    timeAttribute: EditableValue<Date>;
    readStyle: ReadStyleEnum;
    inputStyle: InputStyleEnum;
    hoursMode: HoursModeEnum;
    invalidMessage: DynamicValue<string>;
    required: RequiredEnum;
    requiredMessage?: DynamicValue<string>;
    onChangeAction?: ActionValue;
}

export interface SimpleTimeWidgetPreviewProps extends CommonProps {
    timeAttribute: string;
    readStyle: ReadStyleEnum;
    inputStyle: InputStyleEnum;
    hoursMode: HoursModeEnum;
    invalidMessage: string;
    required: RequiredEnum;
    requiredMessage?: string;
    onChangeAction?: ActionPreview;
}

export interface VisibilityMap {
    timeAttribute: boolean;
    readStyle: boolean;
    inputStyle: boolean;
    hoursMode: boolean;
    invalidMessage: boolean;
    required: boolean;
    requiredMessage: boolean;
    onChangeAction: boolean;
}
