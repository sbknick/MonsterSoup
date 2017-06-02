import * as React from "react";
import { connect } from "react-redux";

import { attributes } from "data";
import * as Actions from "monsterBuilder/actions/offenses.actions";
import { ActionsState, AttributesState, HitDice, MonsterAction, MonsterTrait,
         OffensesState, TraitArgs } from "monsterBuilder/types";
import { getCollatedMonsterActions, getMonsterBuilderData, getTraitArgs, getTraitsForMonster,
         GlobalState } from "redux/reducers";
import { ActionTemplate, ActionType, AttackTemplate, isAttack, MonsterActionTemplate, MonsterActionType } from "types";

import * as Calc from "util/Calc";
import * as CRUtil from "util/CRUtil";
import { asBonus, mod, modBonus } from "util/Mod";

import { Fieldset, HighlightBonusOnChange, HighlightOnChange, LabelledItem,
         NumberInput, SelectList, UpDownLinks } from "common";

import OffensesActions from "./OffensesActions";

/* tslint:disable:no-console */

interface Props
{
    actions: MonsterAction[];
    attributes: AttributesState;
    offenses: OffensesState;
    proficiencyBonus: number;

    setPrimaryAttackStat: (attr: string) => void;
    setPrimarySpellStat: (attr: string) => void;
    setAttackBonusBonus: (n: number) => void;
    setSaveDCBonus: (n: number) => void;
}

const Offenses: React.StatelessComponent<Props> = (props) =>
{
    return (
        <div>
            <div className="container">
                <div className="offensive-cr-details">
                    <StatSelects {...props} />
                    <AttackBonus {...props} />
                    <SaveDC {...props} />
                </div>

                <div className="offensive-cr-calculations">
                    <LabelledItem label="Offensive CR Details" labelType="h4">
                        <LabelledItem label="Expected CR for Average DPR">
                            {Calc.getDPR(props.actions, props.offenses, props.attributes)}
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

            <OffensesActions />
        </div>
    );
};

const StatSelects: React.StatelessComponent<Props> = (props) =>
(
    <LabelledItem label="Stats" labelType="h4">

        <LabelledItem label="Primary Attack Stat">
            <SelectList
                options={attributes}
                value={props.offenses.primaryAttackStat}
                onChange={e => props.setPrimaryAttackStat(e.target.value)}
            />
        </LabelledItem>

        <LabelledItem label="Primary Spellcasting Stat">
            <SelectList
                options={attributes}
                value={props.offenses.primarySpellStat}
                onChange={e => props.setPrimarySpellStat(e.target.value)}
            />
        </LabelledItem>

    </LabelledItem>
);

const AttackBonus: React.StatelessComponent<Props> = (props) =>
(
    <LabelledItem label="Attack Bonus" labelType="h4">

        <LabelledItem label="Misc Bonus">
            <NumberInput
                value={props.offenses.miscAttackBonus}
                onChange={e => props.setAttackBonusBonus(parseInt(e.target.value))}
            />
        </LabelledItem>

        <LabelledItem label="Total">
            {Calc.getAttackBonus(props.offenses, props.attributes, props.proficiencyBonus)}
        </LabelledItem>

    </LabelledItem>
);

const SaveDC: React.StatelessComponent<Props> = (props) =>
(
    <LabelledItem label="Save DC" labelType="h4">
        <LabelledItem label="Misc Bonus">
            <NumberInput
                value={props.offenses.miscSaveDCBonus}
                onChange={e => props.setSaveDCBonus(parseInt(e.target.value))}
            />
        </LabelledItem>
        <LabelledItem label="Total">
           {Calc.getSaveDC(props.offenses, props.attributes, props.proficiencyBonus)}
        </LabelledItem>
    </LabelledItem>
);

function mapStateToProps(state: GlobalState): Props
{
    const mb = getMonsterBuilderData(state);

    return {
        actions: getCollatedMonsterActions(state),
        attributes: mb.attributes,
        offenses: mb.offenses,
        proficiencyBonus: mb.proficiency.proficiencyBonus,
    } as Props;
}

function mapDispatchToProps(dispatch: any): Props
{
    return {
        setPrimaryAttackStat: (attr) => dispatch(Actions.setPrimaryAttackStat(attr)),
        setPrimarySpellStat: (attr) => dispatch(Actions.setPrimarySpellStat(attr)),
        setAttackBonusBonus: (n) => dispatch(Actions.setMiscABBonus(n)),
        setSaveDCBonus: (n) => dispatch(Actions.setMiscSaveDCBonus(n)),
    } as Props;
}

export default connect(mapStateToProps, mapDispatchToProps)(Offenses);
