import * as React from 'react';

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

export class UpDownLinks extends React.Component<Props, State>
{
    constructor(props: Props)
    {
        super(props);

        if (props.size)
            this.state = { size: props.size };
        else
            this.state = { size: 1 };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(action: (e: any) => void): (e: any) => void
    {
        return e => {
            e.preventDefault && e.preventDefault();
            action(e);
        };
    }

    render()
    {
        let arrowParentStyle = {
            position: "relative",
            "marginLeft": "8px",
            "fontSize": this.state.size + "em"
        };

        let downArrowStyle = {
            position: "absolute",
            top: "0.25em"
        };

        let upArrowStyle = {
            position: "absolute",
            top: "-0.25em"
        }

        return (
            <span style={arrowParentStyle} className="up-down">
                <a href="" onClick={this.handleClick(this.props.onDownClicked)}>
                    <i className="fa fa-caret-down" style={downArrowStyle}></i>
                </a>
                <a href="" onClick={this.handleClick(this.props.onUpClicked)}>
                    <i className="fa fa-caret-up" style={upArrowStyle}></i>
                </a>
            </span>
        );
    }
}

export default UpDownLinks;
