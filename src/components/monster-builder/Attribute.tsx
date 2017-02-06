import * as React from 'react';
import { connect } from 'react-redux';

import NumberInput from '../common/NumberInput';

interface AttributeProps
{
    label: string,
    value: number,
    modifyAttribute: (label: string, value: number) => void;
    setAttribute: (label: string, value: number) => void;
}

export class Attribute extends React.Component<AttributeProps, {}>
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

    onChanged(e: React.FormEvent<HTMLInputElement>)
    {
        let f = e;
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

export default Attribute;
