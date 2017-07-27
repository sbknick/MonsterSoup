
// import { getActionArgs, MonsterBuilderState } from "rdx/reducers/monsterBuilder";
import { ActionTemplate, AttackTemplate, MonsterActionType } from "types";
// import { ActionArgs } from "types/monsterBuilder";

export function getRequiredArgs(action: ActionTemplate)
{
    let args = [];
    switch (action.type)
    {
        case MonsterActionType.Attack:
            args = getRequiredArgs_Attack(action as AttackTemplate);
            break;

        default:
            args = getRequiredArgs_Default(action);
            break;
    }

    const results = args.map(a => a.split(":"));

    console.log(JSON.stringify(results));

    return results;
}

const templateArgRegex = /[^{}]+(?=\})/g; // /{(.*?)}/g;

function getRequiredArgs_Attack(attack: AttackTemplate)
{
    const args = getRequiredArgs_Default(attack);

    // attack.

    return args;
}

function getRequiredArgs_Default(action: ActionTemplate)
{
    const nameArgs = action.name.match(templateArgRegex) || [];
    const descArgs = action.description.match(templateArgRegex) || [];

    return [...nameArgs, ...descArgs];
}
