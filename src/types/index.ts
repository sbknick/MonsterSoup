
export enum Condition
{
    Blinded = 1,
    Charmed,
    Deafened,
    Frightened,
    Grappled,
    Incapacitated,
    Invisible,
    Paralyzed,
    Petrified,
    Poisoned,
    Prone,
    Restrained,
    Stunned,
    Unconscious,
}

export enum DamageType
{
    Acid = 1,
    Bludgeoning,
    Cold,
    Fire,
    Force,
    Lightning,
    Necrotic,
    Piercing,
    Poison,
    Psychic,
    Radiant,
    Slashing,
    Thunder,
}

export interface Trait
{
    id: number;
    name: string;
    desc: string;
    miscText?: string;
    miscTextApplyType?: MiscTextApplyType;

    effectiveACModifier?: number;
    effectiveHPMultiplier?: number;
    effectiveABModifier?: number;
    effectiveDCModifier?: number;

    effectiveDPRModifier?: number;
    effectiveDPRMultiplier?: number;
    effectiveDPRModifierString?: string;

    requires?: any;
    special?: SpecialTraitType;
    notReady?: boolean;
}

export enum MiscTextApplyType
{
    ToDamageText = 1,
}

export enum SpecialTraitType
{
    Brute = 1,
}

export interface AttackTemplate extends ActionTemplate
{
    attackType: AttackType;
    reach?: number;
    rangeAccurate?: number;
    rangeMax?: number;
    damageDiceCount?: number;
    damageDieSize?: number;
    damageBonus?: number;
    damageType?: string;
    recharge?: number;
}

export interface ActionTemplate
{
    id: number;
    type: MonsterActionType;
    name: string;
    description: string;
    actionType: ActionType;
}

export enum MonsterActionType
{
    None = 1,
    Attack,
}

export enum ActionType
{
    Action = 1,
    BonusAction,
    Reaction,
    MoveAction,
    FreeAction,
}

export enum AttackType
{
    MeleeWeaponAttack = 1,
    RangedWeaponAttack,
    MeleeSpellAttack,
    RangedSpellAttack,
}

export type MonsterActionTemplate = ActionTemplate | AttackTemplate;

export function isAttack(action: MonsterActionTemplate): boolean
{
    return action.type === MonsterActionType.Attack;
}
