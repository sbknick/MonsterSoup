import * as React from "react";
import { connect } from "react-redux";

import * as Util from "src/util/Mod";

import * as Actions from "src/rdx/actions/monsterBuilder/attributes.actions";
import { getMonsterBuilderData, GlobalState } from "src/rdx/reducers";
import { AttributesState } from "src/types/monsterBuilder";
// import { State as AttributesSet } from 'src/rdx/reducers/monsterBuilder/attributes.reducer';

import { HighlightOnChange, NumberInput } from "src/components/common";

export class Attribute extends React.Component<AttributeProps, {}>
{
    constructor(props: AttributeProps)
    {
        super(props);
    }

    public render()
    {
        const { label, value } = this.props;

        return (
            <div className="attribute">
                <label>{label}</label>

                <a href="" onClick={this.handleUpClicked} className="attr">
                    <i className="fa fa-plus" />
                </a>
                &nbsp;

                <NumberInput min={1} max={40} value={value} onBlur={this.valueChanged} />

                &nbsp;
                <a href="" onClick={this.handleDownClicked} className="attr">
                    <i className="fa fa-minus" />
                </a>

                <div className="report inline-children">
                    <HighlightOnChange value={value} /> (<HighlightOnChange value={Util.modBonus(value)} />)
                </div>
            </div>
        );
    }

    private handleUpClicked = (e: any) => this.handleClick(e, 1);
    private handleDownClicked = (e: any) => this.handleClick(e, -1);

    private handleClick = (e: any, value: number) =>
    {
        e.preventDefault();
        this.props.modifyAttribute(this.props.label, value);
    }

    private valueChanged = (e: any) =>
    {
        this.props.setAttribute(this.props.label, parseInt(e.target.value));
    }
}

interface AttributeProps
{
    label: string;
    value: number;
    modifyAttribute: (label: string, value: number) => void;
    setAttribute: (label: string, value: number) => void;
}

// class Attributes extends React.Component<AttributesProps, void>
const Attributes: React.StatelessComponent<AttributesProps> = (props: AttributesProps) =>
{
    const attr = props.attributes as any;
    const attributes = Object.keys(attr).map(key =>
        <Attribute
            key={key}
            label={key}
            value={attr[key]}
            modifyAttribute={props.modifyAttribute}
            setAttribute={props.setAttribute}
        />);

    return (
        <div className="attributes">
            <h4>Attributes</h4>
            {attributes}
        </div>
    );
};

interface AttributesProps
{
    attributes: AttributesState;

    modifyAttribute: (attr: string, value: number) => void;
    setAttribute: (attr: string, value: number) => void;
}

function mapStateToProps(state: GlobalState): AttributesProps
{
    // tslint:disable-next-line:no-object-literal-type-assertion
    return {
        attributes: getMonsterBuilderData(state).attributes,
    } as AttributesProps;
}

function mapDispatchToProps(dispatch: any): AttributesProps
{
    // tslint:disable-next-line:no-object-literal-type-assertion
    return {
        modifyAttribute: (a, v) => dispatch(Actions.modifyAttribute(a, v)),
        setAttribute: (a, v) => dispatch(Actions.setAttribute(a, v)),
    } as AttributesProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(Attributes);
