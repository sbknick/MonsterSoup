import { getDescription, getTraitArgs, MonsterBuilderState } from "src/rdx/reducers/monsterStats";
import { TraitTemplate } from "src/types";
import { TraitArgs } from "src/types/monsterStats";

export const displayTraitDesc = (trait: TraitTemplate, monster: MonsterBuilderState, traitArgs?: TraitArgs) =>
{
    const args = traitArgs || getTraitArgs(monster, trait);
    let desc = trait.desc;

    // Do Monster-Description-based replaces

    if (/{(s|S)hortName}/.test(desc))
    {
        const shortName = getDescription(monster).shortName || "Name";
        desc = desc.replace(/{shortName}/g, shortName)
                   .replace(/{ShortName}/g, capitalize(shortName));
    }

    if (args == null)
        return desc;

    // Do TraitArgs-based replaces
    if (/{damage}/.test(desc))
    {
        desc = desc.replace(/{damage}/, "{{loldamage}}");
    }

    if (/{(d|D)amageType}/.test(desc))
    {
        const damageType = args.damageType || "undefined";
        desc = desc.replace(/{damageType}/g, damageType)
                   .replace(/{DamageType}/g, capitalize(damageType));
    }

    return desc;
};

export const displayTraitName = (trait: TraitTemplate, monster: MonsterBuilderState, traitArgs?: TraitArgs) =>
{
    const args = traitArgs || getTraitArgs(monster, trait);
    let name = trait.name;

    // Do TraitArgs-based replaces

    if (args == null)
        return name;

    if (/{(d|D)amageType}/.test(name))
    {
        const damageType = args.damageType || "";

        name = name.replace(/{damageType}/g, damageType)
                   .replace(/{DamageType}/g, capitalize(damageType));
    }

    return name;
};

const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);
