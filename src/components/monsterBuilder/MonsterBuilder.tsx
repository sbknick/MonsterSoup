import * as React from "react";
// import { connect } from 'react-redux';

import * as CRUtil from "util/CRUtil";
import { mod, modBonus } from "util/Mod";

import { Fieldset, HighlightBonusOnChange, HighlightOnChange, LabelledItem,
         NumberInput, SelectList, UpDownLinks } from "../common";
import Attributes from "./Attributes";
import Defenses from "./Defenses";
import Offenses from "./Offenses";
import Proficiency from "./Proficiency";
import Saves from "./Saves";
import Traits from "./Traits";
import TraitSplat from "./TraitSplat";

import { AttributesState } from "monsterBuilder/types";

interface MonsterStatsProps
{
    monsterName: string;
}

interface Offenses
{
    primaryStat: string;
    primarySpellStat: string;
    attackBonus: number;
    saveDCBonus: number;
    multiattackCount: number;
    attacks: Attack[];

    averageDPR: number;
}

interface Attack
{
    name: string;
    reach?: number;
    rangeAccurate?: number;
    rangeMax?: number;
    damageDiceCount?: number;
    damageDieSize?: number;
    description: string;
    damageBonus?: number;
}


const STANDARD_ARMOR: "STANDARD_ARMOR" = "STANDARD_ARMOR";
const NATURAL_ARMOR: "NATURAL_ARMOR" = "NATURAL_ARMOR";
const UNARMORED_DEFENSE: "UNARMORED_DEFENSE" = "UNARMORED_DEFENSE";

interface MonsterStatsState
{
    offenses: Offenses;
    proficiency: number;

    isProficiencyChanged: boolean;
}

const ATTACKS: Attack[] = [
    {name: "Bite", reach: 5, damageDiceCount: 2, damageDieSize: 6, damageBonus: 2, description: "Nomnomnom."},
];
const OFFENSES: Offenses = {primaryStat: "Str", primarySpellStat: "Int",
    attackBonus: 6, saveDCBonus: 0, multiattackCount: 1, attacks: ATTACKS,
    averageDPR: 12};


const DEFAULT_MONSTER_STATS_STATE: MonsterStatsState = {
    offenses: OFFENSES,
    proficiency: 2,
    isProficiencyChanged: false,
};

class MonsterBuilder extends React.Component<MonsterStatsProps, MonsterStatsState>
{
    constructor(props: MonsterStatsProps)
    {
        super(props);
        this.state = DEFAULT_MONSTER_STATS_STATE;

        this.modifyHitDiceCount = this.modifyHitDiceCount.bind(this);
        this.modifyHitDieSize = this.modifyHitDieSize.bind(this);
        this.handleChangeACFormulaType = this.handleChangeACFormulaType.bind(this);
        this.handleChangePrimaryStat = this.handleChangePrimaryStat.bind(this);
        this.handleChangePrimarySpellStat = this.handleChangePrimarySpellStat.bind(this);
    }

    public render()
    {
        const { monsterName } = this.props;

        return (
            <div className="monster-stats">
                <fieldset>
                    <legend>{monsterName} Stats</legend>

                    <Attributes />
                    <Proficiency />
                    <Saves />

                    <Fieldset legend="Traits" className="defensive-cr" displayOnCollapse={"(1)"}>
                        <Traits />
                    </Fieldset>
                    <Fieldset legend="Defensive CR" className="defensive-cr"
                              displayOnCollapse={this.DefensiveCRSummary()}>
                        <Defenses />
                    </Fieldset>
                    <Fieldset legend="Offensive CR" className="offensive-cr"
                              displayOnCollapse={this.OffensiveCRSummary()}>
                        <Offenses />
                    </Fieldset>

                    <Fieldset legend="Offensive CR" className="offensive-cr"
                              displayOnCollapse={this.OffensiveCRSummary()}>
                        <div className="container">
                            <div className="offensive-cr-primarystats">
                                <LabelledItem label="Primary Attack Stat">
                                    <SelectList options={["Str", "Dex", "Con", "Int", "Wis", "Cha"]}
                                                value={this.state.offenses.primaryStat}
                                                onChange={this.handleChangePrimaryStat}/>
                                </LabelledItem>
                                <LabelledItem label="Primary Spellcasting Stat">
                                    <SelectList options={["Str", "Dex", "Con", "Int", "Wis", "Cha"]}
                                                value={this.state.offenses.primarySpellStat}
                                                onChange={this.handleChangePrimarySpellStat} />
                                </LabelledItem>
                            </div>
                            <div className="offensive-cr-tohit">
                                <LabelledItem label="Attack Bonus" labelType="h4" contentContainer="none">
                                    <LabelledItem label="Calc!">
                                        <div style={{display: "inline-block", textAlign: "center"}}>
                                            Proficiency<br />
                                            <HighlightBonusOnChange value={this.state.proficiency} />
                                        </div>
                                        <b>+</b>
                                        <div style={{display: "inline-block", textAlign: "center"}}>
                                            {this.state.offenses.primaryStat}<br />
                                            <HighlightBonusOnChange value={this.GetMod(this.state.offenses.primaryStat)} />
                                        </div>
                                        <b>=</b>
                                        <div style={{display: "inline-block", textAlign: "center"}}>
                                            Total<br />
                                            <HighlightBonusOnChange value={this.state.proficiency + this.GetMod(this.state.offenses.primaryStat)} />
                                        </div>
                                    </LabelledItem>
                                    <br />
                                    <LabelledItem label="Expected CR Range for Effective AD">
                                        {JSON.stringify(CRUtil.getCRRangeForAB(this.state.proficiency + this.GetMod(this.state.offenses.primaryStat)))}
                                    </LabelledItem>
                                </LabelledItem>
                                <div>
                                    <h4>Save DC</h4>
                                    <div>
                                        <label>Calc!</label>
                                        <div className="inline-children center-align-children">
                                        {/* <div style={{display: "inline-block", textAlign: "center"}}> */}
                                            <div>
                                                Proficiency<br />
                                                <HighlightBonusOnChange value={this.state.proficiency} />
                                            </div>
                                            <b>+</b>
                                            <div>
                                                <HighlightOnChange value={this.state.offenses.primarySpellStat} />
                                                <br />
                                                <HighlightBonusOnChange value={this.GetMod(this.state.offenses.primarySpellStat)} />
                                            </div>
                                            <b>=</b>
                                            <div>
                                                Total<br />
                                                <HighlightBonusOnChange value={this.state.proficiency + this.GetMod(this.state.offenses.primarySpellStat)} />
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <LabelledItem label="Expected CR Range for Effective Save DC">
                                        {JSON.stringify(CRUtil.getCRRangeForAB(this.state.proficiency + this.GetMod(this.state.offenses.primarySpellStat)))}
                                    </LabelledItem>
                                </div>
                            </div>
                            <div>
                                <h4>Attacks</h4>
                                <div>
                                    lalalaa
                                </div>
                            </div>
                            <div className="offensive-cr-damageperround">
                                <h4>Damage Per Round</h4>
                                <LabelledItem label="Average DPR">
                                    {this.calcAverageDamagePerRound()}
                                </LabelledItem>
                                <NumberInput value={this.state.offenses.averageDPR}
                                             onChange={e => {; } /* this.setTempAverageDPR(e.target.value)*/} />
                            </div>
                            <div>
                                <h4>Offensive CR</h4>
                                <LabelledItem label="Expected CR from DPR">
                                    {CRUtil.getCRForDPR(this.calcAverageDamagePerRound())}
                                </LabelledItem>
                                <br />
                                <LabelledItem label="Expected Attack Bonus / Save DC for Expected CR">
                                    <LabelledItem label="Attack Bonus">
                                        {CRUtil.getExpectedABForCR(CRUtil.getCRForDPR(this.calcAverageDamagePerRound()))}
                                    </LabelledItem>
                                    <br />
                                    <LabelledItem label="Save DC">
                                        {CRUtil.getExpectedDCForCR(CRUtil.getCRForDPR(this.calcAverageDamagePerRound()))}
                                    </LabelledItem>
                                </LabelledItem>
                            </div>
                        </div>
                    </Fieldset>
                    <Fieldset legend="Total CR" displayOnCollapse={this.TotalCRSummary()}>
                        {this.TotalCRSummary()}
                    </Fieldset>
                    <div style={{marginTop: "30px"}}>
                        <a href="">Export as StatBlocks HTML</a>
                        <br />
                        <a href="">Export as Homebrewery Markdown</a>
                    </div>
                </fieldset>
            </div>
        );
    }

    private GetMod(attr: string): number
    {
        return 0;
        // var value = (this.state.attributes as any)[attr];
        // return mod(value);
    }

    private hitDiceAverage(): number
    {
        // const { hitDieSize, hitDiceCount } = this.state.defenses;
        // const conMod = 0; // mod(this.state.attributes.Con);
        //
        // let averageRoll = Math.floor(hitDieSize / 2);
        //
        // var sum = (averageRoll + conMod) * hitDiceCount;
        // return sum;
        return 1;
    }

    private calcAverageDamagePerRound(): number
    {
        return this.state.offenses.averageDPR;
    }

    private handleChange(attr: string): (e: any) => void
    {
        return e => {; };
        // return (e: any) => this.SetAttribute(attr, e.target.value);
    }

    private modifyHitDiceCount(e: any)
    {
        // const def = this.state.Defenses;
        // def.hitDiceCount = e.target.value;
        // this.setState({defenses: def} as MonsterStatsState);
    }

    private  modifyHitDieSize(e: any)
    {
        // const def = this.state.Defenses;
        // def.hitDieSize = e.target.value;
        // this.setState({defenses: def} as MonsterStatsState);
    }

    private handleChangeACFormulaType(e: any)
    {
        // const def = this.state.Defenses;
        // def.ACFormulaType = e.target.value;
        // this.setState({defenses: def} as MonsterStatsState);
    }

    private handleChangePrimaryStat(e: any)
    {
        // const off = this.state.Offenses;
        // off.primaryStat = e.target.value;
        // this.setState({offenses: off} as MonsterStatsState);
    }

    private handleChangePrimarySpellStat(e: any)
    {
        // const off = this.state.Offenses;
        // off.primarySpellStat = e.target.value;
        // this.setState({offenses: off} as MonsterStatsState);
    }

    private EffectiveACBoostFromTraits(): number
    {
        const effectiveACModifier = 0;
        // this.state.Traits.reduce((acc, tr) =>
        // {
        //     if (tr.EffectiveACModifier != null)
        //         acc += tr.EffectiveACModifier;
        //     return acc;
        // }, effectiveACModifier);
        return effectiveACModifier;
    }

    private DefensiveCRSummary()
    {
        const effectiveACModifier = this.EffectiveACBoostFromTraits();

        return (
            <div style={{fontSize: ".8em"}}>
                <i>  -HP:</i> <b>{this.hitDiceAverage()}</b> (CR {CRUtil.getCRForHP(this.hitDiceAverage())})
                <i>  -AC:</i> <b>{12}</b>
                {effectiveACModifier !== 0 && ("+" + effectiveACModifier + " Effective from Traits")}
                <i>  -CR:</i> <b>{CRUtil.getDefensiveCR(this.hitDiceAverage(), 12)}</b>
                {

                }
            </div>
        );
    }

    private EffectiveABBoostFromTraits(): number
    {
        const effectiveABModifier = 0;
        // this.state.Traits.reduce((acc, tr) =>
        // {
        //     if (tr.EffectiveABModifier != null)
        //         acc += tr.EffectiveABModifier;
        //     return acc;
        // }, effectiveABModifier);
        return effectiveABModifier;
    }

    private OffensiveCRSummary(): JSX.Element
    {
        const effectiveABModifier = this.EffectiveABBoostFromTraits();

        return (
            <div style={{fontSize: ".8em"}}>
                <i>  -DPR:</i> <b>{this.calcAverageDamagePerRound()}</b> (CR {
                    CRUtil.getCRForDPR(this.calcAverageDamagePerRound())})
                <i>  -AB:</i> <b>{this.state.offenses.attackBonus}</b>
                {effectiveABModifier !== 0 && ("+" + effectiveABModifier + " Effective from Traits")}
                <i>  -CR:</i> <b>{CRUtil.getOffensiveCR(this.calcAverageDamagePerRound(),
                                                        this.state.offenses.attackBonus)}</b>
            </div>
        );
    }

    private TotalCRSummary(): JSX.Element
    {
        const defCR = CRUtil.getDefensiveCR(this.hitDiceAverage(), 12);
        const offCR = CRUtil.getOffensiveCR(this.calcAverageDamagePerRound(), this.state.offenses.attackBonus);

        const average = CRUtil.getAverageCR(this.hitDiceAverage(), 12, this.calcAverageDamagePerRound(), this.state.offenses.attackBonus);

        return (
            <div>{defCR} & {offCR} => {average}</div>
        );
    }
}

// export default connect(mapStateToProps, mapDispatchToProps)(MonsterBuilder);
export default MonsterBuilder;
