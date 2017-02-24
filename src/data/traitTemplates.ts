import { Trait } from '../redux/reducers/traits.reducer';
import defaultTraits from './traits';

interface TraitTemplate
{
    Id: number;
    Name: string;
    TraitIds: number[];

    Traits?: Trait[];
}

const defaultTraitTemplates: TraitTemplate[] = [
    { Id: 1, Name: "Spider", TraitIds: [1, 2] }
];

export default defaultTraitTemplates;
