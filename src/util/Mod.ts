
// A function to return the "mod" value for a given number.
// E.g. with a Str score of 9, the resulting mod should be -1
// This does not convert to string or add the '+' prefix
export function mod(value: number): number
{
    const result = Math.floor((value / 2) - 5);
    return result;
}

// A function to return a "bonus" string,
// this prefixes a '+' if non-negative
export function asBonus(value: number): string
{
    return value >= 0 ? "+" + value : value.toString();
}

// A function to return the "mod" value for a given number.
// This will pre-pend a '+' prefix if non-negative.
// E.g. a Str score of 11 will return "+0"
export function modBonus(value: number): string
{
    const result = mod(value);
    return asBonus(result);
}
