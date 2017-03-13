import { Trait } from "types";
import defaultTraits from "./traits";

interface TraitTemplate
{
    id: number;
    name: string;
    traitIds: number[];

    traits?: Trait[];
}

const defaultTraitTemplates: TraitTemplate[] = [
    { id: 1, name: "Spider", traitIds: [1, 2] },
];

export default defaultTraitTemplates;
