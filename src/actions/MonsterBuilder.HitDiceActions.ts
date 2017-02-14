import * as Redux from 'redux';

export const SET_HIT_DICE_COUNT: "SET_HIT_DICE_COUNT" = "SET_HIT_DICE_COUNT";
export type SetHitDiceCountAction = Redux.Action & {
    idx: number;
    value: number;
};
export function SetHitDiceCount(idx: number, value: number): SetHitDiceCountAction
{
    return ({
        type: SET_HIT_DICE_COUNT,
        idx: idx,
        value: value
    });
}

export const SET_HIT_DIE_SIZE: "SET_HIT_DIE_SIZE" = "SET_HIT_DIE_SIZE";
export type SetHitDieSizeAction = Redux.Action & {
    idx: number;
    value: number;
};
export function SetHitDieSize(idx: number, value: number): SetHitDieSizeAction
{
    return ({
        type: SET_HIT_DIE_SIZE,
        idx: idx,
        value: value
    });
}

export const ADD_NEW_HIT_DIE: "ADD_NEW_HIT_DIE" = "ADD_NEW_HIT_DIE";
export type AddNewHitDieAction = Redux.Action;
export function AddNewHitDie(): AddNewHitDieAction
{
    return ({
        type: ADD_NEW_HIT_DIE
    });
}

export const REMOVE_HIT_DIE: "REMOVE_HIT_DIE" = "REMOVE_HIT_DIE";
export type RemoveHitDieAction = Redux.Action & {
    idx: number;
};
export function RemoveHitDie(idx: number): RemoveHitDieAction
{
    return ({
        type: REMOVE_HIT_DIE,
        idx: idx
    });
}

export type HitDiceAction = Redux.Action
    | SetHitDiceCountAction
    | SetHitDieSizeAction
    | AddNewHitDieAction
    | RemoveHitDieAction
    ;
    // | IncrementAttributeAction
    // | SetAttributeAction;
export default HitDiceAction;
