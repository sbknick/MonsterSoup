import * as Redux from "redux";

import * as types from "src/rdx/types/monsterBuilder/defenses.types";
import { ArmorFormulaOption, Size } from "src/types/monsterBuilder";

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
        idx,
        value,
    });

export const setHitDieSize: Redux.ActionCreator<IdxValuePayload> =
    (idx: number, value: number) =>
    ({
        type: types.HIT_DIE_SIZE_SET,
        idx,
        value,
    });

export const addNewHitDie: Redux.ActionCreator<void> =
    () => ({ type: types.HIT_DIE_ADD_NEW });

export const removeHitDie: Redux.ActionCreator<IdxPayload> =
    (idx: number) => ({ type: types.HIT_DIE_REMOVE, idx });

export const setSize: Redux.ActionCreator<{size: Size}> =
    (size: Size) => ({ type: types.SIZE_SET, size });

export const toggleSizeOverride: Redux.ActionCreator<void> =
    () => ({ type: types.SIZE_OVERRIDE_TOGGLE });

export const setArmorFormula: Redux.ActionCreator<{armorFormula: ArmorFormulaOption}> =
    (armorFormula) => ({ type: types.ARMOR_FORMULA_SET, armorFormula });

export const setArmor: Redux.ActionCreator<{armor: string}> =
    (armor) => ({ type: types.ARMOR_SET, armor });

export const setUnarmoredACAttribute: Redux.ActionCreator<{attr: string}> =
    (attr) => ({ type: types.UNARMORED_AC_ATTRIBUTE_SET, attr });

export const toggleUseShield: Redux.ActionCreator<void> =
    () => ({ type: types.USE_SHIELD_TOGGLE });

export const setMiscACBonus: Redux.ActionCreator<ValuePayload> =
    (value) => ({ type: types.MISC_AC_BONUS_SET, value });

export const setTempAC: Redux.ActionCreator<ValuePayload> =
    (value: number) => ({ type: types.TEMP_AC_SET, value });

export type HitDiceModifyAction = Redux.Action & IdxValuePayload;
export type HitDieRemoveAction = Redux.Action & IdxPayload;
export type SizeSetAction = Redux.Action & {size: Size};
export type SetArmorFormulaAction = Redux.Action & {armorFormula: ArmorFormulaOption};
export type TempACSetAction = Redux.Action & ValuePayload;

export type DefensesAction = Redux.Action
                           | HitDiceModifyAction
                           | HitDieRemoveAction
                           | SizeSetAction
                           | SetArmorFormulaAction
                           | (Redux.Action & {armor: string})
                           | (Redux.Action & {attr: string})
                           | TempACSetAction;
