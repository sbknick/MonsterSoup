import * as Redux from 'redux';
import * as Actions from '../../../actions/MonsterBuilder.HitDiceActions';

export interface HitDiceState
{
    HitDice: HitDice[];
}

interface HitDice
{
    HitDieSize: number;
    HitDiceCount: number;
}

const DEFAULT_STATE: HitDiceState = {
    HitDice: [{HitDiceCount: 2, HitDieSize: 8}]
};

const HitDiceReducer: Redux.Reducer<HitDiceState> = (state: HitDiceState = DEFAULT_STATE, action: Actions.HitDiceAction) =>
{
    switch (action.type)
    {
        case Actions.SET_HIT_DICE_COUNT:
            return Object.assign({}, state, NewSetDiceCountState(state, action));

        case Actions.SET_HIT_DIE_SIZE:
            return Object.assign({}, state, NewSetDieSizeState(state, action));
    }

    return state;
}

const NewSetDiceCountState: Redux.Reducer<HitDiceState> = (state: HitDiceState, action: Actions.SetHitDiceCountAction) =>
{
    var dice = state.HitDice;
    dice[action.idx].HitDiceCount = action.value;
    return { HitDice: dice } as HitDiceState;
}

const NewSetDieSizeState: Redux.Reducer<HitDiceState> = (state: HitDiceState, action: Actions.SetHitDieSizeAction) =>
{
    var dice = state.HitDice;
    dice[action.idx].HitDieSize = action.value;
    return { HitDice: dice } as HitDiceState;
}
