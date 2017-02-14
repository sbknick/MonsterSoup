import * as Redux from 'redux';
// import { AttributesState } from '../reducers/MonsterBuilder.Attributes';

export const INCREMENT_ATTRIBUTE: "INCREMENT_ATTRIBUTE" = "INCREMENT_ATTRIBUTE";
export type IncrementAttributeAction = Redux.Action & {
    attr: string;
    value: number;
};
export function IncrementAttribute(attr: string, value: number): IncrementAttributeAction
{
    return ({
        type: INCREMENT_ATTRIBUTE,
        attr: attr,
        value: value
    });
}

export const SET_ATTRIBUTE: "SET_ATTRIBUTE" = "SET_ATTRIBUTE";
export type SetAttributeAction = Redux.Action & {
    attr: string;
    value: number;
};
export function SetAttribute(attr: string, value: number): SetAttributeAction
{
    return ({
        type: SET_ATTRIBUTE,
        attr: attr,
        value: value
    });
}


export type AttributesAction = Redux.Action
    | IncrementAttributeAction
    | SetAttributeAction;
export default AttributesAction;
