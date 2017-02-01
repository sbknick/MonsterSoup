import * as React from 'react';
// import { connect } from 'react-redux';

import Attribute from './Attribute';
import NumberInput from '../common/NumberInput';
import UpDownLinks from '../common/UpDownLinks';

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

const STANDARD_ARMOR: "STANDARD_ARMOR" = "STANDARD_ARMOR";
const NATURAL_ARMOR: "NATURAL_ARMOR" = "NATURAL_ARMOR";
const UNARMORED_DEFENSE: "UNARMORED_DEFENSE" = "UNARMORED_DEFENSE";

interface MonsterStatsState
{
    Attributes: Attributes;
    Defenses: Defenses;
}

const DEFAULT_MONSTER_STATS_STATE: MonsterStatsState = {
    Attributes: {Str: 10, Dex: 10, Con: 10, Int: 10, Wis: 10, Cha: 10,},
    Defenses: {HitDieSize: 8, HitDiceCount: 2, ACFormulaType: STANDARD_ARMOR, BaseAC: 10}
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
                    <fieldset>
                        <legend>Defensive CR</legend>
                        <div className="defensive-cr">
                            <div className="defensive-cr-details">
                                <div>
                                    <h4>Hit Dice <UpDownLinks onUpClicked={e => {console.log("Up Clicked")}} onDownClicked={e => {console.log("Down Clicked")}} /></h4>
                                    <div className="hit-dice-box">
                                        <NumberInput min={1} max={40} value={HitDiceCount} onBlur={this.ModifyHitDiceCount} />
                                        d
                                        <NumberInput min={1} max={12} value={HitDieSize} onBlur={this.ModifyHitDieSize} />
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
                        <UpDownLinks size={2} onUpClicked={e => {console.log("Up Clicked")}} onDownClicked={e => {console.log("Down Clicked")}}  />
                    </fieldset>
                </fieldset>
            </div>
        );
    }
}

export default MonsterBuilder;
