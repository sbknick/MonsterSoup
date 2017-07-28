import { DamageType /*, Range */ } from "types";
import { ActionArgs, ActionArgType, DamageArgs } from "types/monsterBuilder";

import * as Calc from "util/Calc";
import * as String from "util/String";

export function parseTemplate(input: string, args: ActionArgs, statMod: number): string
{
    for (const key in args)
    {
        const testReg: RegExp = regex.getTestRegExp(key);
        const value = args[key];

        if (!value.value)
            continue;

        if (testReg.test(input))
        {
            const lowerReg = regex.getLowerRegExp(key);
            const upperReg = regex.getUpperRegExp(key);

            if (typeof value.value === "string")
            {
                let strValue: string;
                switch (value.argType)
                {
                    case ActionArgType.DamageRoll:
                        throw new Error();

                    case ActionArgType.DamageType:
                        strValue = DamageType[parseInt(value.value)].toLowerCase();
                        break;

                    default:
                        strValue = value.value;
                        break;
                }

                input = parseTemplate_String(input, lowerReg, upperReg, strValue);
            }
            else
            {
                const damArgs = value.value as DamageArgs;
                if (damArgs)
                {
                    input = parseTemplate_DamageArgs(input, lowerReg, upperReg, damArgs, statMod);
                }

                // const rangeArgs = value.value as Range;
                // if (rangeArgs)
                // {
                //     input = parseTemplate_Range(input, lowerReg, upperReg, rangeArgs);
                // }
            }
        }
    }

    return input;
}

function parseTemplate_String(input: string, lowerReg: RegExp, upperReg: RegExp, value: string): string
{
    input = input.replace(lowerReg, value)
                 .replace(upperReg, String.capitalize(value));

    return input;
}

function parseTemplate_DamageArgs(
    input: string, lowerReg: RegExp, upperReg: RegExp, args: DamageArgs, statMod: number): string
{
    const bonus = (args.miscBonus || 0) + (args.usePrimaryStatBonus ? statMod : 0);
    const aveDam = Calc.calcAverageDamage(args, bonus);
    const strValue = `${aveDam} (${args.diceCount}d${args.dieSize}${bonus ? (bonus > 0 ? " + " : " - ") + bonus : ""})`;

    return parseTemplate_String(input, lowerReg, upperReg, strValue);
}

class Regex
{
    // @Memoize()
    public getTestRegExp(key: string): RegExp
    {
        return new RegExp(`{(${key[0].toLowerCase()}|${key[0].toUpperCase()})${key.slice(1)}.*?}`);
    }

    // @Memoize()
    public getLowerRegExp(key: string): RegExp
    {
        return new RegExp(`{${key}.*?}`);
    }

    // @Memoize()
    public getUpperRegExp(key: string): RegExp
    {
        return new RegExp(`{${String.capitalize(key)}.*?}`);
    }
}

const regex = new Regex();

// export function Memoize(hashFunction?: (...args: any[]) => any)
// {
//     return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) =>
//     {
//         if (descriptor.value != null)
//             descriptor.value = getNewFunction(descriptor.value, hashFunction);
//         else if (descriptor.get != null)
//             descriptor.get = getNewFunction(descriptor.get, hashFunction);
//         else
//             throw new Error("Only put a Memoize() decorator on a method or get accessor.");
//     };
// }

// var counter = 0; // tslint:disable-line
// function getNewFunction(originalMethod: () => void, hashFunction?: (...args: any[]) => any)
// {
//     const identifier = ++counter;

//     // The function returned here gets called instead of originalMethod.
//     return function (...args: any[]) // tslint:disable-line
//     {
//         const propValName = `__memoized_value_${identifier}`;
//         const propMapName = `__memoized_map_${identifier}`;

//         let returnedValue: any;

//         if (hashFunction || args.length > 0)
//         {
//         	// Get or create map
//             if (!this.hasOwnProperty(propMapName)) {
//                 Object.defineProperty(this, propMapName, {
//                     configurable: false,
//                     enumerable: false,
//                     writable: false,
//                     value: new Map<any, any>(),
//                 });
//             }
//             const myMap: Map<any, any> = this[propMapName];

//             let hashKey: any;

//             if (hashFunction)
//                 hashKey = hashFunction.apply(this, args);
//             else
//                 hashKey = args[0];

//             if (myMap.has(hashKey))
//                 returnedValue = myMap.get(hashKey);
//             else
//             {
//                 returnedValue = originalMethod.apply(this, args);
//                 myMap.set(hashKey, originalMethod.apply(this, args));
//             }
//         }
//         else
//         {
//             if (this.hasOwnProperty(propValName))
//                 returnedValue = this[propValName];
//             else
//             {
//                 returnedValue = originalMethod.apply(this, args);
//                 Object.defineProperty(this, propValName, {
//                     configurable: false,
//                     enumerable: false,
//                     writable: false,
//                     value: returnedValue,
//                 });
//             }
//         }

//         return returnedValue;
//     };
// }
