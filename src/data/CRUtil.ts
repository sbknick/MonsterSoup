
/* IMPORTANT NOTE: ALL CRs are actually INDICES on the CRs array.
This allows us to Increment or Decrement CR by "1", so that 1 goes down to 1/2,
1/8 goes up to 1/4, etc... */

export interface Range {
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

interface ProficiencyCRRange extends Range {
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

interface HPCRRange extends Range {
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

interface ACCRRange extends Range {
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

//#region DPR CR

interface DPRCRRange extends Range {
    CR: number;
}

const DPRCRRanges: DPRCRRange[] = [
    { Low: 0, High: 1, CR: 0 },
    { Low: 2, High: 3, CR: 1/8 },
    { Low: 4, High: 5, CR: 1/4 },
    { Low: 6, High: 8, CR: 1/2 },
    { Low: 9, High: 14, CR: 1 },
    { Low: 15, High: 20, CR: 2 },
    { Low: 21, High: 26, CR: 3 },
    { Low: 27, High: 32, CR: 4 },
    { Low: 33, High: 38, CR: 5 },
    { Low: 39, High: 44, CR: 6 },
    { Low: 45, High: 50, CR: 7 },
    { Low: 51, High: 56, CR: 8 },
    { Low: 57, High: 62, CR: 9 },
    { Low: 63, High: 68, CR: 10 },
    { Low: 69, High: 74, CR: 11 },
    { Low: 75, High: 80, CR: 12 },
    { Low: 81, High: 86, CR: 13 },
    { Low: 87, High: 92, CR: 14 },
    { Low: 93, High: 98, CR: 15 },
    { Low: 99, High: 104, CR: 16 },
    { Low: 105, High: 110, CR: 17 },
    { Low: 111, High: 116, CR: 18 },
    { Low: 117, High: 122, CR: 19 },
    { Low: 123, High: 140, CR: 20 },
    { Low: 141, High: 158, CR: 21 },
    { Low: 159, High: 176, CR: 22 },
    { Low: 177, High: 194, CR: 23 },
    { Low: 195, High: 212, CR: 24 },
    { Low: 213, High: 230, CR: 25 },
    { Low: 231, High: 248, CR: 26 },
    { Low: 249, High: 266, CR: 27 },
    { Low: 267, High: 284, CR: 28 },
    { Low: 285, High: 302, CR: 29 },
    { Low: 303, High: 320, CR: 30 }
];

//#endregion

//#region AB CR

interface ABCRRange extends Range {
    AB: number;
}

const ABCRRanges: ABCRRange[] = [
    { AB: 0, Low: 0, High: 0 },
    { AB: 3, Low: 0, High: 5 },
    { AB: 4, Low: 6, High: 6 },
    { AB: 5, Low: 7, High: 7 },
    { AB: 6, Low: 8, High: 10 },
    { AB: 7, Low: 11, High: 13 },
    { AB: 8, Low: 14, High: 18 },
    { AB: 9, Low: 19, High: 19 },
    { AB: 10, Low: 20, High: 23 },
    { AB: 11, Low: 24, High: 26 },
    { AB: 12, Low: 27, High: 29 },
    { AB: 13, Low: 30, High: 32 },
    { AB: 14, Low: 33, High: 33 }
];

//#endregion

//#region DC CR

interface DCCRRange extends Range {
    DC: number;
}

const DCCRRanges: DCCRRange[] = [
    { DC: 0, Low: 0, High: 0 },
    { DC: 13, Low: 0, High: 6 },
    { DC: 14, Low: 7, High: 7 },
    { DC: 15, Low: 8, High: 10 },
    { DC: 16, Low: 11, High: 13 },
    { DC: 17, Low: 14, High: 15 },
    { DC: 18, Low: 16, High: 19 },
    { DC: 19, Low: 20, High: 23 },
    { DC: 20, Low: 24, High: 26 },
    { DC: 21, Low: 27, High: 29 },
    { DC: 22, Low: 30, High: 32 },
    { DC: 23, Low: 33, High: 33 }
];

//#endregion

function getCRIdxForHP(average: number): number {
    var range = HPCRRanges.find(r => r.Low <= average && average <= r.High);
    return range.CR;
}

export function getCRForHP(average: number): string {
    var idx = getCRIdxForHP(average);
    return CRs[idx];
}

function getCRIdxRangeForAC(effectiveAC: number): Range {
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

export function getCRRangeForAC(effectiveAC: number): any {
    var idxRange = getCRIdxRangeForAC(effectiveAC);
    return { Low: CRs[idxRange.Low], High: CRs[idxRange.High] };
}

function getIdxForCR(cr: number | string): number {
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

function getExpectedACForCRIdx(idx: number): number {
    var range = ACCRRanges.find(r => r.Low <= idx && idx <= r.High);
    return range.AC;
}

export function getExpectedACForCR(cr: number | string): number {
    var idx = getIdxForCR(cr);
    return getExpectedACForCRIdx(idx);
}

export function getDefensiveCR(averageHp: number, effectiveAC: number): string {
    var hpCrIdx = getCRIdxForHP(averageHp);
    var acCrIdxRange = getCRIdxRangeForAC(effectiveAC);

    if (acCrIdxRange.Low <= hpCrIdx && hpCrIdx <= acCrIdxRange.High)
        return CRs[hpCrIdx];

    var crAc = getExpectedACForCRIdx(hpCrIdx);
    var diff = effectiveAC - crAc;
    var crIncr = diff >= 0 ? Math.floor(diff / 2) : Math.ceil(diff / 2);

    var finalIdx = hpCrIdx + crIncr;
    return CRs[finalIdx];
}

function getCRIdxForDPR(average: number): number {
    var range = DPRCRRanges.find(r => r.Low <= average && average <= r.High);
    return range.CR;
}

export function getCRForDPR(average: number): string {
    var idx = getCRIdxForDPR(average);
    return CRs[idx];
}

function getExpectedABForCRIdx(idx: number): number {
    var range = ABCRRanges.find(r => r.Low <= idx && idx <= r.High);
    return range.AB;
}

export function getExpectedABForCR(cr: number | string): number {
    var idx = getIdxForCR(cr);
    return getExpectedABForCRIdx(idx);
}

function getExpectedDCForCRIdx(idx: number): number {
    var range = DCCRRanges.find(r => r.Low <= idx && idx <= r.High);
    return range.DC;
}

export function getExpectedDCForCR(cr: number | string): number {
    var idx = getIdxForCR(cr);
    return getExpectedDCForCRIdx(idx);
}

function getCRIdxRangeForAB(effectiveAB: number): Range {
    var range = ABCRRanges.find(r => r.AB == effectiveAB);

    if (range == null)
    {
        if (effectiveAB <= 2)
            range = ABCRRanges[0];
        else
            range = ABCRRanges[12];
    }

    return range;
}

export function getCRRangeForAB(effectiveAB: number): any
{
    var idxRange = getCRIdxRangeForAB(effectiveAB);
    return { Low: CRs[idxRange.Low], High: CRs[idxRange.High] };
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
