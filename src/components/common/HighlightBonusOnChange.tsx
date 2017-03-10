import * as React from "react";

interface Props
{
    duration?: number;
    value: number;

    style?: any;
}

interface State
{
    timer: number;
    highlightClass: string;
}

export class HighlightBonusOnChange extends React.Component<Props, State>
{
    private static defaultProps: Props = {
        duration: 0.5,
    } as Props;

    constructor(props: Props)
    {
        super(props);

        this.state = ({
            timer: 0,
            highlightClass: "",
        });

        this.clearHighlightClass = this.clearHighlightClass.bind(this);
        this.doTimeout = this.doTimeout.bind(this);
    }

    public componentWillReceiveProps(props: Props)
    {
        if (props.value !== this.props.value)
            this.doTimeout();
    }

    public render()
    {
        return (
            <span className={this.state.highlightClass} style={this.props.style}>
                {this.props.value && this.props.value >= 0 ? "+" : ""}{this.props.value}
            </span>
        );
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
            timer: setTimeout(this.clearHighlightClass, this.props.duration * 1000),
        });
    }
}

export default HighlightBonusOnChange;
