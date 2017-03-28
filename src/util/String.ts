// import { Memoize } from "typescript-memoize";

import { ActionArgs, ActionArgType } from "monsterBuilder/types";

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

export const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);

// interface Args
// {
//     [key: string]: string;
// }

export function parseTemplate(input: string, args: ActionArgs): string
{
    for (const key in args)
    {
        const testReg: RegExp = regex.getTestRegExp(key);
        if (testReg.test(input))
        {
            const lowerReg = regex.getLowerRegExp(key);
            const upperReg = regex.getUpperRegExp(key);
            const value = args[key];

            switch (value.argType)
            {
                case ActionArgType.Text:
                case ActionArgType.Number:
                    input = input.replace(lowerReg, value.value)
                                 .replace(upperReg, capitalize(value.value));
                    break;

                case ActionArgType.DiceRoll:
                    input = input.replace(lowerReg, value.value)
                                 .replace(upperReg, capitalize(value.value));
                    break;

                default:
                    input = input.replace(lowerReg, value.value)
                                 .replace(upperReg, capitalize(value.value));
                    break;
            }
        }
    }

    return input;
}

class Regex
{
    @Memoize()
    public getTestRegExp(key: string): RegExp
    {
        return new RegExp(`{(${key[0].toLowerCase()}|${key[0].toUpperCase()})${key.slice(1)}}`);
    }

    // @Memoize()
    public getLowerRegExp(key: string): RegExp
    {
        return new RegExp(`{${key}}`);
    }

    // @Memoize()
    public getUpperRegExp(key: string): RegExp
    {
        return new RegExp(`{${capitalize(key)}}`);
    }
}

const regex = new Regex();

export function Memoize(hashFunction?: (...args: any[]) => any)
{
    return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) =>
    {
        if (descriptor.value != null)
            descriptor.value = getNewFunction(descriptor.value, hashFunction);
        else if (descriptor.get != null)
            descriptor.get = getNewFunction(descriptor.get, hashFunction);
        else
            throw new Error("Only put a Memoize() decorator on a method or get accessor.");
    };
}

var counter = 0; // tslint:disable-line
function getNewFunction(originalMethod: () => void, hashFunction?: (...args: any[]) => any)
{
    const identifier = ++counter;

    // The function returned here gets called instead of originalMethod.
    return function (...args: any[]) // tslint:disable-line
    {
        const propValName = `__memoized_value_${identifier}`;
        const propMapName = `__memoized_map_${identifier}`;

        let returnedValue: any;

        if (hashFunction || args.length > 0)
        {
        	// Get or create map
            if (!this.hasOwnProperty(propMapName)) {
                Object.defineProperty(this, propMapName, {
                    configurable: false,
                    enumerable: false,
                    writable: false,
                    value: new Map<any, any>(),
                });
            }
            const myMap: Map<any, any> = this[propMapName];

            let hashKey: any;

            if (hashFunction)
                hashKey = hashFunction.apply(this, args);
            else
                hashKey = args[0];

            if (myMap.has(hashKey))
                returnedValue = myMap.get(hashKey);
            else
            {
                returnedValue = originalMethod.apply(this, args);
                myMap.set(hashKey, originalMethod.apply(this, args));
            }
        }
        else
        {
            if (this.hasOwnProperty(propValName))
                returnedValue = this[propValName];
            else
            {
                returnedValue = originalMethod.apply(this, args);
                Object.defineProperty(this, propValName, {
                    configurable: false,
                    enumerable: false,
                    writable: false,
                    value: returnedValue,
                });
            }
        }

        return returnedValue;
    };
}
