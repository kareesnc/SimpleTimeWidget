/**
 * This file was generated from SimpleTimeWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { CSSProperties } from "react";
import { EditableValue } from "@mendix/pluggable-widgets-api/properties";

interface CommonProps {
    id: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
}

export type EditableEnum = "default" | "never";

export interface SimpleTimeWidgetContainerProps extends CommonProps {
    timeAttribute: EditableValue<Date>;
    editable: EditableEnum;
}

export interface SimpleTimeWidgetPreviewProps extends CommonProps {
    timeAttribute: string;
    editable: EditableEnum;
}

export interface VisibilityMap {
    timeAttribute: boolean;
    editable: boolean;
}
