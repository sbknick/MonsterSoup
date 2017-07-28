import { ArmorData, ArmorType } from "types/monsterBuilder";

export const armors: ArmorData[] = [
    {
        name: "Padded",
        value: 11,
        type: ArmorType.Light,
        disadvantageOnStealth: true,
    },
    {
        name: "Leather",
        value: 11,
        type: ArmorType.Light,
    },
    {
        name: "Studded Leather",
        value: 12,
        type: ArmorType.Light,
    },

    {
        name: "Hide",
        value: 12,
        type: ArmorType.Medium,
    },
    {
        name: "Chain shirt",
        value: 13,
        type: ArmorType.Medium,
    },
    {
        name: "Scale mail",
        value: 14,
        type: ArmorType.Medium,
        disadvantageOnStealth: true,
    },
    {
        name: "Breastplate",
        value: 14,
        type: ArmorType.Medium,
    },
    {
        name: "Half plate",
        value: 15,
        type: ArmorType.Medium,
        disadvantageOnStealth: true,
    },

    {
        name: "Ring mail",
        value: 14,
        type: ArmorType.Heavy,
        disadvantageOnStealth: true,
    },
    {
        name: "Chain mail",
        value: 16,
        type: ArmorType.Heavy,
        strReq: 13,
        disadvantageOnStealth: true,
    },
    {
        name: "Splint mail",
        value: 17,
        type: ArmorType.Heavy,
        strReq: 15,
        disadvantageOnStealth: true,
    },
    {
        name: "Plate mail",
        value: 18,
        type: ArmorType.Heavy,
        strReq: 15,
        disadvantageOnStealth: true,
    },
];

export default armors;
