import * as React from "react";
import { connect } from "react-redux";

import { attributes } from "data";
import * as Actions from "monsterBuilder/actions/defenses.actions";
import { Action, Attack, AttributesState, HitDice, MonsterTrait, OffensesState, TraitArgs } from "monsterBuilder/types";
import { getMonsterBuilderData, getTraitArgs, getTraitsForMonster, GlobalState } from "redux/reducers";
import { Trait } from "types";

import * as Calc from "util/Calc";
import * as CRUtil from "util/CRUtil";
import { asBonus, mod, modBonus } from "util/Mod";

import { Fieldset, HighlightBonusOnChange, HighlightOnChange, LabelledItem,
    NumberInput, SelectList, UpDownLinks } from "common";

    /* tslint:disable:no-console */

interface Props
{
    attributes: AttributesState;
    offenses: OffensesState;

    setPrimaryAttackStat: (attr: string) => void;
    setPrimarySpellStat: (attr: string) => void;
    setAttackBonusBonus: (n: number) => void;
    setSaveDCBonus: (n: number) => void;
    addAction: () => void;
}

const Offenses: React.StatelessComponent<Props> = (props) =>
{
    return (
        <div className="container">
            <div className="offensive-cr-details">
                <LabelledItem label="Stats" labelType="h4">
                    <LabelledItem label="Primary Attack Stat">
                        <SelectList options={attributes}
                                    value={props.offenses.primaryAttackStat}
                                    onChange={e => props.setPrimaryAttackStat(e.target.value)}/>
                    </LabelledItem>
                    <LabelledItem label="Primary Spellcasting Stat">
                        <SelectList options={attributes}
                                    value={props.offenses.primarySpellStat}
                                    onChange={props.setPrimarySpellStat} />
                    </LabelledItem>
                </LabelledItem>
                <LabelledItem label="Attack Bonus" labelType="h4">
                    <LabelledItem label="Misc Bonus">
                        <NumberInput value={props.offenses.attackBonus}
                                     onChange={e => props.setAttackBonusBonus(parseInt(e.target.value))} />
                    </LabelledItem>
                    <LabelledItem label="Total">
                        {0}
                    </LabelledItem>
                </LabelledItem>
                <LabelledItem label="Save DC" labelType="h4">
                    <LabelledItem label="Misc Bonus">
                        <NumberInput value={props.offenses.saveDCBonus}
                                     onChange={e => props.setSaveDCBonus(parseInt(e.target.value))} />
                    </LabelledItem>
                    <LabelledItem label="Total">
                       {0}
                    </LabelledItem>
                </LabelledItem>
                <LabelledItem label="Actions" labelType="h4">
                    <ActionSplats {...props} />
                </LabelledItem>
            </div>

            <div className="offensive-cr-calculations">
                <LabelledItem label="Offensive CR Details" labelType="h4">
                    <LabelledItem label="Expected CR for Average DPR">
                        {0}
                    </LabelledItem>

                    <LabelledItem label="Expected AttackBonus/Save DC for Average DPR">
                        {"0-0"}
                    </LabelledItem>

                    {/*<EffectiveAC {...props} />*/}
                    {"Effective AB/DC"}
                </LabelledItem>
                <LabelledItem label="Offensive CR Calculations" labelType="h4">
                    CR from Average HP<br/>
                    1/8<br/>
                    Adjustment from eAC<br/>
                    0<br/>
                    Total<br/>
                    1/8<br/>
                </LabelledItem>
            </div>

            <div className="offensive-cr-outcomes">
                <LabelledItem label="Offensive CR Rating" labelType="h4">
                    {0}
                </LabelledItem>
                <LabelledItem label="AutoScale!" labelType="h4">
                    <UpDownLinks size={2} onUpClicked={e => console.log("'up clicked'")}
                                          onDownClicked={e => console.log("'down clicked'")} />
                </LabelledItem>
            </div>
        </div>
    );
};

const ActionSplats: React.StatelessComponent<Props> = (props) =>
{


    return (
        <div>
            <AttackSplat name="Attack Name" description="Attack Description"
                damageDiceCount={2} damageDieSize={8} />
            <ActionSplat name="Action Name" description="Action Description" />
        </div>
    );
};

const AttackSplat: React.StatelessComponent<Attack> = (attack) =>
(
    <ActionSplat {...attack}>
        <p>{attack.damageDiceCount}d{attack.damageDieSize}</p>
        {isAttack(attack) ? "Attack" : "Action"}
    </ActionSplat>
);

const ActionSplat: React.StatelessComponent<Action> = (action) =>
(
    <div>
        <h5>{action.name}.</h5>
        <p>{action.description}</p>
        {isAttack(action) ? "Attack" : "Action"}
        {action.children}
    </div>
);

function isAttack(action: Action): boolean
{
    return (action as Attack).damageDieSize !== undefined;
}

function mapStateToProps(state: GlobalState): Props
{
    const mb = getMonsterBuilderData(state);

    return {
        attributes: mb.attributes,
        offenses: mb.offenses,
    } as Props;
}

function mapDispatchToProps(dispatch: any): Props
{
    return {
        setPrimaryAttackStat: (attr) => dispatch({ type: "HI", attr }),
        setPrimarySpellStat: (attr) => dispatch({ type: "HI", attr }),
        setAttackBonusBonus: (n) => dispatch({ type: "HI", n }),
        setSaveDCBonus: (n) => dispatch({ type: "HI", n }),
        addAction: () => dispatch({ type: "HI" }),
    } as Props;
}

export default connect(mapStateToProps, mapDispatchToProps)(Offenses);
