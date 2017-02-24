import * as React from 'react';
import { connect } from 'react-redux';

import { GlobalState, getAllTraits, getAppliedTraitIds } from '../../reducers';
import { MonsterBuilderState, getTraitArgs } from '../../redux/reducers/monsterBuilder';
import { Trait } from '../../redux/reducers/traits.reducer';
import * as Actions from '../../redux/actions/monsterBuilder/traits.actions';

import TraitSplat from './TraitSplat';


class Traits extends React.Component<Props, {selectedTraitId: number}>
{
    constructor(props: Props)
    {
        super(props);

        this.state = {selectedTraitId: 0};

        this.SetSelectedTraitId = this.SetSelectedTraitId.bind(this);
    }

    SetSelectedTraitId(id: number)
    {
        this.setState({selectedTraitId: id});
    }

    render()
    {
        var traitSplats = this.props.AppliedTraits.map(t =>
            <TraitSplat key={t.Id}
                        monster={this.props.Monster}
                        trait={t}
                        traitArgs={getTraitArgs(this.props.Monster, t)}
                        onRemoveClicked={this.props.RemoveTrait} />
        );

        var traitOptions = this.props.AvailableTraits.map(t => <option key={t.Id} value={t.Id} title={t.Desc}>{t.Name}</option>);

        return (
            <div>
                {traitSplats}
                <div>
                    <select value={this.state.selectedTraitId} onChange={(e: any) => this.SetSelectedTraitId(Number(e.target.value))}>
                        <option disabled value={0}> -- select an option -- </option>
                        {traitOptions}
                    </select>
                    <button onClick={() => this.props.ApplyTrait(this.state.selectedTraitId)}>Add Trait</button>
                </div>
            </div>
        );
    }
}

interface Props
{
    AllTraits: Trait[];
    AvailableTraits: Trait[];
    AppliedTraits: Trait[];
    Monster: MonsterBuilderState;

    ApplyTrait?: (id: number) => void;
    RemoveTrait: (t: Trait) => void;
}

function mapStateToProps(state: GlobalState) : Props
{
    var props: Props = {
        AllTraits: [],
        AvailableTraits: [],
        AppliedTraits: []
    } as Props;

    props.Monster = state.otherRootReducer.entities.monsterBuilder;

    var allTraits = getAllTraits(state);
    var myTraitIds = getAppliedTraitIds(state);

    allTraits.reduce((acc, tr) =>
    {
        if (myTraitIds.indexOf(tr.Id) != -1)
            acc.AppliedTraits.push(tr);
        else
            acc.AvailableTraits.push(tr);

        acc.AllTraits.push(tr);

        return acc;
    }, props);

    return props;
}

function mapDispatchToProps(dispatch: any) : Props
{
    return {
        ApplyTrait: (id: number) => dispatch(Actions.ApplyTrait(id)),
        RemoveTrait: (t: Trait) => dispatch(Actions.RemoveTrait(t.Id))
    } as Props;
}

export default connect(mapStateToProps, mapDispatchToProps)(Traits);
