import * as React from 'react';

interface Props
{
    label: string;
    container?: string;
    contentContainer?: string;
    labelType?: string;

    className?: string;
}

export class LabelledItem extends React.Component<Props, void>
{
    render()
    {
        var Container = this.props.container || "div";
        var ContentContainer = this.props.contentContainer || "div";
        var LabelType = this.props.labelType || "label";

        if (ContentContainer != "none")
            return (
                <Container className={this.props.className}>
                    <LabelType>{this.props.label}</LabelType>
                    <ContentContainer>
                        {this.props.children}
                    </ContentContainer>
                </Container>
            );
        else
            return (
                <Container className={this.props.className}>
                    <LabelType>{this.props.label}</LabelType>
                    {this.props.children}
                </Container>
            )
    }
}

export default LabelledItem;
