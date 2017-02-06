import * as React from 'react';
// import { connect } from 'react-redux';

import { Attribute } from '.';
import { HighlightOnChange, NumberInput, UpDownLinks } from '../common';

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

        this.ModifyAttribute = this.ModifyAttribute.bind(this);
        this.SetAttribute = this.SetAttribute.bind(this);
        this.handleAttributeChange = this.handleAttributeChange.bind(this);
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

    EffectiveAC(): number
    {
        var ac = this.state.Defenses.BaseAC + this.Mod(this.state.Attributes.Dex);
        return ac;
    }

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
        const { Str, Dex, Con, Int, Wis, Cha } = this.state.Attributes;
        const { HitDieSize, HitDiceCount } = this.state.Defenses;

        const ConMod = this.Mod(Con);

        const Attr = this.state.Attributes as any;

        let keys = Object.keys(Attr);
        let attributes = Object.keys(Attr).map(key =>
            <Attribute key={key} label={key} value={Attr[key]} modifyAttribute={this.ModifyAttribute} setAttribute={this.SetAttribute} />
        );

        return (
            <div className="monster-stats">
                <fieldset>
                    <legend>{monsterName} Stats</legend>
                    {/* <div>
                        //   <h4>Attributes</h4>
                        //
                        //   <Attribute label="Str" value={Str} modifyAttribute={this.ModifyAttribute} />
                        //   <Attribute label="Dex" value={Dex} modifyAttribute={this.ModifyAttribute} />
                        //   <Attribute label="Con" value={Con} modifyAttribute={this.ModifyAttribute} />
                        //   <Attribute label="Int" value={Int} modifyAttribute={this.ModifyAttribute} />
                        //   <Attribute label="Wis" value={Wis} modifyAttribute={this.ModifyAttribute} />
                        //   <Attribute label="Cha" value={Cha} modifyAttribute={this.ModifyAttribute} />
                        //
                        // </div>
                    */}
                    {/*<div>
                            <h4>Attributes</h4>
                            {Object.keys(this.state).map(key =>
                            <Attribute label={key} value={this.state[key]} modifyAttribute={this.ModifyAttribute} />
                        )}
                        </div>
                    */}
                    <div>
                        <h4>Attributes</h4>
                        {attributes}
                    </div>
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
                                <div>
                                    <h4>Defensive CR Rating</h4>
                                    <span>3</span>
                                </div>
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
                                <div>
                                    <label>Primary Attack Stat</label>
                                    <span>
                                        <select value={this.state.Offenses.PrimaryStat} onChange={this.handleChangePrimaryStat}>
                                            <option value={"Str"}>Str</option>
                                            <option value={"Dex"}>Dex</option>
                                            <option value={"Con"}>Con</option>
                                            <option value={"Int"}>Int</option>
                                            <option value={"Wis"}>Wis</option>
                                            <option value={"Cha"}>Cha</option>
                                        </select>
                                    </span>
                                </div>
                                <div>
                                    <label>Primary Spellcasting Stat</label>
                                    <span>
                                        <select value={this.state.Offenses.PrimarySpellStat} onChange={this.handleChangePrimarySpellStat}>
                                            <option value={"Str"}>Str</option>
                                            <option value={"Dex"}>Dex</option>
                                            <option value={"Con"}>Con</option>
                                            <option value={"Int"}>Int</option>
                                            <option value={"Wis"}>Wis</option>
                                            <option value={"Cha"}>Cha</option>
                                        </select>
                                    </span>
                                </div>
                            </div>
                            <div className="offensive-cr-tohit">
                                <div>
                                    <h4>Attack Bonus</h4>
                                    <span>
                                        <label>Calc!</label>
                                        <div>
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
                                        </div>
                                    </span>
                                </div>
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
                                <div>
                                    <label>Average DPR</label>
                                    <div>{this.CalcAverageDamagePerRound()}</div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </fieldset>
            </div>
        );
    }
}

export default MonsterBuilder;
