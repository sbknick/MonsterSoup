

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
