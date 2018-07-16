
export interface SavesState
{
    saves: SavesStateSingle[];
}

export interface SavesStateSingle
{
    hasProficiency: boolean;
    hasExpertise: boolean;
    miscBonus: number;
}
