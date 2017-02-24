import * as React from 'react';
import { connect } from 'react-redux';

import { GlobalState, getMonsterBuilderData } from '../../redux/reducers';

const Proficiency: React.StatelessComponent<Props> = (props: Props) =>
(
    <div>
    </div>
);

interface Props
{
    proficiency: number;
}

function mapStateToProps(state: GlobalState)
{
    return {
        proficiency: getMonsterBuilderData(state).proficiency.ProficiencyBonus
    };
}

export default connect(mapStateToProps)(Proficiency);
