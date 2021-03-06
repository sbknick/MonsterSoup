import * as Redux from "redux";

import * as types from "../../types/monsterBuilder/saves.types";

interface SavesActionPayload {
    attr: string;
}

interface SavesActionWithAmountPayload extends SavesActionPayload {
    amount: number;
}

// export const addSaveProficiency: Redux.ActionCreator<SavesActionPayload> =
//     (attr: string) => ({ type: types.SAVE_PROFICIENCY_ADD, attr: attr });
//
// export const removeSaveProficiency: Redux.ActionCreator<SavesActionPayload> =
//     (attr: string) => ({ type: types.SAVE_PROFICIENCY_REMOVE, attr: attr });
//
// export const addSaveExpertise: Redux.ActionCreator<SavesActionPayload> =
//     (attr: string) => ({ type: types.SAVE_EXPERTISE_ADD, attr: attr });
//
// export const removeSaveExpertise: Redux.ActionCreator<SavesActionPayload> =
//     (attr: string) => ({ type: types.SAVE_EXPERTISE_REMOVE, attr: attr });

export const toggleSaveProficiency: Redux.ActionCreator<SavesActionPayload> =
    (attr: string) => ({ type: types.SAVE_PROFICIENCY_TOGGLE, attr });

export const toggleSaveExpertise: Redux.ActionCreator<SavesActionPayload> =
    (attr: string) => ({ type: types.SAVE_EXPERTISE_TOGGLE, attr });

export const modifySaveBonus: Redux.ActionCreator<SavesActionWithAmountPayload> =
    (attr: string, amount: number) => ({ type: types.SAVE_BONUS_MODIFY, attr, amount });

export type SavesAction = Redux.Action & (SavesActionPayload | SavesActionWithAmountPayload);
export type ModifySavesAction = Redux.Action & SavesActionWithAmountPayload;
