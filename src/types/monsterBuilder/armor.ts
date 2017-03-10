
export interface ArmorData
{
    name: string;
    value: number;

    type: ArmorType;
    strReq?: number;
    disadvantageOnStealth?: boolean;
}

export enum ArmorType
{
    Light = 1,
    Medium,
    Heavy,
}
