
export function forEach<T>(myEnum: T, action: (key: number) => void): void
{
    let i = 0;
    for (const e in myEnum)
    {
        i = parseInt(e);
        if (i) action(i);
    }
}

export function map<T>(myEnum: T, fn: (key: number) => any): any[]
{
    const results = [];

    let i = 0;
    for (const e in myEnum)
    {
        i = parseInt(e);
        if (i) results.push(fn(i));
    }

    return results;
}
