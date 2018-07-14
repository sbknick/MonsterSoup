import * as React from "react";

/* tslint:disable: no-unused-expression */

export class UpDownLinks extends React.Component<Props, State>
{
    constructor(props: Props)
    {
        super(props);

        this.state = { size: props.size || 1 };

        this.handleClick = this.handleClick.bind(this);
    }

    public render()
    {
        const arrowParentStyle: any = {
            position: "relative",
            // top: "2",
            marginLeft: "8px",
            fontSize: this.state.size + "em",
        };

        const downArrowStyle: any = {
            position: "absolute",
            top: "0.25em",
        };

        const upArrowStyle: any = {
            position: "absolute",
            top: "-0.25em",
        };

        return (
            <span style={arrowParentStyle} className="up-down">
                <a href="" onClick={this.handleClick(this.props.onDownClicked)}>
                    <i className="fa fa-caret-down" style={downArrowStyle} />
                </a>
                <a href="" onClick={this.handleClick(this.props.onUpClicked)}>
                    <i className="fa fa-caret-up" style={upArrowStyle} />
                </a>
            </span>
        );
    }

    private handleClick(action: EventHandler): EventHandler
    {
        return e => {
            e.preventDefault && e.preventDefault();
            action(e);
        };
    }
}

export default UpDownLinks;

interface Props
{
    size?: number;
    onUpClicked: (e: any) => void;
    onDownClicked: (e: any) => void;
}

interface State
{
    size: number;
}

type EventHandler = (e: any) => void;
