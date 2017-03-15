import * as React from "react";

interface Props
{
    label: string;
    container?: string;
    contentContainer?: string;
    labelType?: string;
    value?: any;

    className?: string;
    style?: any;
}

export const LabelledItem: React.StatelessComponent<Props> = (props) =>
{
    const Container = props.container || "div";
    const ContentContainer = props.contentContainer || "div";
    const LabelType = props.labelType || "label";

    if (ContentContainer !== "none")
        return (
            <Container className={props.className} style={props.style}>
                <LabelType>{props.label}</LabelType>
                <ContentContainer>
                    {props.value}{props.children}
                </ContentContainer>
            </Container>
        );
    else
        return (
            <Container className={props.className} style={props.style}>
                <LabelType>{props.label}</LabelType>
                {props.value}{props.children}
            </Container>
        );
};

export default LabelledItem;
