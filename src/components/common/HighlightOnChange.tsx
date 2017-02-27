import * as React from 'react';

export class HighlightOnChange extends React.Component<Props, State>
{
    constructor(props: Props)
    {
        super(props);

        this.state = ({
            timer: 0,
            highlightClass: ""
        });

        this.clearHighlightClass = this.clearHighlightClass.bind(this);
        this.doTimeout = this.doTimeout.bind(this);
    }

    componentWillReceiveProps(props: Props)
    {
        if (props.value != this.props.value)
            this.doTimeout();
    }

    private clearHighlightClass()
    {
        this.setState({highlightClass: ""} as State);
    }

    private doTimeout()
    {
        clearTimeout(this.state.timer);

        this.setState({
            highlightClass: "highlight-change",
            timer: setTimeout(this.clearHighlightClass, this.props.duration * 1000)
        } as State);
    }

    render()
    {
        return (
            <div className={this.state.highlightClass} style={this.props.style}>
                {this.props.children}{this.props.value}
            </div>
        );
    }
}

export default HighlightOnChange;

interface Props
{
    duration?: number;
    value: any;

    style?: any;
}

interface State
{
    timer: number;
    highlightClass: string;
}
