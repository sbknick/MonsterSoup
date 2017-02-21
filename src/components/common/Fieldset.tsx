import * as React from 'react';
import { connect } from 'react-redux';

import { GlobalState } from '../../reducers';

export class Fieldset extends React.Component<Props, State>
{
    constructor(props: Props)
    {
        super(props);

        this.state = {isCollapsed: true};

        this.ToggleCollapse = this.ToggleCollapse.bind(this);
    }

    componentWillReceiveProps(props: Props)
    {
        if (props.collapsed != null)
        {
            this.setState({isCollapsed: props.collapsed});
        }
    }

    ToggleCollapse()
    {
        this.setState({isCollapsed: !this.state.isCollapsed});
    }

    render()
    {
        return (
            <fieldset className={this.props.className} style={this.props.style}>
                <legend onClick={this.ToggleCollapse}>{this.props.legend}</legend>
                {this.state.isCollapsed || this.props.children}
                {this.state.isCollapsed && this.props.displayOnCollapse}
            </fieldset>
        )
    }
}

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

// export const Fieldset = connect(mapStateToProps)(_Fieldset);
export default Fieldset;
