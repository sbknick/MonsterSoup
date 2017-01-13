import * as React from "react";
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import { HelloState } from '../index';

interface HelloProps
{
  compiler: string;
  framework: string;

  count: number;
  increment: () => void;
}

interface HelloStateProps
{
  compiler: string;
  framework: string;
  count: number;
}

interface HelloDispatchProps
{
  increment: () => void;
}

function mapStateToProps(state: any): HelloStateProps
{
  const { compiler, framework, count } = state;

  return {
    compiler: state.get('compiler'),
    framework: state.get('framework'),
    count: state.get('count')
  };
}

function mapDispatchToProps(dispatch: any): HelloDispatchProps
{
  var incr = () => dispatch({ type: 'INCREMENT'});

  return { increment: incr };

  // return {
  //   increment: (): void => dispatch({ type: 'INCREMENT' })
  // };
}

function mergeProps(state: HelloStateProps, dispatch: HelloDispatchProps): HelloProps
{
  return {
    compiler: state.compiler,
    framework: state.framework,
    count: state.count,
    increment: dispatch.increment
  };
}

class Hello extends React.Component<HelloProps, void>
{
  render() {
    return (
      <span>
        <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>
        <input type="button" onClick={this.props.increment} value="+1" />
        <p>{this.props.count}</p>
      </span>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Hello);

//export const Hello = (props: HelloProps) => <h1>Hello from {props.compiler} and {props.framework}!</h1>;
