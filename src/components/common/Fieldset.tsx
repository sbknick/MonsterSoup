import * as React from 'react';
import { connect } from 'react-redux';

export class Fieldset extends React.Component<Props, State>
{
    constructor(props: Props)
    {
        super(props);

        this.state = {isCollapsed: true};

        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    componentWillReceiveProps(props: Props)
    {
        if (props.collapsed != null)
        {
            this.setState({isCollapsed: props.collapsed});
        }
    }

    private toggleCollapse()
    {
        this.setState({isCollapsed: !this.state.isCollapsed});
    }

    render()
    {
        return (
            <fieldset className={this.props.className} style={this.props.style}>
                <legend onClick={this.toggleCollapse}>{this.props.legend}</legend>
                {this.state.isCollapsed || this.props.children}
                {this.state.isCollapsed && this.props.displayOnCollapse}
            </fieldset>
        )
    }
}

export default Fieldset;

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
