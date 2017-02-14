import * as React from 'react';
// import { connect } from 'react-redux';

import { HighlightOnChange, LabelledItem, NumberInput, SelectList, UpDownLinks } from '../common';
import Attributes from './Attributes';
import HitDice from './HitDice';

interface MonsterStatsProps
{
    monsterName: string,
}

interface Attributes
{
    Str: number;
    Dex: number;
    Con: number;
    Int: number;
    Wis: number;
    Cha: number;
}

interface Defenses
{
    HitDieSize: number;
    HitDiceCount: number;

    ACFormulaType: string;

    BaseAC: number;
}

interface Offenses
{
    PrimaryStat: string;
    PrimarySpellStat: string;
    AttackBonus: number;
    SaveDCBonus: number;
    MultiattackCount: number;
    Attacks: Attack[];
}

interface Attack
{
    Name: string;
    Reach?: number;
    RangeAccurate?: number;
    RangeMax?: number;
    DamageDiceCount?: number;
    DamageDieSize?: number;
    Description: string;
    DamageBonus?: number;
}


const STANDARD_ARMOR: "STANDARD_ARMOR" = "STANDARD_ARMOR";
const NATURAL_ARMOR: "NATURAL_ARMOR" = "NATURAL_ARMOR";
const UNARMORED_DEFENSE: "UNARMORED_DEFENSE" = "UNARMORED_DEFENSE";

interface MonsterStatsState
{
    Attributes: Attributes;
    Defenses: Defenses;
    Offenses: Offenses;
    Proficiency: number;
    isProficiencyChanged: boolean;
}

const ATTRIBUTES: Attributes = {Str: 10, Dex: 10, Con: 10, Int: 10, Wis: 10, Cha: 10};
const DEFENSES: Defenses = {HitDieSize: 8, HitDiceCount: 2, ACFormulaType: STANDARD_ARMOR, BaseAC: 10};
const ATTACKS: Attack[] = [
    {Name: "Bite", Reach: 5, DamageDiceCount: 2, DamageDieSize: 6, DamageBonus: 2, Description: "Nomnomnom."}
];
const OFFENSES: Offenses = {PrimaryStat: "Str", PrimarySpellStat: "Int", AttackBonus: 0, SaveDCBonus: 0, MultiattackCount: 1, Attacks: ATTACKS};


const DEFAULT_MONSTER_STATS_STATE: MonsterStatsState = {
    Attributes: ATTRIBUTES,
    Defenses: DEFENSES,
    Offenses: OFFENSES,
    Proficiency: 2,
    isProficiencyChanged: false,
};

class MonsterBuilder extends React.Component<MonsterStatsProps, MonsterStatsState>
{
    constructor(props: MonsterStatsProps)
    {
        super(props);
        this.state = DEFAULT_MONSTER_STATS_STATE;

        this.ModifyHitDiceCount = this.ModifyHitDiceCount.bind(this);
        this.ModifyHitDieSize = this.ModifyHitDieSize.bind(this);
        this.handleChangeACFormulaType = this.handleChangeACFormulaType.bind(this);
        this.handleChangePrimaryStat = this.handleChangePrimaryStat.bind(this);
        this.handleChangePrimarySpellStat = this.handleChangePrimarySpellStat.bind(this);
    }


    GetMod(attr: string): number
    {
        var value = (this.state.Attributes as any)[attr];
        return this.Mod(value);
    }

    Mod(value: number): number
    {
        var result = Math.floor((value / 2) - 5);
        return result;
    }

    // EffectiveAC(): number
    // {
    //     var ac = this.state.Defenses.BaseAC + this.Mod(this.state.Attributes.Dex);
    //     return ac;
    // }

    HitDiceAverage(): number
    {
        const { HitDieSize, HitDiceCount } = this.state.Defenses;
        const conMod = this.Mod(this.state.Attributes.Con);

        let averageRoll = Math.floor(HitDieSize / 2);

        var sum = (averageRoll + conMod) * HitDiceCount;
        return sum;
    }

    CalcAverageDamagePerRound(): number
    {
        return 12;
    }

    ModifyAttribute(attr: string, value: number)
    {
        // switch(attr)
        // {
        //   // case "Str": return this.setState({Attributes: { Str: Attr.Str + value }});
        //   // case "Str": return this.setState((s: MonsterStatsState, p: any) => ({Attributes: { Str: Attr.Str + value }}));
        //   // case "Dex": return this.setState({Attributes: { Dex: Attr.Dex + value }});
        //   // case "Con": return this.setState({Attributes: { Con: Attr.Con + value }});
        //   // case "Int": return this.setState({Attributes: { Int: Attr.Int + value }});
        //   // case "Wis": return this.setState({Attributes: { Wis: Attr.Wis + value }});
        //   // case "Cha": return this.setState({Attributes: { Cha: Attr.Cha + value }});
        // }

        const Attr = this.state.Attributes as any;
        const newValue = Attr[attr] + value;

        Attr[attr] = Math.min(Math.max(newValue, 1), 40);

        this.setState({Attributes: Attr} as MonsterStatsState);
    }

    SetAttribute(attr: string, value: number)
    {
        const Attr = this.state.Attributes as any;
        Attr[attr] = value;
        this.setState({Attributes: Attr} as MonsterStatsState);
    }

    handleAttributeChange(e: any, attr: string): void
    {
        this.SetAttribute(attr, e.target.value as number);
    }

    handleChange(attr: string): (e: any) => void
    {
        return (e: any) => this.SetAttribute(attr, e.target.value);
    }

    ModifyHitDiceCount(e: any)
    {
        const def = this.state.Defenses;
        def.HitDiceCount = e.target.value;
        this.setState({Defenses: def} as MonsterStatsState);
    }

    ModifyHitDieSize(e: any)
    {
        const def = this.state.Defenses;
        def.HitDieSize = e.target.value;
        this.setState({Defenses: def} as MonsterStatsState);
    }

    handleChangeACFormulaType(e: any)
    {
        const def = this.state.Defenses;
        def.ACFormulaType = e.target.value;
        this.setState({Defenses: def} as MonsterStatsState);
    }

    handleChangePrimaryStat(e: any)
    {
        const off = this.state.Offenses;
        off.PrimaryStat = e.target.value;
        this.setState({Offenses: off} as MonsterStatsState);
    }

    handleChangePrimarySpellStat(e: any)
    {
        const off = this.state.Offenses;
        off.PrimarySpellStat = e.target.value;
        this.setState({Offenses: off} as MonsterStatsState);
    }

    handleModifyProficiency(value: number)
    {
        var newValue = this.state.Proficiency + value;
        newValue = Math.max(2, newValue);
        newValue = Math.min(10, newValue);

        if (newValue != this.state.Proficiency)
            this.setState({Proficiency: newValue, isProficiencyChanged: true} as MonsterStatsState);
    }

    render()
    {
        const { monsterName } = this.props;
        const { HitDieSize, HitDiceCount } = this.state.Defenses;

        const ConMod = this.GetMod("Con");

        // const Attr = this.state.Attributes as any;

        return (
            <div className="monster-stats">
                <fieldset>
                    <legend>{monsterName} Stats</legend>
                    <Attributes />

                    <div className="inline-child-divs">
                        <h4>Proficiency Bonus</h4>
                        <HighlightOnChange Duration={0.5} Value={this.state.Proficiency}>
                            +
                        </HighlightOnChange>
                        <UpDownLinks onUpClicked={e => this.handleModifyProficiency(1)} onDownClicked={e => this.handleModifyProficiency(-1)} />
                    </div>
                    <fieldset className="defensive-cr">
                        <legend>Traits</legend>
                        <div className="add-trait">
                            <a href=""> </a>
                        </div>
                        <div className="container">
                        </div>
                    </fieldset>
                    <fieldset className="defensive-cr">
                        <legend>Defensive CR</legend>
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
                                            <NumberInput min={1} max={40} value={HitDiceCount} onBlur={this.ModifyHitDiceCount} />
                                            d
                                            <NumberInput min={1} max={12} value={HitDieSize} onBlur={this.ModifyHitDieSize} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4>Armor Class</h4>
                                    <div className="armor-formula">
                                        <select value={this.state.Defenses.ACFormulaType} onChange={this.handleChangeACFormulaType}>
                                            <option value={STANDARD_ARMOR}>Standard Armor</option>
                                            <option value={NATURAL_ARMOR}>Natural Armor</option>
                                            <option value={UNARMORED_DEFENSE}>Unarmored Defense</option>
                                        </select>
                                        <br />
                                        <input type="checkbox" /> Include a Shield
                                        <br />
                                        <label>Bonus</label>
                                        <NumberInput value={0} />
                                        {(this.state.Defenses.ACFormulaType == UNARMORED_DEFENSE ?
                                            UNARMORED_DEFENSE
                                        : this.state.Defenses.ACFormulaType == NATURAL_ARMOR ?
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
                                    <span>
                                        {this.HitDiceAverage()} ({HitDiceCount}d{HitDieSize} + {HitDiceCount * ConMod})
                                    </span>
                                </div>
                                <div>
                                    <h4>Effective AC</h4>
                                    <span>14</span>
                                </div>
                            </div>
                            <div className="defensive-cr-outcome">
                                <LabelledItem label="Defensive CR Rating" labelType="h4">
                                    3
                                </LabelledItem>
                                <div>
                                    <h4>AutoScale!</h4>
                                    <UpDownLinks size={2} onUpClicked={e => console.log('up clicked')} onDownClicked={e => console.log('down clicked')} />
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset className="offensive-cr">
                        <legend>Offensive CR</legend>
                        <div className="container">
                            <div className="offensive-cr-primarystats">
                                <LabelledItem label="Primary Attack Stat">
                                    <SelectList options={["Str", "Dex", "Con", "Int", "Wis", "Cha"]}
                                                value={this.state.Offenses.PrimaryStat}
                                                onChange={this.handleChangePrimaryStat}/>
                                </LabelledItem>
                                <LabelledItem label="Primary Spellcasting Stat">
                                    <SelectList options={["Str", "Dex", "Con", "Int", "Wis", "Cha"]}
                                                value={this.state.Offenses.PrimarySpellStat}
                                                onChange={this.handleChangePrimarySpellStat} />
                                </LabelledItem>
                            </div>
                            <div className="offensive-cr-tohit">
                                <LabelledItem label="Attack Bonus" labelType="h4" contentContainer="none">
                                    <LabelledItem label="Calc!">
                                        <div style={{display: "inline-block", textAlign: "center"}}>
                                            Proficiency<br />
                                            <HighlightOnChange Duration={0.5} Value={this.state.Proficiency}>
                                                +
                                            </HighlightOnChange>
                                        </div>
                                        <b>+</b>
                                        <div style={{display: "inline-block", textAlign: "center"}}>
                                            {this.state.Offenses.PrimaryStat}<br />
                                            <HighlightOnChange Duration={0.5} Value={this.GetMod(this.state.Offenses.PrimaryStat)}>
                                                +
                                            </HighlightOnChange>
                                        </div>
                                        <b>=</b>
                                        <div style={{display: "inline-block", textAlign: "center"}}>
                                            Total<br />
                                            <HighlightOnChange Duration={0.5} Value={this.state.Proficiency + this.GetMod(this.state.Offenses.PrimaryStat)}>
                                                +
                                            </HighlightOnChange>
                                        </div>
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
                                                <HighlightOnChange Duration={0.5} Value={this.state.Proficiency}>
                                                    +
                                                </HighlightOnChange>
                                            </div>
                                            <b>+</b>
                                            <div>
                                                <HighlightOnChange Duration={0.5} Value={this.state.Offenses.PrimarySpellStat} />
                                                <br />
                                                <HighlightOnChange Duration={0.5} Value={this.GetMod(this.state.Offenses.PrimarySpellStat)}>
                                                    +
                                                </HighlightOnChange>
                                            </div>
                                            <b>=</b>
                                            <div>
                                                Total<br />
                                                <HighlightOnChange Duration={0.5} Value={this.state.Proficiency + this.GetMod(this.state.Offenses.PrimarySpellStat)}>
                                                    +
                                                </HighlightOnChange>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="offensive-cr-damageperround">
                                <h4>Damage Per Round</h4>
                                <LabelledItem label="Average DPR">
                                    {this.CalcAverageDamagePerRound()}
                                </LabelledItem>
                            </div>
                        </div>
                    </fieldset>
                </fieldset>
            </div>
        );
    }
}

export default MonsterBuilder;