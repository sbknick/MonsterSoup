import { ActionTemplate, ActionType, AttackTemplate, AttackType, MonsterActionTemplate,
         MonsterActionType, TargetType } from "types";

export const defaultActions: MonsterActionTemplate[] = [
    {
        id: 1,
        type: MonsterActionType.None,
        name: "Bloom",
        description: "This unit can open up and squirt pollen at things.",
        actionType: ActionType.Action,
    },
    {
        id: 2,
        type: MonsterActionType.Attack,
        name: "Bite",
        description: "The {shortName} can bite for {damage:DiceRoll} {damageType:DamageType} damage and {otherThing}",
        actionType: ActionType.Action,
        attackType: AttackType.MeleeWeaponAttack,
        targetType: TargetType.OneTarget,
    },
    {
        id: 3,
        type: MonsterActionType.Attack,
        name: "Lightning Breath",
        description: "The {shortName} can exhales lightning in a 30-foot line that is 5 feet wide. Each creature in that line must make a DC {saveDC} Dexterity saving throw, taking {damage:DiceRoll:usePrimaryStatBonus=false} lightning damage on a failed save, or half as much damage on a successful one.",
        actionType: ActionType.Action,
        attackType: AttackType.Special,
        targetType: TargetType.Area,
    }
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
