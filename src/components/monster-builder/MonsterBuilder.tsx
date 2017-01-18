import * as React from 'react';
// import { connect } from 'react-redux';

import Attribute from './Attribute';
import NumberInput from '../common/NumberInput';

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

interface MonsterStatsState
{
  Str: number;
  Dex: number;
  Con: number;
  Int: number;
  Wis: number;
  Cha: number;
  Attributes: Attributes;
}

const DEFAULT_MONSTER_STATS_STATE: MonsterStatsState = {
  Str: 10, Dex: 10, Con: 10, Int: 10, Wis: 10, Cha: 10,
  Attributes: {Str: 10, Dex: 10, Con: 10, Int: 10, Wis: 10, Cha: 10,},
};

class MonsterBuilder extends React.Component<MonsterStatsProps, MonsterStatsState>
{
  constructor(props: MonsterStatsProps) {
    super(props);
    this.state = DEFAULT_MONSTER_STATS_STATE;

    this.ModifyAttribute = this.ModifyAttribute.bind(this);
    this.SetAttribute = this.SetAttribute.bind(this);
  }

  Mod(value: number): string | number
  {
    var result = Math.floor((value / 2) - 5);
    return result < 0 ? result : "+" + result;
  }

  ModifyAttribute(attr: string, value: number)
  {
    const Attr = this.state.Attributes as any;
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
    let newValue = Attr[attr] + value;

    Attr[attr] = Math.min(Math.max(newValue, 1), 40);

    this.setState({Attributes: Attr} as MonsterStatsState);

    this.setState({Str: value} as MonsterStatsState)
  }

  SetAttribute(attr: string, value: number)
  {
    const Attr = this.state.Attributes as any;

    Attr[attr] = value;
    this.setState({Attributes: Attr} as MonsterStatsState);
  }

  render() {
    const { monsterName } = this.props;
    const { Str, Dex, Con, Int, Wis, Cha } = (this.state as MonsterStatsState).Attributes;
    const Attr = this.state.Attributes as any;

    let attributes = Object.keys(Attr).map(key =>
      <Attribute label={key} value={Attr[key]} modifyAttribute={this.ModifyAttribute} setAttribute={this.SetAttribute} />
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
            // </div> */}
            {/*<div>
              <h4>Attributes</h4>
              {Object.keys(this.state).map(key =>
                  <Attribute label={key} value={this.state[key]} modifyAttribute={this.ModifyAttribute} />
                )}
            </div>*/}
            <div>
              <h4>Attributes</h4>
              {attributes}
            </div>
            <div>
              <h4>Hit Dice</h4>
              {this.state.Str}
            </div>
            <div>
              <label>Defensive CR</label>

              <NumberInput value={Str} />
            </div>
        </fieldset>
      </div>
    )
  }
}

export default MonsterBuilder;
