import * as React from "react";

import * as String from "util/String";
import * as Templates from "util/Templates";

// import { getActionArgs, MonsterBuilderState } from "rdx/reducers/monsterBuilder";
import { /* ActionTemplate, */ AttackTemplate, AttackType, DamageType,
         /* MonsterActionTemplate, */ MonsterActionType,
         TargetType } from "types";
import { ActionArg, /* ActionArgs, */
    ActionArgType, AttackArgs, DamageArgs, MonsterAction } from "types/monsterBuilder";

// import * as Calc from "util/Calc";
import * as Enum from "util/Enum";
import { getRequiredArgs } from "util/MonsterActionUtil";

import { DiceRollInput, NumberInput } from "components/common";

interface Props
{
    action: MonsterAction;
    statMod: number;
    setActionArgType: (arg: string, argType: ActionArgType) => void;
    setActionArg: (arg: string, argType: ActionArgType, value: string) => void;
}

export const Action: React.StatelessComponent<Props> = (props) =>
{
    let Tag = null;

    // const requiredArgs = getRequiredArgs(props.action.template);
    // // const args = props.getInheritedArgs(requiredArgs);
    // // const args = props.getActionArgs(props.action.template.id, requiredArgs);

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
            {Templates.parseTemplate(props.action.template.description, props.action.args, props.statMod)}
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
                {/* Render attack details */}
                <div>
                    <i><b>
                        {attack.name}{attack.recharge && ` (Recharge ${attack.recharge.low}-${attack.recharge.high})`}.
                    </b>&nbsp;
                    {String.titleize(AttackType[attack.attackType])}: </i>
                    {attackArgs.attackBonus ? attackArgs.attackBonus.value : 0} to hit,
                    reach {attack.reach || 5} ft.,&nbsp;
                    {String.detitleize(TargetType[attack.targetType])}.&nbsp;
                    <i>Hit:</i> {Templates.parseTemplate(attack.description, args, this.props.statMod)}
                </div>

                {/* Assign argument values */}
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
                        backgroundColor: "lightgrey",
                        borderRadius: "4px",
                        border: "1px solid grey",
                        padding: "2px",
                    }}>
                        {getRequiredArgs(this.props.action.template).map(a =>
                            a[2] !== "inherited" &&
                            <AssignArg key={a[0]} {...this.props} arg={a[0]} argType={a[1]} />)
                        }
                    </span>
                </div>
            </div>
        );
    }
}

const AssignArg: React.StatelessComponent<Props & {arg: string, argType: string}> = (props) =>
{
    let input: JSX.Element;

    // tslint:disable-next-line:no-object-literal-type-assertion
    const arg = props.action.args[props.arg] || {} as ActionArg;
    if (arg && arg.inherited) return null;

    let argType = (ActionArgType as any)[props.argType] as ActionArgType;

    argType = argType || (arg && arg.argType);

    const handleChangeArgValue = (e: any) => props.setActionArg(props.arg, argType, e.target.value);
    const handleChangeDamageRollArgValue = (args: any) => {
        const value = {...arg.value as DamageArgs, ...args};
        props.setActionArg(props.arg, argType, value);
    };

    switch (argType)
    {
        default:
        case ActionArgType.Text:
            input = <input value={arg && arg.value as string} onChange={handleChangeArgValue} />;
            break;

        case ActionArgType.Number:
            input = <NumberInput value={parseInt(arg && arg.value as string)} onChange={handleChangeArgValue} />;
            break;

        case ActionArgType.DamageRoll:
            const damArgs = arg.value as DamageArgs;
            if (!damArgs)
            {
                handleChangeDamageRollArgValue(defaultDamageArgs);
                return null;
            }

            const { diceCount, dieSize, miscBonus, usePrimaryStatBonus } = damArgs;
            input = (
                <DiceRollInput
                    useMiscBonus={true}
                    containerType="span"
                    diceCount={diceCount}
                    dieSize={dieSize}
                    miscBonus={miscBonus}
                    diceCountChanged={n => handleChangeDamageRollArgValue({ diceCount: n })}
                    dieSizeChanged={n => handleChangeDamageRollArgValue({ dieSize: n })}
                    miscBonusChanged={n => handleChangeDamageRollArgValue({ miscBonus: n })}
                >
                    <label>Use Bonus from Primary:</label>
                    <input type="checkbox" checked={usePrimaryStatBonus}
                        onChange={() => handleChangeDamageRollArgValue({
                            usePrimaryStatBonus: !damArgs.usePrimaryStatBonus,
                        })}
                    />
                </DiceRollInput>
            );
            break;

        case ActionArgType.DamageType:
            input = (
                <select value={arg && arg.value as string || ""} onChange={handleChangeArgValue}>
                    <option value={""} disabled>-- Select One --</option>
                    {Enum.map(DamageType, dt =>
                        <option key={dt} value={dt}>{(DamageType as any)[dt]}</option>)
                    }
                </select>
            );
            break;
    }

    const liStyle = {
        display: "inline",
        listStyleType: "none",
        marginRight: "5px",
    };

    return (
        <ul style={{padding: 0, margin: 0}}>
            <li style={liStyle}>{props.arg}</li>
            {props.argType ? ActionArgType[argType] : (
                <li style={liStyle}>
                    <select
                        value={argType}
                        onChange={e => props.setActionArgType(props.arg, parseInt(e.target.value))}
                    >
                        {Enum.map(ActionArgType, art =>
                            <option key={art} value={art}>{ActionArgType[art]}</option>)}
                    </select>
                </li>
            )}
            <li style={liStyle}>
                {input}
            </li>
        </ul>
    );
};

const defaultDamageArgs: DamageArgs = {
    diceCount: 1,
    dieSize: 4,
    usePrimaryStatBonus: true,
};

export default Action;
