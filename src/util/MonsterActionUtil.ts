
import { getActionArgs, MonsterBuilderState } from "monsterBuilder/reducers";
import { ActionArgs } from "monsterBuilder/types";
import { ActionTemplate, AttackTemplate, MonsterActionType } from "types";

// const displayAttackText = (attack: AttackTemplate, monster: MonsterBuilderState, actionArgs?: ActionArgs) =>
// {
//     return "<span class=\"action-name\"></span>";
// };

export function getRequiredArgs(action: ActionTemplate)
{
    switch (action.type)
    {
        case MonsterActionType.Attack:
            return getRequiredArgs_Attack(action as AttackTemplate);

        default:
            return getRequiredArgs_Default(action);
    }
}

function getRequiredArgs_Attack(attack: AttackTemplate)
{
    const args = getRequiredArgs_Default(attack);
    var str = "The {thing} is a {Boop}";

    const regex = /\{(.*?)\}/g;
    const nameArgs = str.match(regex) || [];

    console.log(nameArgs);

    return args;
}

function getRequiredArgs_Default(action: ActionTemplate)
{
    const regex = /\{(.*?)\}/g;
    const nameArgs = action.name.match(regex) || [];
    const descArgs = action.description.match(regex) || [];
    var str = "The {thing} is a {Boop}";

    return [...nameArgs, ...descArgs];
}
