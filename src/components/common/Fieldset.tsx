import * as React from "react";

interface Props
{
    legend?: string;
    displayOnCollapse?: any;

    isCollapsed?: boolean;

    className?: string;
    style?: any;

    toggleCollapse?: () => void;

    config?: FieldsetConfigData;
}

export interface FieldsetConfigData
{
    legend: string;
    isCollapsed: boolean;
    toggleCollapse: () => void;
}

export const Fieldset: React.StatelessComponent<Props> = (props) =>
{
    const handleToggleCollapse = (e: any) =>
    {
        e.preventDefault();
        // this.setState({isCollapsed: !this.state.isCollapsed});
        if (props.config)
        props.config.toggleCollapse();
        else
        props.toggleCollapse();
    };

    if (props.config)
    return (
        <fieldset className={props.className} style={props.style}>
            <legend><a href="" onClick={handleToggleCollapse}>{props.config.legend}</a></legend>
            {props.config.isCollapsed || props.children}
            {props.config.isCollapsed && props.displayOnCollapse}
        </fieldset>
    );
    else
    return (
        <fieldset className={props.className} style={props.style}>
            <legend><a href="" onClick={handleToggleCollapse}>{props.legend}</a></legend>
            {props.isCollapsed || props.children}
            {props.isCollapsed && props.displayOnCollapse}
        </fieldset>
    );
};
