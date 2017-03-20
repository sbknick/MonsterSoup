
export interface Attack extends Action
{
    reach?: number;
    rangeAccurate?: number;
    rangeMax?: number;
    damageDiceCount?: number;
    damageDieSize?: number;
    damageBonus?: number;
    damageType?: string;
    recharge?: number;
}

export interface Action
{
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

export type MonsterAction = Action | Attack;

export function isAttack(action: MonsterAction): boolean
{
    return action.type === MonsterActionType.Attack;
}
