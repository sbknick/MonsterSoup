import * as Redux from 'redux';

import * as types from '../../types/monsterBuilder/traits.types';

interface TraitsActionPayload
{
    traitId: number;
}

export const ApplyTrait: Redux.ActionCreator<TraitsActionPayload> =
    (traitId: number) => ({ type: types.APPLY_TRAIT, traitId: traitId });

export const RemoveTrait: Redux.ActionCreator<TraitsActionPayload> =
    (traitId: number) => ({ type: types.REMOVE_TRAIT, traitId: traitId });

export type TraitsAction = Redux.Action & TraitsActionPayload;
