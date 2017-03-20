import * as React from "react";
import { connect } from "react-redux";

interface Props
{
    legend: string;
    displayOnCollapse?: any;

    collapsed?: boolean;

    className?: string;
    style?: any;
}

interface State
{
    isCollapsed: boolean;
}

export class Fieldset extends React.Component<Props, State>
{
    constructor(props: Props)
    {
        super(props);

        this.state = {isCollapsed: true};

        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    public componentWillReceiveProps(props: Props)
    {
        if (props.collapsed != null)
        {
            this.setState({isCollapsed: props.collapsed});
        }
    }

    public render()
    {
        return (
            <fieldset className={this.props.className} style={this.props.style}>
                <legend><a href="" onClick={this.toggleCollapse}>{this.props.legend}</a></legend>
                {this.state.isCollapsed || this.props.children}
                {this.state.isCollapsed && this.props.displayOnCollapse}
            </fieldset>
        );
    }

    private toggleCollapse(e: any)
    {
        e.preventDefault();
        this.setState({isCollapsed: !this.state.isCollapsed});
    }
}

export default Fieldset;
