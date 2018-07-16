import * as Redux from "redux";
import * as types from "src/rdx/types/monsterStats/attributes.types";

interface AttributeActionPayload
{
    attr: string;
    value: number;
}

export const modifyAttribute: Redux.ActionCreator<AttributeActionPayload> =
    (attr: string, value: number) =>
    ({
        type: types.ATTRIBUTE_MODIFY,
        attr,
        value,
    });

export const setAttribute: Redux.ActionCreator<AttributeActionPayload> =
    (attr: string, value: number) =>
    ({
        type: types.ATTRIBUTE_SET,
        attr,
        value,
    });

export type AttributesAction = Redux.Action & AttributeActionPayload;
