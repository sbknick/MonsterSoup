import * as React from 'react';

interface ICounterProps extends React.Props<any> {
  counter: number;
  increment: () => void;
  decrement: () => void;
};

export default class Counter extends React.Component<ICounterProps, {}>
{
  render() {
    return (
      <div className="flex">
        <input type="button" onClick={this.props.increment}>-</input>
        <div>{this.props.counter}</div>
        <input type="button" onClick={this.props.decrement}>-</input>
      </div>
    );
  }
}
