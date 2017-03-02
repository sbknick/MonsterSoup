import * as React from 'react';

interface Props
{
    label: string;
    container?: string;
    contentContainer?: string;
    labelType?: string;

    className?: string;
    style?: any;
}

export const LabelledItem: React.StatelessComponent<Props> = (props) =>
{
    var Container = props.container || "div";
    var ContentContainer = props.contentContainer || "div";
    var LabelType = props.labelType || "label";

    if (ContentContainer != "none")
        return (
            <Container className={props.className} style={props.style}>
                <LabelType>{props.label}</LabelType>
                <ContentContainer>
                    {props.children}
                </ContentContainer>
            </Container>
        );
    else
        return (
            <Container className={props.className} style={props.style}>
                <LabelType>{props.label}</LabelType>
                {props.children}
            </Container>
        );
}

export default LabelledItem;
