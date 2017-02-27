
// A function to return the "mod" value for a given number.
// E.g. with a Str score of 9, the resulting mod should be -1
// This does not convert to string or add the '+' prefix
export function mod(value: number) : number
{
    var result = Math.floor((value / 2) - 5);
    return result;
}

// A function to return the "mod" value for a given number.
// This will pre-pend a '+' prefix if non-negative.
// E.g. a Str score of 11 will return "+0"
export function modBonus(value: number) : string
{
    var result = mod(value);
    return result >= 0 ? "+" + result : result.toString();
}
