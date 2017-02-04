import * as React from 'react';

interface Props
{
    onUpClicked: (e: any) => void;
    onDownClicked: (e: any) => void;
}

class UpDownLinks extends React.Component<Props, {}>
{
    render()
    {
        let arrowParentStyle = {
            position: "relative",
            // top: "2",
            marginLeft: "8px"
        };

        let upArrowStyle = {
            // position: "absolute",
            // "line-height": "0.25em",
            // top: "0.25em"
            // // right: "-10px",
            // // "margin-left": "10px"
        };

        let downArrowStyle = {
            // position: "absolute"
            // // bottom: 2
            // // left: "-10px",
            // // "margin-right": "10px"
        }

        return (
            <span style={arrowParentStyle} className="up-down">
                <a href="" onClick={this.props.onDownClicked}>
                    <i className="fa fa-sort-down" style={downArrowStyle}></i>
                </a>
                <a href="" onClick={this.props.onUpClicked}>
                    <i className="fa fa-sort-up" style={upArrowStyle}></i>
                </a>
            </span>
        );
    }
}

export default UpDownLinks;
