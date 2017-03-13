import { Trait, MiscTextApplyType, SpecialTraitType } from "types";

const defaultTraits: Trait[] = [
    { id: 1, name: "Aggressive", effectiveDPRModifier: 2, desc: "As a bonus action, {shortName} can move up to its speed toward a hostile creature that it can see.",
        notReady: true },
    { id: 2, name: "Ambusher", effectiveABModifier: 1, desc: "{ShortName} has advantage on attack rolls against any creature it has surprised.",
        notReady: true  },
    { id: 3, name: "Amorphous", /* No Effective Change, */ desc: "{ShortName} can move through a space as narrow as 1 inch wide without squeezing.",
        notReady: true  },
    { id: 4, name: "Amphibious", /* No Effective Change, */ desc: "{ShortName} can breathe air and water.",
        notReady: true  },
    { id: 5, name: "Angelic Weapons", effectiveDPRModifierString: "{damage}", desc: "{ShortName}'s weapon attacks are magical. When the {shortName} hits with any weapon, the weapon deals an extra {damage} radiant damage (included in the attack).",
        // MiscText: "plus {damage} radiant damage", MiscTextApplyType: MiscTextApplyType.ToDamageText,
        notReady: true  }, // {damage} should parse to "18 (4d8)"
    { id: 6, name: "Antimagic Susceptibility", /* No Effective Change, */ desc: "{ShortName} is incapacitate while in the area of an <i>antimagic field</i>. If targeted by <i>dispel magic</i>, the sword must succeed on a Constitution saving throw against the caster's spell save DC or fall unconscious for 1 minute.",
        notReady: true  },
    { id: 7, name: "Avoidance", effectiveACModifier: 1, desc: "If {shortName} is subjected to an effect that allows it to make a saving throw to take only half damage, it instead takes no damage if it succeeds on the saving throw, and only half daamge if it fails.",
        notReady: true  },
    { id: 8, name: "Blind Senses", /* No Effective Change, */ desc: "{ShortName} can't use its blindsight while deafened and unable to smell.", requires: {Sense: "blindsight"},
        notReady: true  },
    { id: 9, name: "Blood Frenzy", effectiveABModifier: 4, desc: "{ShortName} has advantage on melee attack rolls against any creature that doesn't have all its hitpoints.",
        notReady: true  },
    // { Id: 10, Name: "Breath Weapon" } // TODO: This should be an Action added to a monster
    { id: 10, name: "Brute",
        // Special: SpecialTraitType.Brute,
        effectiveDPRModifierString: "{damage}", desc: "A melee weapon deals one extra die of its damage when {shortName} hits with it (included in the attack).",
        notReady: true  },
    { id: 11, name: "Chameleon Skin", desc: "{ShortName} has advantage on Dexterity (Stealth) checks made to hide.",
        notReady: true  },
    // { Id: 12, Name: "Change Shape", Desc: "" }, // TODO: This should be an Action
    { id: 12, name: "Charge", effectiveDPRModifierString: "{damage}", desc: "If {shortName} moves at least 30 feet straight toward a target and then hits it with a {weapon} attack on the same turn, the target takes an extra {damage}",
        notReady: true  },
    // { Id: 13, Name: "Charm", Desc: "" }, // TODO: Action
    // { Id: 13, Name: "Constrict" } // TODO: Action
    { id: 13, name: "{DamageType} Absorption", desc: "Whenever {shortName} is subjected to {damageType} damage, it takes no damage and instead regains a number of hit points equal to the {damageType} damage dealt.",
        notReady: true  },
    { id: 14, name: "Damage Transfer", desc: "Wut?",
        notReady: true  }, // Darkmantle is supposed to have this, but it doesn't. Shield Guardian's Bound ability may be what it means?

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
