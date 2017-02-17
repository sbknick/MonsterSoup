
/* IMPORTANT NOTE: ALL CRs are actually INDICES on the CRs array.
This allows us to Increment or Decrement CR by "1", so that 1 goes down to 1/2,
1/8 goes up to 1/4, etc... */

export interface Range
{
    Low: number;
    High: number;
}

// all CR indices are 3 higher than the CR they represent,
// (as soon as the index is > 3, at least)
const CRs: string[] = [
    "0", "1/8", "1/4", "1/2", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
    "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
    "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"
]

//#region Proficiency CR

interface ProficiencyCRRange extends Range
{
    Proficiency: number;
}

const ProficiencyCRRanges: ProficiencyCRRange[] = [
    { Proficiency: 2, Low: 0, High: 7 },
    { Proficiency: 3, Low: 8, High: 11 },
    { Proficiency: 4, Low: 12, High: 15 },
    { Proficiency: 5, Low: 16, High: 19 },
    { Proficiency: 6, Low: 20, High: 23 },
    { Proficiency: 7, Low: 24, High: 27 },
    { Proficiency: 8, Low: 28, High: 31 },
    { Proficiency: 9, Low: 32, High: 33 }
];

//#endregion

//#region HP CR

interface HPCRRange extends Range
{
    CR: number;
}

const HPCRRanges: HPCRRange[] = [
    { Low: 1, High: 6, CR: 0 },
    { Low: 7, High: 35, CR: 1 },
    { Low: 36, High: 49, CR: 2 },
    { Low: 50, High: 70, CR: 3 },
    { Low: 71, High: 85, CR: 4 },
    { Low: 86, High: 100, CR: 5 },
    { Low: 101, High: 115, CR: 6 },
    { Low: 116, High: 130, CR: 7 },
    { Low: 131, High: 145, CR: 8 },
    { Low: 146, High: 160, CR: 9 },
    { Low: 161, High: 175, CR: 10 },
    { Low: 176, High: 190, CR: 11 },
    { Low: 191, High: 205, CR: 12 },
    { Low: 206, High: 220, CR: 13 },
    { Low: 221, High: 235, CR: 14 },
    { Low: 236, High: 250, CR: 15 },
    { Low: 251, High: 265, CR: 16 },
    { Low: 266, High: 280, CR: 17 },
    { Low: 281, High: 295, CR: 18 },
    { Low: 296, High: 310, CR: 19 },
    { Low: 311, High: 325, CR: 20 },
    { Low: 326, High: 340, CR: 21 },
    { Low: 341, High: 355, CR: 22 },
    { Low: 356, High: 400, CR: 23 },
    { Low: 401, High: 445, CR: 24 },
    { Low: 446, High: 490, CR: 25 },
    { Low: 491, High: 535, CR: 26 },
    { Low: 536, High: 580, CR: 27 },
    { Low: 581, High: 625, CR: 28 },
    { Low: 626, High: 670, CR: 29 },
    { Low: 671, High: 715, CR: 30 },
    { Low: 716, High: 760, CR: 31 },
    { Low: 761, High: 805, CR: 32 },
    { Low: 806, High: 850, CR: 33 }
];

//#endregion

//#region AC CR

interface ACCRRange extends Range
{
    AC: number;
}

const ACCRRanges: ACCRRange[] = [
    { AC: 0, Low: 0, High: 0 },
    { AC: 13, Low: 0, High: 6 },
    { AC: 14, Low: 7, High: 7 },
    { AC: 15, Low: 8, High: 10 },
    { AC: 16, Low: 11, High: 12 },
    { AC: 17, Low: 13, High: 15 },
    { AC: 18, Low: 16, High: 19 },
    { AC: 19, Low: 20, High: 33 }
]

//#endregion

function getCRIdxForHP(average: number): number
{
    var range = HPCRRanges.find(r => r.Low <= average && average <= r.High);
    return range.CR;
}

export function getCRForHP(average: number): string
{
    var idx = getCRIdxForHP(average);
    return CRs[idx];
}

function getCRIdxRangeForAC(effectiveAC: number): Range
{
    var range = ACCRRanges.find(r => r.AC == effectiveAC);

    if (range == null)
    {
        if (effectiveAC <= 12)
            range = ACCRRanges[0];
        else
            range = ACCRRanges[7];
    }

    return range;
}

export function getCRRangeForAC(effectiveAC: number): any
{
    var idxRange = getCRIdxRangeForAC(effectiveAC);
    return { Low: CRs[idxRange.Low], High: CRs[idxRange.High] };
}

function getIdxForCR(cr: number | string): number
{
    var key: string;
    if (typeof cr == "string")
        key = cr;
    else
        key = cr > 0 && cr < 1
        ? (cr == 0.125 ? "1/8" : cr == 0.25 ? "1/4" : "1/2")
        : cr.toString();

    var idx = CRs.indexOf(key);
    return idx;
}

function getExpectedACForCRIdx(idx: number): number
{
    var range = ACCRRanges.find(r => r.Low <= idx && idx <= r.High);
    return range.AC;
}

export function getExpectedACForCR(cr: number | string): number
{
    var idx = getIdxForCR(cr);
    return getExpectedACForCRIdx(idx);
}

function getCRIdxRangeForProficiency(proficiencyBonus: number): Range
{
    var idx = ProficiencyCRRanges.find(r => r.Proficiency == proficiencyBonus);
    return idx;
}

export function getCRRangeForProficiency(proficiencyBonus: number): any
{
    var idxRange = getCRIdxRangeForProficiency(proficiencyBonus);
    return { Low: CRs[idxRange.Low], High: CRs[idxRange.High] };
}

// export function getDefensiveCR(averageHp: number, effectiveAC: number): number
// {
//     var hp_cr = getCRForHP(averageHp);
//     var ac_cr_range = getCRRangeForAC(effectiveAC);
//
//     if (ac_cr_range.Low <= hp_cr && hp_cr <= ac_cr_range.High)
//         return hp_cr;
//
//     var cr_ac = getExpectedACForCR(hp_cr);
//     var cr_incr = Math.floor((effectiveAC - cr_ac) / 2);
//
//     return hp_cr + cr_incr;
// }

export function getDefensiveCR(averageHp: number, effectiveAC: number): string
{
    var hpCrIdx = getCRIdxForHP(averageHp);
    var acCrIdxRange = getCRIdxRangeForAC(effectiveAC);

    if (acCrIdxRange.Low <= hpCrIdx && hpCrIdx <= acCrIdxRange.High)
        return CRs[hpCrIdx];

    var crAc = getExpectedACForCRIdx(hpCrIdx);
    var crIncr = Math.floor((effectiveAC - crAc) / 2);

    var finalIdx = hpCrIdx + crIncr;
    return CRs[finalIdx];
}
