import * as React from 'react';
import { connect } from 'react-redux';

interface ArmorProps
{
  isMetal: boolean,
  isArmor: boolean,
  usesShield: boolean,
  armorName: string,
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


export class Armor extends React.Component<ArmorProps, {}>
{
  constructor(props: ArmorProps)
  {
    super(props);
    // fetch()
  }

  render() {
    const { isMetal, isArmor, armorName, usesShield } = this.props;

    let armorString = usesShield ? armorName + ", shield" : armorName;

    return (
      <div className="armor">
        <h4>Armor</h4>

        <label>AC</label>
        <span>12 ({armorString})</span>
      </div>
    );
  }
}
