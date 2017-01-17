import * as React from 'react';
import { connect } from 'react-redux';
import { HelloState } from '../reducers/HelloReducer';

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

type HelloProps = HelloStateProps & HelloDispatchProps;

function mapStateToProps(state: HelloState): HelloStateProps
{
  const { compiler, framework, count } = state;

  return {
    compiler: compiler,
    framework: framework,
    count: count
  };
}

function mapDispatchToProps(dispatch: any): HelloDispatchProps
{
  return { increment: () => dispatch({type: 'INCREMENT'}) };
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
    const { compiler, framework, count, increment } = this.props;

    return (
      <span>
        <h1>Hello from {compiler} and {framework}!</h1>
        <input type="button" onClick={increment} value="+1" />
        <p>{count}</p>
      </span>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Hello);
