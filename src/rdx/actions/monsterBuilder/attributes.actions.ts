import * as Redux from 'redux';
import * as types from '../../types/monsterBuilder/attributes.types';

interface AttributeActionPayload
{
    attr: string;
    value: number;
}

export const modifyAttribute: Redux.ActionCreator<AttributeActionPayload> =
    (attr: string, value: number) =>
    ({
        type: types.ATTRIBUTE_MODIFY,
        attr: attr,
        value: value
    });

export const setAttribute: Redux.ActionCreator<AttributeActionPayload> =
    (attr: string, value: number) =>
    ({
        type: types.ATTRIBUTE_SET,
        attr: attr,
        value: value
    });

export type AttributesAction = Redux.Action & AttributeActionPayload;
