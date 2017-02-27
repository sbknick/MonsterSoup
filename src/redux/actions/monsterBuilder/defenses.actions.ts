import * as Redux from 'redux';
import * as types from '../../types/monsterBuilder/defenses.types';

interface IdxValuePayload
{
    idx: number;
    value: number;
}

interface IdxPayload
{
    idx: number;
}

export const setHitDiceCount: Redux.ActionCreator<IdxValuePayload> =
    (idx: number, value: number) =>
    ({
        type: types.HIT_DICE_COUNT_SET,
        idx: idx,
        value: value
    });

export const setHitDieSize: Redux.ActionCreator<IdxValuePayload> =
    (idx: number, value: number) =>
    ({
        type: types.HIT_DICE_COUNT_SET,
        idx: idx,
        value: value
    });

export const addNewHitDie: Redux.ActionCreator<void> =
    () => ({ type: types.HIT_DIE_ADD_NEW })

export const removeHitDie: Redux.ActionCreator<void> =
    (idx: number) => ({ type: types.HIT_DIE_REMOVE, idx: idx })

export type DefensesAction = Redux.Action | Redux.Action & (IdxPayload | IdxValuePayload);
