import * as Redux from "redux";

// import { ArmorFormulaOption, Size } from "src/types/monsterStats";
import * as types from "src/rdx/types/monsterStats/offenses.types";

export interface SetStatAction extends Redux.Action
{
    attr: string;
}

export const setPrimaryAttackStat: Redux.ActionCreator<SetStatAction> =
    (attr) => ({ type: types.PRIMARY_ATTACK_STAT_SET, attr });

export const setPrimarySpellStat: Redux.ActionCreator<SetStatAction> =
    (attr) => ({ type: types.PRIMARY_SPELL_STAT_SET, attr });

export interface SetValueAction extends Redux.Action
{
    value: number;
}

export const setMiscABBonus: Redux.ActionCreator<SetValueAction> =
    (value) => ({ type: types.MISC_ATTACK_BONUS_SET, value });

export const setMiscSaveDCBonus: Redux.ActionCreator<SetValueAction> =
    (value) => ({ type: types.MISC_SAVE_DC_BONUS_SET, value });

export type OffensesAction = Redux.Action
                           | SetStatAction
                           | SetValueAction;
                        //    | HitDiceModifyAction
                        //    | HitDieRemoveAction
                        //    | SizeSetAction
                        //    | SetArmorFormulaAction
                        //    | (Redux.Action & {armor: string})
                        //    | (Redux.Action & {attr: string})
                        //    | TempACSetAction;
