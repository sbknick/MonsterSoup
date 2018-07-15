import * as React from "react";
import { connect } from "react-redux";

import * as CRUtil from "src/util/CRUtil";
// import { mod, modBonus } from "src/util/Mod";

import { Fieldset, FieldsetConfigData, HighlightBonusOnChange, HighlightOnChange, LabelledItem,
         NumberInput, SelectList,
        //  UpDownLinks
    } from "src/components/common";
import Attributes from "./Attributes";
import Defenses from "./Defenses";
import Offenses from "./Offenses";
import Proficiency from "./Proficiency";
import Saves from "./Saves";
import Traits from "./Traits";
// import TraitSplat from "./TraitSplat";

// import { AttributesState } from "types/monsterBuilder";
import * as UIActions from "src/rdx/actions/ui.actions";
import { GlobalState } from "src/rdx/reducers";

interface MonsterStatsProps
{
    monsterName: string;
    // fieldsetDecollapsed: {[key: string]: boolean};

    isFieldsetCollapse: (key: string) => boolean;
    toggleFieldsetCollapse: (key: string) => () => void;
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
    }

    public createFieldsetCollapseData: (key: string) => FieldsetConfigData = (key: string) =>
    ({
        legend: key,
        isCollapsed: this.props.isFieldsetCollapse(key),
        toggleCollapse: this.props.toggleFieldsetCollapse(key),
    })

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

                    <Fieldset
                        config={this.createFieldsetCollapseData("Traits")}
                        className="defensive-cr"
                        displayOnCollapse={"(1)"}
                    >
                        <Traits />
                    </Fieldset>
                    <Fieldset
                        config={this.createFieldsetCollapseData("Defensive CR")}
                        className="defensive-cr"
                        displayOnCollapse={this.DefensiveCRSummary()}
                    >
                        <Defenses />
                    </Fieldset>
                    <Fieldset
                        config={this.createFieldsetCollapseData("Offensive CR")}
                        className="offensive-cr"
                        displayOnCollapse={this.OffensiveCRSummary()}
                    >
                        <Offenses />
                    </Fieldset>

                    <Fieldset
                        config={this.createFieldsetCollapseData("Offensive CR Old")}
                        className="offensive-cr"
                        displayOnCollapse={this.OffensiveCRSummary()}
                    >
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
                                            <HighlightBonusOnChange
                                                value={this.GetMod(this.state.offenses.primaryStat)} />
                                        </div>
                                        <b>=</b>
                                        <div style={{display: "inline-block", textAlign: "center"}}>
                                            Total<br />
                                            <HighlightBonusOnChange
                                                value={this.state.proficiency + this.GetMod(this.state.offenses.primaryStat)} // tslint:disable-line
                                                />
                                        </div>
                                    </LabelledItem>
                                    <br />
                                    <LabelledItem label="Expected CR Range for Effective AD">
                                        {JSON.stringify(
                                            CRUtil.getCRRangeForAB(
                                                this.state.proficiency + this.GetMod(this.state.offenses.primaryStat),
                                            ),
                                        )}
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
                                                <HighlightBonusOnChange
                                                    value={this.GetMod(this.state.offenses.primarySpellStat)} />
                                            </div>
                                            <b>=</b>
                                            <div>
                                                Total<br />
                                                <HighlightBonusOnChange
                                                    value={this.state.proficiency + this.GetMod(this.state.offenses.primarySpellStat)} // tslint:disable-line
                                                    />
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <LabelledItem label="Expected CR Range for Effective Save DC">
                                        {JSON.stringify(
                                            CRUtil.getCRRangeForAB(
                                                this.state.proficiency + this.GetMod(this.state.offenses.primarySpellStat),  // tslint:disable-line
                                            ),
                                        )}
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
                                             onChange={console.log}
                                                //  e => {
                                                //  console.log(e); }
                                                //  /* this.setTempAverageDPR(e.target.value)*/
                                                //  }
                                             />
                            </div>
                            <div>
                                <h4>Offensive CR</h4>
                                <LabelledItem label="Expected CR from DPR">
                                    {CRUtil.getCRForDPR(this.calcAverageDamagePerRound())}
                                </LabelledItem>
                                <br />
                                <LabelledItem label="Expected Attack Bonus / Save DC for Expected CR">
                                    <LabelledItem label="Attack Bonus">
                                        {CRUtil.getExpectedABForCR(
                                            CRUtil.getCRForDPR(this.calcAverageDamagePerRound()),
                                        )}
                                    </LabelledItem>
                                    <br />
                                    <LabelledItem label="Save DC">
                                        {CRUtil.getExpectedDCForCR(
                                            CRUtil.getCRForDPR(this.calcAverageDamagePerRound()),
                                        )}
                                    </LabelledItem>
                                </LabelledItem>
                            </div>
                        </div>
                    </Fieldset>
                    <Fieldset
                        config={this.createFieldsetCollapseData("Total CR")}
                        displayOnCollapse={this.TotalCRSummary()}
                    >
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
        console.log(attr);
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

    // private handleChange(attr: string): (e: any) => void
    // {
    //     return e => {; };
    //     // return (e: any) => this.SetAttribute(attr, e.target.value);
    // }

    // private modifyHitDiceCount = (e: any) =>
    // {
    //     console.log(e);
    //     // const def = this.state.Defenses;
    //     // def.hitDiceCount = e.target.value;
    //     // this.setState({defenses: def} as MonsterStatsState);
    // }

    // private  modifyHitDieSize = (e: any) =>
    // {
    //     console.log(e);
    //     // const def = this.state.Defenses;
    //     // def.hitDieSize = e.target.value;
    //     // this.setState({defenses: def} as MonsterStatsState);
    // }

    // private handleChangeACFormulaType = (e: any) =>
    // {
    //     console.log(e);
    //     // const def = this.state.Defenses;
    //     // def.ACFormulaType = e.target.value;
    //     // this.setState({defenses: def} as MonsterStatsState);
    // }

    private handleChangePrimaryStat = (e: any) =>
    {
        console.log(e);
        // const off = this.state.Offenses;
        // off.primaryStat = e.target.value;
        // this.setState({offenses: off} as MonsterStatsState);
    }

    private handleChangePrimarySpellStat = (e: any) =>
    {
        console.log(e);
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

        const average = CRUtil.getAverageCR(
            this.hitDiceAverage(),
            12,
            this.calcAverageDamagePerRound(),
            this.state.offenses.attackBonus,
        );

        return (
            <div>{defCR} & {offCR} => {average}</div>
        );
    }
}

function mapStateToProps(state: GlobalState): MonsterStatsProps
{
    // tslint:disable-next-line:no-object-literal-type-assertion
    return {
        monsterName: "Test Monstah",
        // fieldsetDecollapsed: state.ui.fieldset.decollapsed,
        isFieldsetCollapse: (key) => !state.ui.fieldset.decollapsed[key],
    } as MonsterStatsProps;
}

function mapDispatchToProps(dispatch: any): MonsterStatsProps
{
    // tslint:disable-next-line:no-object-literal-type-assertion
    return {
        toggleFieldsetCollapse: (key: string) => () => dispatch(UIActions.toggleFieldsetCollapse(key)),
    } as MonsterStatsProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(MonsterBuilder);
