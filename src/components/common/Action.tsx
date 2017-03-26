import * as React from "react";

import * as String from "util/String";

import { getActionArgs, MonsterBuilderState } from "monsterBuilder/reducers";
import { ActionArgs, AttackArgs, MonsterAction } from "monsterBuilder/types";
import { ActionTemplate, AttackTemplate, AttackType, MonsterActionTemplate, MonsterActionType,
         TargetType } from "types";

interface Props
{
    action: MonsterAction;
}

export const Action: React.StatelessComponent<Props> = (props) =>
{
    let Tag = null;

    switch (props.action.template.type)
    {
        case MonsterActionType.Attack:
            Tag = Attack;
            break;

        default:
            Tag = Default;
            break;
    }

    return (
        <Tag {...props} />
    );
};

const Default: React.StatelessComponent<Props> = (props) =>
{
    return (
        <p>
            <i><b>{props.action.template.name}. </b></i>
            {String.parseTemplate(props.action.template.description, props.action.args)}
        </p>
    );
};

const Attack: React.StatelessComponent<Props> = (props) =>
{
    const { template, args } = props.action;
    const attack = template as AttackTemplate;
    const attackArgs = args as AttackArgs;

    return (
        <p>
            <i><b>{attack.name}. </b>
            {String.titleize(AttackType[attack.attackType])}: </i>
            {attackArgs.attackBonus} to hit,
            reach {attack.reach || 5} ft.,&nbsp;
            {String.detitleize(TargetType[attack.targetType])}.&nbsp;
            <i>Hit:</i> {String.parseTemplate(attack.description, args)}
        </p>
    );
};

export default Action;
