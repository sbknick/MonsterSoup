import * as React from "react";
import { connect } from "react-redux";

import * as Attr from "data/attributes";
import * as Util from "util/Mod";

import { getMonsterBuilderData, GlobalState } from "rdx/reducers";
import { getAttributeScore, getSaveState } from "rdx/reducers/monsterBuilder";
import { SavesStateSingle } from "types/monsterBuilder";

import { Fieldset, HighlightBonusOnChange, LabelledItem } from "components/common";
import * as Actions from "rdx/actions/monsterBuilder/saves.actions";
import * as UIActions from "rdx/actions/ui.actions";

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
    saveState: SavesStateSingle;

    toggleProficiency: () => void;
    toggleExpertise: () => void;
    modifyMiscBonus: (n: number) => void;
}

export const Saves: React.StatelessComponent<SavesProps> = (props) =>
{
    const attrs = Attr.attributes;
    const splats = attrs.map(a =>
    {
        const idx = Attr.getAttributeOrdinal(a);

        return (
            <SaveSplat
                key={a}
                attr={a}
                score={props.attributeScores[idx]}
                proficiencyBonus={props.proficiencyBonus}
                saveState={props.saveStates[idx]}
                toggleProficiency={props.toggleProficiencyDelegates[idx]}
                toggleExpertise={props.toggleExpertiseDelegates[idx]}
                modifyMiscBonus={props.modifyMiscBonusDelegates[idx]}
            />
        );
    });

    return (
        <Fieldset
            config={{
                legend: "Saving Throws",
                isCollapsed: props.isFieldsetCollapsed("Saving Throws"),
                toggleCollapse: () => props.toggleFieldsetCollapse("Saving Throws"),
            }}
            className="saving-throws inline-children"
        >
            {splats}
        </Fieldset>
    );
};

interface SavesProps
{
    proficiencyBonus: number;
    attributeScores: number[];
    saveStates: SavesStateSingle[];
    isFieldsetCollapsed: (key: string) => boolean;

    toggleProficiencyDelegates: Array<(() => void)>;
    toggleExpertiseDelegates: Array<(() => void)>;
    modifyMiscBonusDelegates: Array<((n: number) => void)>;
    toggleFieldsetCollapse: (key: string) => void;
}

function mapStateToProps(state: GlobalState): SavesProps
{
    const mb = getMonsterBuilderData(state);

    // tslint:disable-next-line:no-object-literal-type-assertion
    return {
        attributeScores: Attr.attributes.map(a => getAttributeScore(mb, a)),
        proficiencyBonus: mb.proficiency.proficiencyBonus,
        saveStates: Attr.attributes.map(a => getSaveState(mb, a)),
        isFieldsetCollapsed: (key: string) => !state.ui.fieldset.decollapsed[key],
    } as SavesProps;
}

function mapDispatchToProps(dispatch: any): SavesProps
{
    const newProps: any = {
        toggleProficiencyDelegates: [],
        toggleExpertiseDelegates: [],
        modifyMiscBonusDelegates: [],
        toggleFieldsetCollapse: (key: string) => dispatch(UIActions.toggleFieldsetCollapse(key)),
    };

    Attr.attributes.reduce((acc, attr) =>
    {
        acc.toggleProficiencyDelegates.push(() => dispatch(Actions.toggleSaveProficiency(attr)));
        acc.toggleExpertiseDelegates.push(() => dispatch(Actions.toggleSaveExpertise(attr)));
        acc.modifyMiscBonusDelegates.push((n: any) => dispatch(Actions.modifySaveBonus(attr, n)));
        return acc;
    }, newProps);

    return newProps as SavesProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(Saves);
