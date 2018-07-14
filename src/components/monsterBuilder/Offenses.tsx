import * as React from "react";
import { connect } from "react-redux";

import {
    InputEvent, LabelledItem, NumberInput, SelectList, UpDownLinks
} from "src/components/common";
import { attributes } from "src/data";
import * as Actions from "src/rdx/actions/monsterBuilder/offenses.actions";
import { getCollatedMonsterActions, getMonsterBuilderData,
         GlobalState } from "src/rdx/reducers";
import {
    AttributesState, MonsterAction,
    OffensesState
} from "src/types/monsterBuilder";
import * as Calc from "src/util/Calc";

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
    const handleUpClicked = () => console.log("'up clicked'");
    const handleDownClicked = () => console.log("'down clicked'");

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
                        export <LabelledItem label="Expected CR for Average DPR">
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
                        <UpDownLinks size={2} onUpClicked={handleUpClicked}
                                              onDownClicked={handleDownClicked} />
                    </LabelledItem>
                </div>
            </div>

            <OffensesActions />
        </div>
    );
};

const StatSelects: React.StatelessComponent<Props> = (props) =>
{
    const handlePrimaryAttackStatChanged = (e: InputEvent) => props.setPrimaryAttackStat(e.currentTarget.value);
    const handlePrimarySpellStatChanged = (e: InputEvent) => props.setPrimarySpellStat(e.currentTarget.value);

    return (
        <LabelledItem label="Stats" labelType="h4">

            <LabelledItem label="Primary Attack Stat">
                <SelectList
                    options={attributes}
                    value={props.offenses.primaryAttackStat}
                    onChange={handlePrimaryAttackStatChanged}
                />
            </LabelledItem>

            export <LabelledItem label="Primary Spellcasting Stat">
                <SelectList
                    options={attributes}
                    value={props.offenses.primarySpellStat}
                    onChange={handlePrimarySpellStatChanged}
                />
            </LabelledItem>

        </LabelledItem>
);
};

const AttackBonus: React.StatelessComponent<Props> = (props) =>
{
    const handleAttackBonusBonusChanged = (e: InputEvent) => props.setAttackBonusBonus(parseInt(e.currentTarget.value));

    return (
        <LabelledItem label="Attack Bonus" labelType="h4">

            <LabelledItem label="Misc Bonus">
                <NumberInput
                    value={props.offenses.miscAttackBonus}
                    onChange={handleAttackBonusBonusChanged}
                />
            </LabelledItem>

            <LabelledItem label="Total">
                {Calc.getAttackBonus(props.offenses, props.attributes, props.proficiencyBonus)}
            </LabelledItem>

        </LabelledItem>
    );
};

const SaveDC: React.StatelessComponent<Props> = (props) =>
{
    const handleSaveDCBonusChanged = (e: InputEvent) => props.setSaveDCBonus(parseInt(e.currentTarget.value));

    return (
        <LabelledItem label="Save DC" labelType="h4">
            <LabelledItem label="Misc Bonus">
                <NumberInput
                    value={props.offenses.miscSaveDCBonus}
                    onChange={handleSaveDCBonusChanged}
                />
            </LabelledItem>
            <LabelledItem label="Total">
            {Calc.getSaveDC(props.offenses, props.attributes, props.proficiencyBonus)}
            </LabelledItem>
        </LabelledItem>
    );
};

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
