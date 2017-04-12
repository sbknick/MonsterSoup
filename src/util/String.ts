// import { Memoize } from "typescript-memoize";

import { ActionArgs, ActionArgType } from "monsterBuilder/types";
import { DamageType } from "types";

// camel-case conversion code found here:
// http://stackoverflow.com/a/34680912
// another possible alternative is to pull in SugarJS and use .titleize()

const camelEdges = /([A-Z](?=[A-Z][a-z])|[^A-Z](?=[A-Z])|[a-zA-Z](?=[^a-zA-Z]))/g;

export function titleize(input: string): string
{
    let result = input.replace(camelEdges, "$1 ");
    result = result.charAt(0).toUpperCase() + result.slice(1);
    return result;
}

export function detitleize(input: string): string
{
    return titleize(input).toLowerCase();
}

export const capitalize = (str: string) => str && (str[0].toUpperCase() + str.slice(1));
