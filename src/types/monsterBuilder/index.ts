export { ArmorData, ArmorType } from "./armor";
export { ArmorFormulaOption, DefensesState, HitDice, Size } from "./defenses";
export { SavesState, SavesStateSingle } from "./saves";
export { TraitArgs, TraitsState, MonsterTrait } from "./traits";

export interface AttributesState
{
    Str: number;
    Dex: number;
    Con: number;
    Int: number;
    Wis: number;
    Cha: number;
}
