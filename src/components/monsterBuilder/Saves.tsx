import * as React from 'react';
import { connect } from 'react-redux';

import * as Attr from '../../data/attributes';
import * as Util from '../../util/Mod';

import { GlobalState, getMonsterBuilderData } from '../../redux/reducers';
import { getAttributeScore, getSaveState } from '../../redux/reducers/monsterBuilder';
import { State as AttrState } from '../../redux/reducers/monsterBuilder/attributes.reducer';
import { SaveState } from '../../redux/reducers/monsterBuilder/saves.reducer';

import * as Actions from '../../redux/actions/monsterBuilder/saves.actions';
import { Fieldset, HighlightBonusOnChange, LabelledItem } from '../common';

export const SaveSplat: React.StatelessComponent<SaveSplatProps> = (props) =>
(
    <LabelledItem label={props.attr} style={{ border: "1px dotted silver", borderRadius: "6px" }}>
        P: <input type="checkbox" checked={props.saveState.hasProficiency} onChange={props.toggleProficiency}/>
        E: <input type="checkbox" checked={props.saveState.hasExpertise} onChange={props.toggleExpertise} />
        <br />
        <HighlightBonusOnChange value={
            Util.mod(props.score) + props.saveState.miscBonus
            + (props.saveState.hasProficiency ? props.proficiencyBonus : 0)
            + (props.saveState.hasProficiency && props.saveState.hasExpertise ? props.proficiencyBonus : 0)
        } />
    </LabelledItem>
);

interface SaveSplatProps
{
    attr: string;
    score: number;
    proficiencyBonus: number;
    saveState: SaveState;

    toggleProficiency: () => void;
    toggleExpertise: () => void;
    modifyMiscBonus: (n: number) => void;
}

export const Saves: React.StatelessComponent<SavesProps> = (props) =>
{
    var attrs = Attr.attributes;
    var splats = attrs.map(a =>
    {
        let idx = Attr.getAttributeOrdinal(a);

        return (
            <SaveSplat key={a}
                       attr={a}
                       score={props.attributeScores[idx]}
                       proficiencyBonus={props.proficiencyBonus}
                       saveState={props.saveStates[idx]}
                       toggleProficiency={props.toggleProficiencyDelegates[idx]}
                       toggleExpertise={props.toggleExpertiseDelegates[idx]}
                       modifyMiscBonus={props.modifyMiscBonusDelegates[idx]} />
        );
    });

    return (
        <Fieldset legend="Saving Throws" className="saving-throws inline-children">
            {splats}
        </Fieldset>
    );
};

interface SavesProps
{
    proficiencyBonus: number;
    attributeScores: number[];
    saveStates: SaveState[];

    toggleProficiencyDelegates: (() => void)[];
    toggleExpertiseDelegates: (() => void)[];
    modifyMiscBonusDelegates: ((n: number) => void)[];
}

function mapStateToProps(state: GlobalState) : SavesProps
{
    var mb = getMonsterBuilderData(state);

    return {
        attributeScores: Attr.attributes.map(a => getAttributeScore(mb, a)),
        proficiencyBonus: mb.proficiency.proficiencyBonus,
        saveStates: Attr.attributes.map(a => getSaveState(mb, a))
    } as SavesProps;
}

function mapDispatchToProps(dispatch: any) : SavesProps
{
    var newProps = {
        toggleProficiencyDelegates: [],
        toggleExpertiseDelegates: [],
        modifyMiscBonusDelegates:[]
    } as SavesProps;

    Attr.attributes.reduce((acc, attr) =>
    {
        acc.toggleProficiencyDelegates.push(() => dispatch(Actions.toggleSaveProficiency(attr)));
        acc.toggleExpertiseDelegates.push(() => dispatch(Actions.toggleSaveExpertise(attr)));
        acc.modifyMiscBonusDelegates.push((n) => dispatch(Actions.modifySaveBonus(attr, n)));
        return acc;
    }, newProps);

    return newProps as SavesProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(Saves);
