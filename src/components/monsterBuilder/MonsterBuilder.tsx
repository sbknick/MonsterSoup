import * as React from 'react';
// import { connect } from 'react-redux';

import * as CRUtil from '../../util/CRUtil';
import { mod, modBonus } from '../../util/Mod';
import { Fieldset, HighlightBonusOnChange, HighlightOnChange, LabelledItem, NumberInput, SelectList, UpDownLinks } from '../common';
import Attributes from './Attributes';
// import HitDice from './HitDice';
import Proficiency from './Proficiency';
import Traits from './Traits';
import TraitSplat from './TraitSplat';

import { State as AttributesSet } from '../../redux/reducers/monsterBuilder/attributes.reducer'
import { Trait } from '../../redux/reducers/traits.reducer';

interface MonsterStatsProps
{
    monsterName: string,
}

interface Defenses
{
    hitDieSize: number;
    hitDiceCount: number;

    ACFormulaType: string;

    baseAC: number;

    tempAC: number;
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
    // attributes: AttributesSet;
    defenses: Defenses;
    offenses: Offenses;
    proficiency: number;

    isProficiencyChanged: boolean;
}

// const ATTRIBUTES: AttributesSet = { Str: 10, Dex: 10, Con: 10, Int: 10, Wis: 10, Cha: 10 };
const DEFENSES: Defenses = {hitDieSize: 8, hitDiceCount: 2, ACFormulaType: STANDARD_ARMOR, baseAC: 10, tempAC: 14};
const ATTACKS: Attack[] = [
    {name: "Bite", reach: 5, damageDiceCount: 2, damageDieSize: 6, damageBonus: 2, description: "Nomnomnom."}
];
const OFFENSES: Offenses = {primaryStat: "Str", primarySpellStat: "Int", attackBonus: 6, saveDCBonus: 0, multiattackCount: 1, attacks: ATTACKS, averageDPR: 12};


const DEFAULT_MONSTER_STATS_STATE: MonsterStatsState = {
    // attributes: ATTRIBUTES,
    defenses: DEFENSES,
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
        this.setTempAC = this.setTempAC.bind(this);
        this.setTempAverageDPR = this.setTempAverageDPR.bind(this);
    }

    private GetMod(attr: string): number
    {
        return 0;
        // var value = (this.state.attributes as any)[attr];
        // return mod(value);
    }

    // EffectiveAC(): number
    // {
    //     var ac = this.state.Defenses.BaseAC + this.Mod(this.state.Attributes.Dex);
    //     return ac;
    // }

    private hitDiceAverage(): number
    {
        const { hitDieSize, hitDiceCount } = this.state.defenses;
        const conMod = 0; // mod(this.state.attributes.Con);

        let averageRoll = Math.floor(hitDieSize / 2);

        var sum = (averageRoll + conMod) * hitDiceCount;
        return sum;
    }

    private calcAverageDamagePerRound(): number
    {
        return this.state.offenses.averageDPR;
    }

    private handleAttributeChange(e: any, attr: string): void
    {
        // this.setAttribute(attr, e.target.value as number);
    }

    private handleChange(attr: string): (e: any) => void
    {
        return e => {};
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

    private handleModifyProficiency(value: number)
    {
        // var newValue = this.state.Proficiency + value;
        // newValue = Math.max(2, newValue);
        // newValue = Math.min(10, newValue);
        //
        // if (newValue != this.state.Proficiency)
        //     this.setState({proficiency: newValue, isProficiencyChanged: true} as MonsterStatsState);
    }

    private setTempAC(value: number)
    {
        // let def = this.state.Defenses;
        // def.tempAC = value;
        // this.setState({defenses: def} as MonsterStatsState);
    }

    private setTempAverageDPR(value: number)
    {
        // let off = this.state.Offenses;
        // off.averageDPR = value;
        // this.setState({offenses: off} as MonsterStatsState);
    }

    render()
    {
        const { monsterName } = this.props;
        const { hitDieSize, hitDiceCount } = this.state.defenses;

        const conMod = this.GetMod("Con");

        return (
            <div className="monster-stats">
                <fieldset>
                    <legend>{monsterName} Stats</legend>

                    <Attributes />
                    {/* <HitDice /> */}
                    <div className="inline-child-divs">
                        <h4>Proficiency Bonus</h4>
                        <Proficiency />
                        <HighlightBonusOnChange value={this.state.proficiency} />
                        <UpDownLinks onUpClicked={e => this.handleModifyProficiency(1)} onDownClicked={e => this.handleModifyProficiency(-1)} />
                    </div>
                    <fieldset className="saving-throws">
                        <legend>Saving Throws</legend>
                        <div className="inline-child-divs">
                            <LabelledItem label="Str">
                                <input type="checkbox" />
                                <div>{this.GetMod("Str")}</div>
                            </LabelledItem>
                            <LabelledItem label="Dex">
                                <input type="checkbox" />
                                <div>{this.GetMod("Dex")}</div>
                            </LabelledItem>
                            <LabelledItem label="Con">
                                <input type="checkbox" />
                                <div>{this.GetMod("Con")}</div>
                            </LabelledItem>
                            <LabelledItem label="Int">
                                <input type="checkbox" />
                                <div>{this.GetMod("Int")}</div>
                            </LabelledItem>
                            <LabelledItem label="Wis">
                                <input type="checkbox" />
                                <div>{this.GetMod("Wis")}</div>
                            </LabelledItem>
                            <LabelledItem label="Cha">
                                <input type="checkbox" />
                                <div>{this.GetMod("Cha")}</div>
                            </LabelledItem>
                        </div>
                    </fieldset>
                    <Fieldset legend="Traits" className="defensive-cr" displayOnCollapse={"(1)"}>
                        <Traits />
                    </Fieldset>
                    <Fieldset legend="Defensive CR" className="defensive-cr" displayOnCollapse={this.DefensiveCRSummary()}>
                        <div className="container">
                            <div className="defensive-cr-details">
                                <div>
                                    <h4>Hit Dice <UpDownLinks onUpClicked={e => {console.log("Up Clicked")}} onDownClicked={e => {console.log("Down Clicked")}} /></h4>
                                    <div>
                                        <label title="The monster's Size will determine the default size of the hit die">Size</label>
                                        <select defaultValue="Medium d8">
                                            <option>Tiny d4</option>
                                            <option>Small d6</option>
                                            <option>Medium d8</option>
                                            <option>Large d10</option>
                                            <option>Huge d12</option>
                                            <option>Gargantuan d20</option>
                                        </select>
                                        <div className="hit-dice-box">
                                            <NumberInput min={1} max={40} value={hitDiceCount} onBlur={this.modifyHitDiceCount} />
                                            d
                                            <NumberInput min={1} max={20} value={hitDieSize} onBlur={this.modifyHitDieSize} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4>Armor Class</h4>
                                    <div className="armor-formula">
                                        <select value={this.state.defenses.ACFormulaType} onChange={this.handleChangeACFormulaType}>
                                            <option value={STANDARD_ARMOR}>Standard Armor</option>
                                            <option value={NATURAL_ARMOR}>Natural Armor</option>
                                            <option value={UNARMORED_DEFENSE}>Unarmored Defense</option>
                                        </select>
                                        <br />
                                        <input type="checkbox" /> Include a Shield
                                        <br />
                                        <label>Bonus</label>
                                        <NumberInput value={0} />
                                        {(this.state.defenses.ACFormulaType == UNARMORED_DEFENSE ?
                                            UNARMORED_DEFENSE
                                        : this.state.defenses.ACFormulaType == NATURAL_ARMOR ?
                                            NATURAL_ARMOR
                                        : STANDARD_ARMOR)}
                                    </div>
                                    <div>
                                        <label>AC</label>
                                        <span>12</span>
                                    </div>
                                </div>
                            </div>
                            <div className="defensive-cr-calculations">
                                <div>
                                    <h4>HP Average</h4>
                                    <div>
                                        <div>{this.hitDiceAverage()} ({hitDiceCount}d{hitDieSize} + {hitDiceCount * conMod})</div>
                                        <LabelledItem label="CR for Average HP">
                                            {CRUtil.getCRForHP(this.hitDiceAverage())}
                                        </LabelledItem>
                                        <LabelledItem label="Expected AC for Average HP">
                                            {CRUtil.getExpectedACForCR(CRUtil.getCRForHP(this.hitDiceAverage()))}
                                        </LabelledItem>
                                    </div>
                                </div>
                                <div>
                                    <h4>Effective AC</h4>
                                    <NumberInput value={this.state.defenses.tempAC} onChange={e => this.setTempAC(e.target.value)} />
                                    <LabelledItem label="CR Range for Effective AC">
                                        {JSON.stringify(CRUtil.getCRRangeForAC(this.state.defenses.tempAC))}
                                    </LabelledItem>
                                </div>
                            </div>
                            <div className="defensive-cr-outcome">
                                <LabelledItem label="Defensive CR Rating" labelType="h4">
                                    {CRUtil.getDefensiveCR(this.hitDiceAverage(), this.state.defenses.tempAC)}
                                </LabelledItem>
                                <div>
                                    <h4>AutoScale!</h4>
                                    <UpDownLinks size={2} onUpClicked={e => console.log('up clicked')} onDownClicked={e => console.log('down clicked')} />
                                </div>
                            </div>
                        </div>
                    </Fieldset>
                    <Fieldset legend="Offensive CR" className="offensive-cr" displayOnCollapse={this.OffensiveCRSummary()}>
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
                                <NumberInput value={this.state.offenses.averageDPR} onChange={e => this.setTempAverageDPR(e.target.value)} />
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
                </fieldset>
            </div>
        );
    }

    EffectiveACBoostFromTraits() : number
    {
        var effectiveACModifier = 0;
        // this.state.Traits.reduce((acc, tr) =>
        // {
        //     if (tr.EffectiveACModifier != null)
        //         acc += tr.EffectiveACModifier;
        //     return acc;
        // }, effectiveACModifier);
        return effectiveACModifier;
    }

    DefensiveCRSummary()
    {
        var effectiveACModifier = this.EffectiveACBoostFromTraits();

        return (
            <div style={{fontSize: ".8em"}}>
                <i>  -HP:</i> <b>{this.hitDiceAverage()}</b> (CR {CRUtil.getCRForHP(this.hitDiceAverage())})
                <i>  -AC:</i> <b>{this.state.defenses.tempAC}</b>
                {effectiveACModifier != 0 && ("+" + effectiveACModifier + " Effective from Traits")}
                <i>  -CR:</i> <b>{CRUtil.getDefensiveCR(this.hitDiceAverage(), this.state.defenses.tempAC)}</b>
                {

                }
            </div>
        );
    }

    EffectiveABBoostFromTraits() : number
    {
        var effectiveABModifier = 0;
        // this.state.Traits.reduce((acc, tr) =>
        // {
        //     if (tr.EffectiveABModifier != null)
        //         acc += tr.EffectiveABModifier;
        //     return acc;
        // }, effectiveABModifier);
        return effectiveABModifier;
    }

    OffensiveCRSummary()
    {
        var effectiveABModifier = this.EffectiveABBoostFromTraits();

        return (
            <div style={{fontSize: ".8em"}}>
                <i>  -DPR:</i> <b>{this.calcAverageDamagePerRound()}</b> (CR {CRUtil.getCRForDPR(this.calcAverageDamagePerRound())})
                <i>  -AB:</i> <b>{this.state.offenses.attackBonus}</b>
                {effectiveABModifier != 0 && ("+" + effectiveABModifier + " Effective from Traits")}
                <i>  -CR:</i> <b>{CRUtil.getOffensiveCR(this.calcAverageDamagePerRound(), this.state.offenses.attackBonus)}</b>
                {

                }
            </div>
        );
    }

    TotalCRSummary()
    {
        var offCR = CRUtil.getOffensiveCR(this.calcAverageDamagePerRound(), this.state.offenses.attackBonus);
        var defCR = CRUtil.getDefensiveCR(this.hitDiceAverage(), this.state.defenses.tempAC);

        var average = CRUtil.getAverageCR(this.hitDiceAverage(), this.state.defenses.tempAC, this.calcAverageDamagePerRound(), this.state.offenses.attackBonus);

        return (
            <div>{defCR} & {offCR} => {average}</div>
        );
    }
}

// export default connect(mapStateToProps, mapDispatchToProps)(MonsterBuilder);
export default MonsterBuilder;
