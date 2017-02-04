interface ArmorFormula
{
    attribute: string;
}

export const Options = {
    Armored: "ARMOR",
    UnarmoredDefenseBarbarian: "UNARMORED_DEFENSE", // barb: 10 + dex + con, shield allowed
    UnarmoredDefenseMonk: "UNARMORED_DEFENSE2", // monk: 10 + dex + wis, no shield
    NaturalArmor: "NATURAL_ARMOR",
};

let armor: ArmorFormula = {
    attribute: "Dex"
};

export default Options;
