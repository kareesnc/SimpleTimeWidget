/**
 * This file was generated from SimpleTimeWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { CSSProperties } from "react";
import { pages } from "mendixmodelsdk";
import { ActionValue, DynamicValue, EditableValue } from "@mendix/pluggable-widgets-api/properties";

interface CommonProps {
    id: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
}

export type EditableEnum = "default" | "never";

export type ReadStyleEnum = "control" | "text";

export type InputStyleEnum = "text" | "number";

export type RequiredEnum = "yes" | "no";

export interface SimpleTimeWidgetContainerProps extends CommonProps {
    timeAttribute: EditableValue<Date>;
    editable: EditableEnum;
    readStyle: ReadStyleEnum;
    inputStyle: InputStyleEnum;
    invalidMessage: DynamicValue<string>;
    required: RequiredEnum;
    requiredMessage?: DynamicValue<string>;
    onChangeAction?: ActionValue;
}

export interface SimpleTimeWidgetPreviewProps extends CommonProps {
    timeAttribute: string;
    editable: EditableEnum;
    readStyle: ReadStyleEnum;
    inputStyle: InputStyleEnum;
    invalidMessage: string;
    required: RequiredEnum;
    requiredMessage?: string;
    onChangeAction?: pages.ClientAction;
}

export interface VisibilityMap {
    timeAttribute: boolean;
    editable: boolean;
    readStyle: boolean;
    inputStyle: boolean;
    invalidMessage: boolean;
    required: boolean;
    requiredMessage: boolean;
    onChangeAction: boolean;
}
