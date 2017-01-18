import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { HelloState } from '../reducers/HelloReducer';
import { HelloReducerState } from '../reducers';

import * as HelloActions from '../actions/HelloActions'

interface HelloStateProps
{
  compiler: string;
  framework: string;
  count: number;
}

interface HelloDispatchProps
{
  increment: () => void;
  incrementByTwo: () => void;
  decrement: () => void;
}

type HelloProps = HelloStateProps & HelloDispatchProps;

function mapStateToProps(state: HelloReducerState): HelloStateProps
{
  const { compiler, framework, count } = state.HelloReducer;

  return {
    compiler: compiler,
    framework: framework,
    count: count
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<HelloState>): HelloDispatchProps
{
  // return { increment: () => dispatch({type: 'INCREMENT'}) };
  return {
    increment: () => dispatch(HelloActions.Increment(1)),
    incrementByTwo: () => dispatch(HelloActions.Increment(2)),
    decrement: () => dispatch(HelloActions.Decrement())
  }
}

function mergeProps(state: HelloStateProps, dispatch: HelloDispatchProps): HelloProps
{
  return {
    compiler: state.compiler,
    framework: state.framework,
    count: state.count,
    increment: dispatch.increment,
    incrementByTwo: dispatch.incrementByTwo,
    decrement: dispatch.decrement
  };
}

class Hello extends React.Component<HelloProps, void>
{
  render() {
    const { compiler, framework, count, increment, incrementByTwo, decrement } = this.props;

    return (
      <span>
        <h1>Hello from {compiler} and {framework}!</h1>
        <input type="button" onClick={increment} value="+1" />
        <input type="button" onClick={incrementByTwo} value="+2" />
        <input type="button" onClick={decrement} value="+1" />
        <p>{count}</p>
      </span>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Hello);
