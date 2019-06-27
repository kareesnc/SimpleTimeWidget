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

export type RequiredEnum = "yes" | "no";

export type ShowClearEnum = "yes" | "no";

export type RenderNumberEnum = "yes" | "no";

export interface SimpleTimeWidgetContainerProps extends CommonProps {
    timeAttribute: EditableValue<Date>;
    editable: EditableEnum;
    invalidMessage: DynamicValue<string>;
    required: RequiredEnum;
    requiredMessage?: DynamicValue<string>;
    showClear: ShowClearEnum;
    renderNumber: RenderNumberEnum;
    onChangeAction?: ActionValue;
}

export interface SimpleTimeWidgetPreviewProps extends CommonProps {
    timeAttribute: string;
    editable: EditableEnum;
    invalidMessage: string;
    required: RequiredEnum;
    requiredMessage?: string;
    showClear: ShowClearEnum;
    renderNumber: RenderNumberEnum;
    onChangeAction?: pages.ClientAction;
}

export interface VisibilityMap {
    timeAttribute: boolean;
    editable: boolean;
    invalidMessage: boolean;
    required: boolean;
    requiredMessage: boolean;
    showClear: boolean;
    renderNumber: boolean;
    onChangeAction: boolean;
}
