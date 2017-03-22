import { getDescription, getTraitArgs, MonsterBuilderState } from "monsterBuilder/reducers";
import { TraitArgs } from "monsterBuilder/types";
import { TraitTemplate } from "types";

export const displayTraitDesc = (trait: TraitTemplate, monster: MonsterBuilderState, traitArgs?: TraitArgs) =>
{
    const args = traitArgs || getTraitArgs(monster, trait);
    let desc = trait.desc;

    // Do Monster-Description-based replaces

    if (/{(s|S)hortName}/.test(desc))
    {
        const shortName = getDescription(monster).shortName;
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
        name = name.replace(/{damageType}/g, args.damageType)
                   .replace(/{DamageType}/g, capitalize(args.damageType));
    }

    return name;
};

const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);
