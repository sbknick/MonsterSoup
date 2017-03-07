import * as Redux from 'redux';
import * as types from '../../types/monsterBuilder/defenses.types';

interface IdxPayload
{
    idx: number;
}

interface ValuePayload
{
    value: number;
}

type IdxValuePayload  = IdxPayload & ValuePayload;


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
    () => ({ type: types.HIT_DIE_ADD_NEW });

export const removeHitDie: Redux.ActionCreator<IdxPayload> =
    (idx: number) => ({ type: types.HIT_DIE_REMOVE, idx: idx });

export const setSize: Redux.ActionCreator<ValuePayload> =
    (value: number) => ({ type: types.SIZE_SET, value: value });

export const toggleSizeOverride: Redux.ActionCreator<void> =
    () => ({ type: types.SIZE_OVERRIDE_TOGGLE });

export const setTempAC: Redux.ActionCreator<ValuePayload> =
    (value: number) => ({ type: types.TEMP_AC_SET, value: value });

export type HitDiceModifyAction = Redux.Action & IdxValuePayload;
export type HitDieRemoveAction = Redux.Action & IdxPayload;
export type SizeSetAction = Redux.Action & ValuePayload;
export type TempACSetAction = Redux.Action & ValuePayload;

export type DefensesAction = Redux.Action
                           | HitDiceModifyAction
                           | HitDieRemoveAction
                           | SizeSetAction
                           | TempACSetAction;
