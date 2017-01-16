// import * as Immutable from 'immutable';

export interface HelloState
{
  compiler: string,
  framework: string
  count: number
}
const defaultHelloState: HelloState = ({
  compiler: "Awesome-Typescript",
  framework: "React",
  count: 10
});

// export const HELLO_DEFAULT_STATE = Immutable.fromJS({
//   helloState: defaultHelloState,
// });

export interface GlobalState
{
  helloState: HelloState;
}

export const DEFAULT_GLOBAL_STATE: GlobalState =
({
  helloState: defaultHelloState
});
// export const DEFAULT_GLOBAL_STATE = Immutable.fromJS({
//   helloState: defaultHelloState
// });
