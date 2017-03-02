
export const attributes = ["Str", "Dex", "Con", "Int", "Wis", "Cha"];

export default attributes;

export function getAttributeOrdinal(attr: string) : number
{
    return attributes.indexOf(attr);
}
