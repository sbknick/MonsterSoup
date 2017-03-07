import * as React from 'react';
import { connect } from 'react-redux';

import { Fieldset, HighlightBonusOnChange, HighlightOnChange, LabelledItem, NumberInput, SelectList, UpDownLinks } from '../common';

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

const STANDARD_ARMOR: "STANDARD_ARMOR" = "STANDARD_ARMOR";
const NATURAL_ARMOR: "NATURAL_ARMOR" = "NATURAL_ARMOR";
const UNARMORED_DEFENSE: "UNARMORED_DEFENSE" = "UNARMORED_DEFENSE";


class Armor extends React.Component<ArmorProps, {}>
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
        <div className="armor-formula">
            <select onChange={() => {}}>
                <option value={STANDARD_ARMOR}>Standard Armor</option>
                <option value={NATURAL_ARMOR}>Natural Armor</option>
                <option value={UNARMORED_DEFENSE}>Unarmored Defense</option>
            </select>
            <br />
            <input type="checkbox" /> Include a Shield
            <br />
            <label>Bonus</label>
            <NumberInput value={0} />
            {/*(this.state.defenses.ACFormulaType == UNARMORED_DEFENSE ?
                UNARMORED_DEFENSE
            : this.state.defenses.ACFormulaType == NATURAL_ARMOR ?
                NATURAL_ARMOR
            : STANDARD_ARMOR)*/}
        </div>
    );
  }
}

function mapStateToProps(state: any)
{
    return {};
}

export default connect(mapStateToProps)(Armor);
