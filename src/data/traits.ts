import { Trait, MiscTextApplyType, SpecialTraitType } from '../redux/reducers/traits.reducer';

const defaultTraits: Trait[] = [
    { Id: 1, Name: "Aggressive", EffectiveDPRModifier: 2, Desc: "As a bonus action, {shortName} can move up to its speed toward a hostile creature that it can see.",
        NotReady: true },
    { Id: 2, Name: "Ambusher", EffectiveABModifier: 1, Desc: "{ShortName} has advantage on attack rolls against any creature it has surprised.",
        NotReady: true  },
    { Id: 3, Name: "Amorphous", /* No Effective Change, */ Desc: "{ShortName} can move through a space as narrow as 1 inch wide without squeezing.",
        NotReady: true  },
    { Id: 4, Name: "Amphibious", /* No Effective Change, */ Desc: "{ShortName} can breathe air and water.",
        NotReady: true  },
    { Id: 5, Name: "Angelic Weapons", EffectiveDPRModifierString: "{damage}", Desc: "{ShortName}'s weapon attacks are magical. When the {shortName} hits with any weapon, the weapon deals an extra {damage} radiant damage (included in the attack).",
        // MiscText: "plus {damage} radiant damage", MiscTextApplyType: MiscTextApplyType.ToDamageText,
        NotReady: true  }, // {damage} should parse to "18 (4d8)"
    { Id: 6, Name: "Antimagic Susceptibility", /* No Effective Change, */ Desc: "{ShortName} is incapacitate while in the area of an <i>antimagic field</i>. If targeted by <i>dispel magic</i>, the sword must succeed on a Constitution saving throw against the caster's spell save DC or fall unconscious for 1 minute.",
        NotReady: true  },
    { Id: 7, Name: "Avoidance", EffectiveACModifier: 1, Desc: "If {shortName} is subjected to an effect that allows it to make a saving throw to take only half damage, it instead takes no damage if it succeeds on the saving throw, and only half daamge if it fails.",
        NotReady: true  },
    { Id: 8, Name: "Blind Senses", /* No Effective Change, */ Desc: "{ShortName} can't use its blindsight while deafened and unable to smell.", Requires: {Sense: "blindsight"},
        NotReady: true  },
    { Id: 9, Name: "Blood Frenzy", EffectiveABModifier: 4, Desc: "{ShortName} has advantage on melee attack rolls against any creature that doesn't have all its hitpoints.",
        NotReady: true  },
    // { Id: 10, Name: "Breath Weapon" } // TODO: This should be an Action added to a monster
    { Id: 10, Name: "Brute",
        // Special: SpecialTraitType.Brute,
        EffectiveDPRModifierString: "{damage}", Desc: "A melee weapon deals one extra die of its damage when {shortName} hits with it (included in the attack).",
        NotReady: true  },
    { Id: 11, Name: "Chameleon Skin", Desc: "{ShortName} has advantage on Dexterity (Stealth) checks made to hide.",
        NotReady: true  },
    // { Id: 12, Name: "Change Shape", Desc: "" }, // TODO: This should be an Action
    { Id: 12, Name: "Charge", EffectiveDPRModifierString: "{damage}", Desc: "If {shortName} moves at least 30 feet straight toward a target and then hits it with a {weapon} attack on the same turn, the target takes an extra {damage}",
        NotReady: true  },
    // { Id: 13, Name: "Charm", Desc: "" }, // TODO: Action
    // { Id: 13, Name: "Constrict" } // TODO: Action
    { Id: 13, Name: "{DamageType} Absorption", Desc: "Whenever {shortName} is subjected to {damageType} damage, it takes no damage and instead regains a number of hit points equal to the {damageType} damage dealt.",
        NotReady: true  },
    { Id: 14, Name: "Damage Transfer", Desc: "Wut?",
        NotReady: true  }, // Darkmantle is supposed to have this, but it doesn't. Shield Guardian's Bound ability may be what it means?

    // { Id: 2, Name: "Shapechanger", EffectiveABModifier: 1, Desc: "{ShortName} can use its action to polymorph into a Small or Medium humanoid it has seen, or back into its true form. Its statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn't transformed. It reverts to its true form if it dies." },
];

/* Replace-able flags:
 * {shortName} and {ShortName}: will get replaced with "the monster" and "The monster" respectively
 * {weapon} and {damage}: "hits it with a {weapon} attack and deals {damage} extra damage" => "hits it with a pike attack and deals 10 (3d6) extra damage"
 * {damageType} and {DamageType}: "{DamageType} Absorption" => "Lightning Absorption"
 *
 *
 */

export default defaultTraits;
