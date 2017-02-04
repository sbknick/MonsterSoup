import * as Redux from 'redux';
// import * as Actions from '../../actions/MonsterBuilder.DefensesActions';

namespace Actions
{
    export const SET_HIT_DIE_SIZE: "SET_HIT_DIE_SIZE" = "SET_HIT_DIE_SIZE";
    export type SetHitDieSizeAction = Redux.Action & {
        value: number;
        index: number;
    };
    export function SetHitDieSize(index: number, value: number): SetHitDieSizeAction
    {
        return ({
            type: SET_HIT_DIE_SIZE,
            value: value,
            index: index
        });
    }

    export type DefensesAction = Redux.Action
        | SetHitDieSizeAction;
    // export default DefensesAction;
}

interface ACFormula {}
interface HitDice
{
    HitDieSize: number;
    HitDiceCount: number;
}

export interface DefensesState
{
    ACFormula: ACFormula;
    HitDice: HitDice[];
}

const DEFAULT_STATE: DefensesState = {
    ACFormula: {},
    HitDice: [{HitDiceCount: 2, HitDieSize: 8}]
};

const DefensesReducer: Redux.Reducer<DefensesState> = (state: DefensesState = DEFAULT_STATE, action: Actions.DefensesAction) =>
{
    switch (action.type)
    {
        case Actions.SET_HIT_DIE_SIZE:
            return Object.assign({}, state, UpdateHitDieSize(state, action));
    }

    return state;
}

const UpdateHitDieSize: Redux.Reducer<DefensesState> = (state: DefensesState, action: Actions.SetHitDieSizeAction) =>
{
    var hitDice = state.HitDice.slice();
    hitDice[action.index].HitDieSize = action.value;
    return {HitDice: hitDice} as DefensesState;
}

export default DefensesReducer;
