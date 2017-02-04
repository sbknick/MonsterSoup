import * as React from 'react';
import { connect } from 'react-redux';

import { GlobalState } from '../../reducers';
import { AttributesState } from '../../reducers/MonsterBuilder.Attributes';
import * as Actions from '../../actions/MonsterBuilder.AttributesActions';
import NumberInput from '../common/NumberInput';

interface AttributeProps
{
    label: string,
    value: number,
    modifyAttribute: (label: string, value: number) => void;
    setAttribute: (label: string, value: number) => void;
}

class Attribute extends React.Component<AttributeProps, {}>
{
    constructor(props: AttributeProps)
    {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.valueChanged = this.valueChanged.bind(this);
    }

    Mod(value: number): string | number
    {
        var result = Math.floor((value / 2) - 5);
        return result < 0 ? result : "+" + result;
    }

    handleClick(e: any, value: number)
    {
        e.preventDefault();
        this.props.modifyAttribute(this.props.label, value);
    }

    valueChanged(e: any)
    {
        this.props.setAttribute(this.props.label, parseInt(e.target.value));
    }

    render() {
        const { label, value } = this.props;

        return (
            <div className="attribute">
                <label>{label}</label>

                <a href="" onClick={e => this.handleClick(e, 1)} className="attr">
                    <i className="fa fa-plus"></i>
                </a>
                &nbsp;

                <NumberInput min={1} max={40} value={value} onBlur={this.valueChanged} />

                &nbsp;
                <a href="" onClick={e => this.handleClick(e, -1)} className="attr">
                    <i className="fa fa-minus"></i>
                </a>

                <div className="report">{value} ({this.Mod(value)})</div>
            </div>
        );
    }
}

interface AttributesSet
{
    Str: number;
    Dex: number;
    Con: number;
    Int: number;
    Wis: number;
    Cha: number;
}

interface AttributesProps
{
    Attributes: AttributesSet;

    ModifyAttribute: (attr: string, value: number) => void;
    SetAttribute: (attr: string, value: number) => void;
}

function mapStateToProps(state: GlobalState): AttributesProps
{
    return {
        Attributes: state.monsterBuilder.attributes
    } as AttributesProps;
}

function mapDispatchToProps(dispatch: any): AttributesProps
{
    return {
        ModifyAttribute: (a, v) => dispatch(Actions.IncrementAttribute(a, v)),
        SetAttribute: (a, v) => dispatch(Actions.SetAttribute(a, v))
    } as AttributesProps;
}

class Attributes extends React.Component<AttributesProps, void>
{
    render()
    {
        const attr = this.props.Attributes as any;
        let attributes = Object.keys(attr).map(key =>
            <Attribute key={key} label={key} value={attr[key]} modifyAttribute={this.props.ModifyAttribute} setAttribute={this.props.SetAttribute} />
        );

        return (
            <div className="attributes">
                <h4>Attributes</h4>
                {attributes}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Attributes);
