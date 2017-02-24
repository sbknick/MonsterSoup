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

export const SetHitDiceCount: Redux.ActionCreator<IdxValuePayload> =
    (idx: number, value: number) =>
    ({
        type: types.SET_HIT_DICE_COUNT,
        idx: idx,
        value: value
    });

export const SetHitDieSize: Redux.ActionCreator<IdxValuePayload> =
    (idx: number, value: number) =>
    ({
        type: types.SET_HIT_DICE_COUNT,
        idx: idx,
        value: value
    });

export const AddNewHitDie: Redux.ActionCreator<void> =
    () => ({ type: types.ADD_NEW_HIT_DIE })

export const RemoveHitDie: Redux.ActionCreator<void> =
    (idx: number) => ({ type: types.REMOVE_HIT_DIE, idx: idx })

export type DefensesAction = Redux.Action | Redux.Action & (IdxPayload | IdxValuePayload);
