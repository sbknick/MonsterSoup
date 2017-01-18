import * as React from 'react';
import { connect } from 'react-redux';

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
      // this.valueChanged = this.valueChanged.bind(this);
    }

    Mod(value: number): string | number
    {
      var result = Math.floor((value / 2) - 5);
      return result < 0 ? result : "+" + result;
    }

    // handleClick(e: React.MouseEvent<MSPointerEvent>, value: number)
    handleClick(e: any, value: number)
    {
      e.preventDefault();
      this.props.modifyAttribute(this.props.label, value);
    }

    valueChanged(e: any)
    {
      let f = e;
      // this.props.setAttribute(this.props.label, e);
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
          <a href="" onClick={e => this.handleClick(e, 1)}>+</a>
          <span>{value} ({this.Mod(value)})</span>
          <input type="number" min="1" max="40" inputMode="numeric" pattern="[0-9]{1,2}" value={value} onChange={this.onChanged} onBlur={this.valueChanged} />
          &nbsp;<a href="" onClick={e => this.handleClick(e, -1)}>-</a>
        </div>
      );
    }
}

export default Attribute;
