import * as React from 'react';
import { connect } from 'react-redux';

interface ArmorProps
{
  IsMetal: boolean,
  IsArmor: boolean,
  UsesShield: boolean,
  ArmorName: string,
}

interface ArmorOption
{
  name: string,
  value: number,
  dexCap?: number,
  disadvantageOnStealth: boolean
}
const ArmorOptions: ArmorOption[] = [
  {
    name: "Leather",
    value: 1,
    disadvantageOnStealth: false
  },
  {
    name: "StuddedLeather",
    value: 2,
    disadvantageOnStealth: false
  }
];


class Armor extends React.Component<ArmorProps, {}>
{
  constructor(props: ArmorProps)
  {
    super(props);
    // fetch()
  }

  render() {
    const { IsMetal, IsArmor, ArmorName, UsesShield } = this.props;

    let armorString = UsesShield ? ArmorName + ", shield" : ArmorName;

    return (
      <div className="armor">
        <h4>Armor</h4>

        <label>AC</label>
        <span>12 ({armorString})</span>
      </div>
    );
  }
}
