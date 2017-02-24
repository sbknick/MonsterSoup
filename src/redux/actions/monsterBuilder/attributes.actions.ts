import * as Redux from 'redux';
import * as types from '../../types/monsterBuilder/attributes.types';

interface AttributeActionPayload
{
    attr: string;
    value: number;
}

export const ModifyAttribute: Redux.ActionCreator<AttributeActionPayload> =
    (attr: string, value: number) =>
    ({
        type: types.MODIFY_ATTRIBUTE,
        attr: attr,
        value: value
    });

export const SetAttribute: Redux.ActionCreator<AttributeActionPayload> =
    (attr: string, value: number) =>
    ({
        type: types.SET_ATTRIBUTE,
        attr: attr,
        value: value
    });

export type AttributesAction = Redux.Action & AttributeActionPayload;
