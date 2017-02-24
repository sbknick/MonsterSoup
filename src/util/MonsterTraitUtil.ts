import { MonsterBuilderState, getDescription, getTraitArgs } from '../redux/reducers/monsterBuilder';
import { Trait } from '../redux/reducers/traits.reducer';
import { TraitArgs } from '../redux/reducers/monsterBuilder/traits.reducer';

export const DisplayTraitDesc = (trait: Trait, monster: MonsterBuilderState, traitArgs?: TraitArgs) =>
{
    let args = traitArgs || getTraitArgs(monster, trait);
    let desc = trait.Desc;

    // Do Monster-Description-based replaces

    if (/{(s|S)hortName}/.test(desc))
    {
        var shortName = getDescription(monster).shortName;
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
        var damageType = args.damageType || "undefined";
        desc = desc.replace(/{damageType}/g, damageType)
                   .replace(/{DamageType}/g, capitalize(damageType));
    }

    return desc;
};

export const DisplayTraitName = (trait: Trait, monster: MonsterBuilderState, traitArgs?: TraitArgs) =>
{
    const args = traitArgs || getTraitArgs(monster, trait);
    let name = trait.Name;

    // Do TraitArgs-based replaces

    if (args == null)
        return name;

    if (/{(d|D)amageType}/.test(name))
    {
        name = name.replace(/{damageType}/g, args.damageType)
                   .replace(/{DamageType}/g, capitalize(args.damageType));
    }

    return name;
}

const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);
