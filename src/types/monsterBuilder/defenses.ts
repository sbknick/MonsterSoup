import { Condition, DamageType } from "types";
import { ArmorData } from "./armor";

export enum Size
{
    Tiny = 1,
    Small,
    Medium,
    Large,
    Huge,
    Gargantuan,
}

export interface HitDice
{
    hitDiceCount: number;
    hitDieSize: number;
}

export enum ArmorFormulaOption
{
    StandardArmor = 1,
    NaturalArmor,
    UnarmoredDefense,
};

export interface DefensesState
{
    size: Size;
    sizeOverridden: boolean;
    hitDice: HitDice[];

    resistances?: DamageType[];
    immunities?: DamageType[];
    vulnerabilities?: DamageType[];
    conditionImmunities?: Condition[];

    armorFormula: ArmorFormulaOption;
    armor?: ArmorData;
    unarmoredACAttribute?: string;
    useShield: boolean;
    miscACBonus: number;

    tempAC: number;
}
