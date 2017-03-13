import { mod } from "./Mod";

import { MonsterBuilderState } from "monsterBuilder/reducers";
import { ArmorType, AttributesState, DefensesState, HitDice } from "monsterBuilder/types";

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
