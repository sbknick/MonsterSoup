// import * as React from 'react';
// import { connect } from 'react-redux';
// import { fromJS } from 'immutable';
//
// import Counter from '../components/Counter';
// // import { CounterState } from '../reducers/reducers';
// import {RootState} from '../reducers';
// import * as Redux from 'redux';
//
// import { IncrementCounterAction, DecrementCounterAction } from '../actions/counter-actions';
// import { CounterReducer } from '../reducers/reducers';
//
// interface ICounterPageProps extends React.Props<any>
// {
//   counter: number;
//   increaseCounter: () => void;
//   decreaseCounter: () => void;
// }
// //
// // const INITIAL_STATE = fromJS({
// //   counter: 0
// // });
//
// function mapStateToProps(state: Redux.Reducer<RootState>, another?: any, what?: any): ICounterPageProps
// {
//   return fromJS({
//     // counter: state.counter.get('count')
//     // counter: state.counterState.count
//   });
// }
//
// function mapDispatchToProps(dispatch: any): ICounterPageProps
// {
//   return fromJS({
//     increaseCounter: (): void => dispatch(IncrementCounterAction(1)),
//     decreaseCounter: (): void => dispatch(DecrementCounterAction(1)),
//   });
// }
//
// class CounterPage extends React.Component<ICounterPageProps, void>
// {
//   render() {
//     const { counter, increaseCounter, decreaseCounter } = this.props;
//
//     return (
//       <div>
//         <h2>Counter</h2>
//         <Counter
//           counter={counter}
//           increment={increaseCounter}
//           decrement={decreaseCounter} />
//       </div>
//     );
//   }
// }
//
// // export default connect(
// //   mapStateToProps,
// //   mapDispatchToProps
// // )(CounterPage);
//
// export default connect<ICounterPageProps, {}, {}>(mapStateToProps, mapDispatchToProps)(CounterPage);
