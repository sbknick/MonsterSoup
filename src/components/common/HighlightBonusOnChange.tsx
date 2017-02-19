import * as React from 'react';

interface Props
{
    Duration?: number;
    Value: number;

    style?: any;
}

interface State
{
    Timer: number;
    HighlightClass: string;
}

export class HighlightBonusOnChange extends React.Component<Props, State>
{
    static defaultProps: Props = {
        Duration: 0.5
    } as Props;

    constructor(props: Props)
    {
        super(props);

        this.state = ({
            Timer: 0,
            HighlightClass: ""
        });

        this.ClearHighlightClass = this.ClearHighlightClass.bind(this);
        this.DoTimeout = this.DoTimeout.bind(this);
    }

    componentWillReceiveProps(props: Props)
    {
        if (props.Value != this.props.Value)
            this.DoTimeout();
    }

    ClearHighlightClass()
    {
        this.setState({HighlightClass: ""} as State);
    }

    DoTimeout()
    {
        clearTimeout(this.state.Timer);

        this.setState({
            HighlightClass: "highlight-change",
            Timer: setTimeout(this.ClearHighlightClass, this.props.Duration * 1000)
        } as State);
    }

    render()
    {
        return (
            <div className={this.state.HighlightClass} style={this.props.style}>
                {this.props.Value && this.props.Value >= 0 ? "+" : ""}{this.props.Value}
            </div>
        );
    }
}

export default HighlightBonusOnChange;
