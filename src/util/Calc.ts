import { asBonus, mod } from "./Mod";

import { MonsterBuilderState } from "monsterBuilder/reducers";
import { ArmorFormulaOption, ArmorType, AttributesState, DamageArgs, DefensesState, HitDice,
         MonsterTrait, OffensesState } from "monsterBuilder/types";

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
    let ac = calcAC(defenses, attributes);
    ac = traits.reduce((acc, t) => acc + t.trait.effectiveACModifier, ac);

    return ac;
}

export function getAttackBonus(offenses: OffensesState, attributes: AttributesState, proficiency: number): string
{
    const ab = calcAttackBonus(offenses, attributes, proficiency);
    return asBonus(ab);
}

export function calcAttackBonus(offenses: OffensesState, attributes: AttributesState, proficiency: number): number
{
    const abMod = mod((attributes as any)[offenses.primaryAttackStat]);
    return abMod + offenses.miscAttackBonus + proficiency;
}

export function getSaveDC(offenses: OffensesState, attributes: AttributesState, proficiency: number): string
{
    const dc = calcSaveDC(offenses, attributes, proficiency);
    return dc.toString();
}

export function calcSaveDC(offenses: OffensesState, attributes: AttributesState, proficiency: number): number
{
    const abMod = mod((attributes as any)[offenses.primarySpellStat]);
    return 8 + abMod + offenses.miscSaveDCBonus + proficiency;
}

export function calcAverageDamage(args: DamageArgs, bonus: number): number
{
    const aveRoll = args.dieSize / 2;
    return aveRoll * args.diceCount + bonus;
}
