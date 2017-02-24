
export function Mod(value: number) : number
{
    var result = Math.floor((value / 2) - 5);
    return result;
}

export function ModBonus(value: number) : string
{
    var mod = Mod(value);

    return mod >= 0 ? "+" + mod : mod.toString();
}
