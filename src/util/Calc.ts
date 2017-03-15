import { asBonus, mod } from "./Mod";

import { MonsterBuilderState } from "monsterBuilder/reducers";
import { ArmorFormulaOption, ArmorType, AttributesState, DefensesState, HitDice,
         MonsterTrait } from "monsterBuilder/types";

import { getTraitArgs, getTraitsForMonster } from "redux/reducers";

export function averageHitDice(hitDice: HitDice[], conMod: number): number
{
    const total = hitDice
                .map(hd => averageHitDie(hd, conMod))
                .reduce((a, b) => a + b);

    return total;
}

export function averageHitDie(hitDie: HitDice, conMod: number): number
{
    const averageRoll = Math.floor(hitDie.hitDieSize / 2);
    const sum = (averageRoll + conMod) * hitDie.hitDiceCount;
    return sum;
}

export function getACOutputForStandardArmor(defenses: DefensesState, attributes: AttributesState): string
{
    const ac = calcACForStandardArmor(defenses, attributes);
    return `${ac} (${defenses.armor.name.toLowerCase()}${(defenses.useShield ? ", shield" : "")})`;
}

export function getACOutputForNaturalArmor(defenses: DefensesState, attributes: AttributesState): string
{
    const ac = calcACForNaturalArmor(defenses, attributes);
    return `${ac} (natural armor${(defenses.useShield ? ", shield" : "")})`;
}

export function getACOutputForUnarmoredDefense(defenses: DefensesState, attributes: AttributesState): string
{
    const ac = calcACForUnarmoredDefense(defenses, attributes);
    return `${ac}${(defenses.useShield ? " (shield)" : "")}`;
}

export function calcACForStandardArmor(defenses: DefensesState, attributes: AttributesState): number
{
    const dexMod = mod(attributes.Dex);
    let ac = defenses.armor.value + defenses.miscACBonus;
    ac += defenses.useShield ? 2 : 0;

    switch (defenses.armor.type)
    {
        case ArmorType.Light:
            ac += dexMod;
            break;

        case ArmorType.Medium:
            ac += Math.min(2, dexMod);
            break;

        case ArmorType.Heavy:
            break;

        default:
            throw new RangeError("Unexpected armor type");
    }

    return ac;
}

export function calcACForNaturalArmor(defenses: DefensesState, attributes: AttributesState): number
{
    const dexMod = mod(attributes.Dex);
    let ac = 10 + defenses.miscACBonus + dexMod;
    ac += defenses.useShield ? 2 : 0;
    return ac;
}

export function calcACForUnarmoredDefense(defenses: DefensesState, attributes: AttributesState): number
{
    const dexMod = mod(attributes.Dex);
    let ac = 10 + defenses.miscACBonus + dexMod;
    ac += defenses.useShield ? 2 : 0;

    if (defenses.unarmoredACAttribute)
    {
        ac += mod((attributes as any)[defenses.unarmoredACAttribute]);
    }

    return ac;
}

export function getEffectiveACOutput(defenses: DefensesState, attributes: AttributesState, traits: MonsterTrait[]): string // tslint:disable-line
{
    const effectiveACBonusFromTraits = traits.reduce((acc, t) => acc + t.trait.effectiveACModifier, 0);
    const total = calcEffectiveAC(defenses, attributes, traits);

    return total.toString() +
        (effectiveACBonusFromTraits !== 0 ? ` (${asBonus(effectiveACBonusFromTraits)} from Traits)` : "");
}

export function calcAC(defenses: DefensesState, attributes: AttributesState): number
{
    switch (defenses.armorFormula)
    {
        case ArmorFormulaOption.NaturalArmor:
            return calcACForNaturalArmor(defenses, attributes);

        case ArmorFormulaOption.StandardArmor:
            return calcACForStandardArmor(defenses, attributes);

        case ArmorFormulaOption.UnarmoredDefense:
            return calcACForUnarmoredDefense(defenses, attributes);

        default:
            throw new Error();
    }
}

export function calcEffectiveAC(defenses: DefensesState, attributes: AttributesState, traits: MonsterTrait[]): number
{
    let ac = 0;
    switch (defenses.armorFormula)
    {
        case ArmorFormulaOption.NaturalArmor:
            ac = calcACForNaturalArmor(defenses, attributes);
            break;

        case ArmorFormulaOption.StandardArmor:
            ac = calcACForStandardArmor(defenses, attributes);
            break;

        case ArmorFormulaOption.UnarmoredDefense:
            ac = calcACForUnarmoredDefense(defenses, attributes);
            break;

        default:
            throw new Error();
    }

    ac = traits.reduce((acc, t) => acc + t.trait.effectiveACModifier, ac);

    return ac;
}