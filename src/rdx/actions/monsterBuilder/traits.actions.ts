import * as Redux from "redux";

import * as types from "src/rdx/types/monsterBuilder/traits.types";

interface TraitsActionPayload
{
    traitId: number;
}

export const applyTrait: Redux.ActionCreator<TraitsActionPayload> =
    (traitId: number) => ({ type: types.TRAIT_APPLY, traitId });

export const removeTrait: Redux.ActionCreator<TraitsActionPayload> =
    (traitId: number) => ({ type: types.TRAIT_REMOVE, traitId });

export type TraitsAction = Redux.Action & TraitsActionPayload;
