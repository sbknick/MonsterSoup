import { ActionTemplate, ActionType, AttackTemplate, AttackType, MonsterActionTemplate,
         MonsterActionType } from "types";

const defaultActions: MonsterActionTemplate[] = [
    {
        id: 1,
        type: MonsterActionType.None,
        name: "Bloom",
        description: "This unit can open up and squirt pollen at things.",
        actionType: ActionType.Action,
    },
    {
        id: 2,
        type: MonsterActionType.None,
        name: "Bite",
        description: "The {shortName} can bite for {damage}",
        actionType: ActionType.Action,
        attackType: AttackType.MeleeWeaponAttack,
    },
];

// This has been taken straight from the Traits data stuff.
// Still needs to be figured out specifically for Actions!

/* Replace-able flags:
 * {shortName} and {ShortName}: will get replaced with "the monster" and "The monster" respectively
 * {weapon} and {damage}: "hits it with a {weapon} attack and deals {damage} extra damage"
 *                     => "hits it with a pike attack and deals 10 (3d6) extra damage"
 * {damageType} and {DamageType}: "{DamageType} Absorption" => "Lightning Absorption"
 *
 *
 */
export default defaultActions;
