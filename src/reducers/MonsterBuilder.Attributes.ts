// import * as Redux from 'redux';
// import * as Actions from '../actions/MonsterBuilder.AttributesActions';
//
// export interface AttributesState
// {
//     Str: number;
//     Dex: number;
//     Con: number;
//     Int: number;
//     Wis: number;
//     Cha: number;
// }
//
// const DEFAULT_STATE: AttributesState = {
//     Str: 10, Dex: 10, Con: 10, Int: 10, Wis: 10, Cha: 10
// };
//
// export const AttributesReducer: Redux.Reducer<AttributesState> = (state: AttributesState = DEFAULT_STATE, action: Actions.AttributesAction) =>
// {
//     switch (action.type)
//     {
//         case Actions.INCREMENT_ATTRIBUTE:
//             return Object.assign({}, state, NewIncrementState(state, action));
//     }
//
//     return state;
// }
//
// // type StateCreator = (state: AttributesState, action: Actions.AttributesAction) => AttributesState;
// type StateCreator = Redux.Reducer<AttributesState>;
// const NewIncrementState: StateCreator = (state: AttributesState, action: Actions.IncrementAttributeAction) =>
// {
//     switch (action.attr)
//     {
//         case "Str": return {Str: state.Str + action.value} as AttributesState;
//         case "Dex": return {Dex: state.Dex + action.value} as AttributesState;
//         case "Con": return {Con: state.Con + action.value} as AttributesState;
//         case "Int": return {Int: state.Int + action.value} as AttributesState;
//         case "Wis": return {Wis: state.Wis + action.value} as AttributesState;
//         case "Cha": return {Cha: state.Cha + action.value} as AttributesState;
//         default: return {} as AttributesState;
//     }
// }
//
// export default AttributesReducer;
