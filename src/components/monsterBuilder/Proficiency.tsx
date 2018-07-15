import * as React from "react";
import { connect } from "react-redux";

import * as Actions from "src/rdx/actions/monsterBuilder/proficiency.actions";
import { getMonsterBuilderData, GlobalState } from "src/rdx/reducers";
import * as CRUtil from "src/util/CRUtil";

import { HighlightBonusOnChange, LabelledItem, UpDownLinks } from "src/components/common";

const Proficiency: React.StatelessComponent<Props> = (props: Props) =>
{
    const handleModifyProciency = (amount: number) => () => props.modifyProficiency(amount);

    return (
        <LabelledItem label="Proficiency Bonus" labelType="h4" className="inline-child-divs">
            <HighlightBonusOnChange value={props.proficiency} />
            <UpDownLinks onUpClicked={handleModifyProciency(1)}
                        onDownClicked={handleModifyProciency(-1)} />
            <span style={{marginLeft: "20px"}}>Expected CR Range: {
                [CRUtil.getCRRangeForProficiency(props.proficiency)].map(r => r.Low + "-" + r.High)
            }</span>
        </LabelledItem>
    );
};

interface Props
{
    proficiency: number;

    modifyProficiency: (v: number) => void;
}

function mapStateToProps(state: GlobalState): Props
{
    // tslint:disable-next-line:no-object-literal-type-assertion
    return {
        proficiency: getMonsterBuilderData(state).proficiency.proficiencyBonus,
    } as Props;
}

function mapDispatchToProps(dispatch: any): Props
{
    // tslint:disable-next-line:no-object-literal-type-assertion
    return {
        modifyProficiency: (v) => dispatch(Actions.modifyProficiency(v)),
    } as Props;
}

export default connect(mapStateToProps, mapDispatchToProps)(Proficiency);
