import * as React from 'react';
import { connect } from 'react-redux';

import { GlobalState, getMonsterBuilderData } from '../../redux/reducers';
import * as Actions from '../../redux/actions/monsterBuilder/proficiency.actions';
import * as CRUtil from '../../util/CRUtil';

import { HighlightBonusOnChange, LabelledItem, UpDownLinks } from '../common';

const Proficiency: React.StatelessComponent<Props> = (props: Props) =>
(
    <LabelledItem label="Proficiency Bonus" labelType="h4" className="inline-child-divs">
        <HighlightBonusOnChange value={props.proficiency} />
        <UpDownLinks onUpClicked={() => props.modifyProficiency(1)}
                     onDownClicked={() => props.modifyProficiency(-1)} />
        <span style={{marginLeft: "20px"}}>Expected CR Range: {[CRUtil.getCRRangeForProficiency(props.proficiency)].map(r => r.Low + "-" + r.High)}</span>
    </LabelledItem>
);

interface Props
{
    proficiency: number;

    modifyProficiency: (v: number) => void;
}

function mapStateToProps(state: GlobalState) : Props
{
    return {
        proficiency: getMonsterBuilderData(state).proficiency.proficiencyBonus
    } as Props;
}

function mapDispatchToProps(dispatch : any) : Props
{
    return {
        modifyProficiency: (v) => dispatch(Actions.modifyProficiency(v))
    } as Props;
}

export default connect(mapStateToProps, mapDispatchToProps)(Proficiency);
