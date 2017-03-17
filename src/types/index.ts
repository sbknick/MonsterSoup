
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
