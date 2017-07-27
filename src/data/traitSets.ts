import { TraitTemplate } from "types";
// import defaultTraits from "./traits";

interface TraitSet
{
    id: number;
    name: string;
    traitIds: number[];

    traits?: TraitTemplate[];
}

const defaultTraitSets: TraitSet[] = [
    { id: 1, name: "Spider", traitIds: [1, 2] },
];

export default defaultTraitSets;
