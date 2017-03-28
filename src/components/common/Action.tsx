import * as React from "react";

import * as String from "util/String";

import { getActionArgs, MonsterBuilderState } from "monsterBuilder/reducers";
import { ActionArgs, ActionArgType, AttackArgs, MonsterAction } from "monsterBuilder/types";
import { ActionTemplate, AttackTemplate, AttackType, MonsterActionTemplate, MonsterActionType,
         TargetType } from "types";
import { getRequiredArgs } from "util/MonsterActionUtil";

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
            <label>Assign Arguments</label>
            <span>{JSON.stringify(getRequiredArgs(props.action.template))}</span>
        </p>
    );
};

class Attack extends React.Component<Props, {assignOpen: boolean}>
{
    constructor(props: Props)
    {
        super(props);

        this.state = { assignOpen: false };
    }

    public render()
    {
        const { template, args } = this.props.action;
        const attack = template as AttackTemplate;
        const attackArgs = args as AttackArgs;

        return (
            <div>
                <div>
                    <i><b>{attack.name}. </b>
                    {String.titleize(AttackType[attack.attackType])}: </i>
                    {attackArgs.attackBonus.value} to hit,
                    reach {attack.reach || 5} ft.,&nbsp;
                    {String.detitleize(TargetType[attack.targetType])}.&nbsp;
                    <i>Hit:</i> {String.parseTemplate(attack.description, args)}
                </div>
                <div style={{position: "relative"}}>
                    <a href="" onClick={e => {
                        e.preventDefault();
                        this.setState({ assignOpen: !this.state.assignOpen });
                    }}>
                        Assign Arguments
                    </a>
                    <span style={{
                        display: this.state.assignOpen ? "block" : "none",
                        position: "absolute",
                        backgroundColor: "grey",
                        borderRadius: "4px",
                        padding: "2px",
                    }}>
                        {getRequiredArgs(this.props.action.template).map(a =>
                            <AssignArg key={a[0]} {...this.props} arg={a[0]} />)
                        }
                    </span>
                </div>
            </div>
        );
    }
};

const AssignArg: React.StatelessComponent<Props & {arg: string}> = (props) =>
{
    let input: JSX.Element = <b>Hi</b>;

    const arg = props.action.args[props.arg];

    if (arg)
    {
        switch (arg.argType)
        {
            case ActionArgType.Text:
                input = <input onChangeCapture={() => {; }} />
                break;
        }
    }

    const liStyle = {
        display: "inline",
        listStyleType: "none",
    };

    return (
        <ul style={{padding: 0, margin: 0}}>
            <li style={liStyle}>{props.arg}</li>
            <li style={liStyle}>
                <select>
                    <option>{ActionArgType[ActionArgType.Text]}</option>
                    <option>{ActionArgType[ActionArgType.Number]}</option>
                    <option>{ActionArgType[ActionArgType.DiceRoll]}</option>
                </select>
            </li>
            <li style={liStyle}>{input}</li>
        </ul>
    );
};

export default Action;
