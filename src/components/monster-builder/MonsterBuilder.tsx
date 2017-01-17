import * as React from 'react';
// import { connect } from 'react-redux';

import Attribute from './Attribute';

interface MonsterStatsProps
{
    monsterName: string,
}

interface MonsterStatsState
{
  Str: number,
  Dex: number,
  Con: number,
  Int: number,
  Wis: number,
  Cha: number,
}

const DEFAULT_MONSTER_STATS_STATE: MonsterStatsState = {
  Str: 10, Dex: 10, Con: 10, Int: 10, Wis: 10, Cha: 10,
  // Attributes: {Str: 10, Dex: 10, Con: 10, Int: 10, Wis: 10, Cha: 10,},
};

class MonsterBuilder extends React.Component<MonsterStatsProps, any>
{
  constructor(props: MonsterStatsProps) {
    super(props);
    this.state = DEFAULT_MONSTER_STATS_STATE;

    this.ModifyAttribute = this.ModifyAttribute.bind(this);
  }

  Mod(value: number): string | number
  {
    var result = Math.floor((value / 2) - 5);
    return result < 0 ? result : "+" + result;
  }

  ModifyAttribute(attr: string, value: number)
  {
    switch(attr)
    {
      case "Str": return this.setState({ Str: this.state.Str + value });
      case "Dex": return this.setState({ Dex: this.state.Dex + value });
      case "Con": return this.setState({ Con: this.state.Con + value });
      case "Int": return this.setState({ Int: this.state.Int + value });
      case "Wis": return this.setState({ Wis: this.state.Wis + value });
      case "Cha": return this.setState({ Cha: this.state.Cha + value });
    }
  }

  render() {
    const { monsterName } = this.props;
    const { Str, Dex, Con, Int, Wis, Cha } = this.state as MonsterStatsState;

    let attributes = Object.keys(this.state).map(key =>
      <Attribute label={key} value={this.state[key]} modifyAttribute={this.ModifyAttribute} />
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
            </div>
            <div>
              <label>Defensive CR</label>
            </div>
        </fieldset>
      </div>
    )
  }
}

export default MonsterBuilder;
