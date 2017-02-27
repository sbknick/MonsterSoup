import * as Data from '../data/cr';


/* IMPORTANT NOTE: ALL CRs are actually INDICES on the CRs array.
This allows us to Increment or Decrement CR by "1", so that 1 goes down to 1/2,
1/8 goes up to 1/4, etc... */

function getCRIdxForHP(average: number): number
{
    var range = Data.HPCRRanges.find(r => r.low <= average && average <= r.high);
    return range.CR;
}

export function getCRForHP(average: number): string
{
    var idx = getCRIdxForHP(average);
    return Data.CRs[idx];
}

function getCRIdxRangeForAC(effectiveAC: number): Data.Range
{
    var range = Data.ACCRRanges.find(r => r.AC == effectiveAC);

    if (range == null)
    {
        if (effectiveAC <= 12)
            range = Data.ACCRRanges[0];
        else
            range = Data.ACCRRanges[7];
    }

    return range;
}

export function getCRRangeForAC(effectiveAC: number): any
{
    var idxRange = getCRIdxRangeForAC(effectiveAC);
    return { Low: Data.CRs[idxRange.low], High: Data.CRs[idxRange.high] };
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

    var idx = Data.CRs.indexOf(key);
    return idx;
}

function getExpectedACForCRIdx(idx: number): number
{
    var range = Data.ACCRRanges.find(r => r.low <= idx && idx <= r.high);
    return range.AC;
}

export function getExpectedACForCR(cr: number | string): number
{
    var idx = getIdxForCR(cr);
    return getExpectedACForCRIdx(idx);
}

function getDefensiveCRIdx(averageHp: number, effectiveAC: number) : number
{
    var hpCrIdx = getCRIdxForHP(averageHp);
    var acCrIdxRange = getCRIdxRangeForAC(effectiveAC);

    if (acCrIdxRange.low <= hpCrIdx && hpCrIdx <= acCrIdxRange.high)
        return hpCrIdx;

    var crAc = getExpectedACForCRIdx(hpCrIdx);
    var diff = effectiveAC - crAc;
    var crIncr = diff >= 0 ? Math.floor(diff / 2) : Math.ceil(diff / 2);

    var finalIdx = hpCrIdx + crIncr;
    return finalIdx;
}

export function getDefensiveCR(averageHp: number, effectiveAC: number) : string
{
    var finalIdx = getDefensiveCRIdx(averageHp, effectiveAC);
    return Data.CRs[finalIdx];
}

function getCRIdxForDPR(average: number): number
{
    var range = Data.DPRCRRanges.find(r => r.low <= average && average <= r.high);
    return range.CR;
}

export function getCRForDPR(average: number): string
{
    var idx = getCRIdxForDPR(average);
    return Data.CRs[idx];
}

function getExpectedABForCRIdx(idx: number): number
{
    var range = Data.ABCRRanges.find(r => r.low <= idx && idx <= r.high);
    return range.AB;
}

export function getExpectedABForCR(cr: number | string): number
{
    var idx = getIdxForCR(cr);
    return getExpectedABForCRIdx(idx);
}

function getExpectedDCForCRIdx(idx: number): number
{
    var range = Data.DCCRRanges.find(r => r.low <= idx && idx <= r.high);
    return range.DC;
}

export function getExpectedDCForCR(cr: number | string): number
{
    var idx = getIdxForCR(cr);
    return getExpectedDCForCRIdx(idx);
}

function getCRIdxRangeForAB(effectiveAB: number): Data.Range
{
    var range = Data.ABCRRanges.find(r => r.AB == effectiveAB);

    if (range == null)
    {
        if (effectiveAB <= 2)
            range = Data.ABCRRanges[0];
        else
            range = Data.ABCRRanges[12];
    }

    return range;
}

export function getCRRangeForAB(effectiveAB: number): any
{
    var idxRange = getCRIdxRangeForAB(effectiveAB);
    return { Low: Data.CRs[idxRange.low], High: Data.CRs[idxRange.high] };
}

function getOffensiveCRIdx(averageDPR: number, effectiveAB: number) : number
{
    var dprCrIdx = getCRIdxForDPR(averageDPR);
    var abCrIdxRange = getCRIdxRangeForAB(effectiveAB);
    // var dcCrIdxRange = getCRIdxRangeForDC(effectiveDC);

    if (abCrIdxRange.low <= dprCrIdx && dprCrIdx <= abCrIdxRange.high)
        return dprCrIdx;

    var crAb = getExpectedABForCRIdx(dprCrIdx);
    var diff = effectiveAB - crAb;
    var crIncr = diff >= 0 ? Math.floor(diff / 2) : Math.ceil(diff / 2);

    var finalIdx = dprCrIdx + crIncr;
    return finalIdx;
}

export function getOffensiveCR(averageDPR: number, effectiveAB: number) : string
{
    var finalIdx = getOffensiveCRIdx(averageDPR, effectiveAB);
    return Data.CRs[finalIdx];
}

export function getAverageCR(averageHp: number, effectiveAC: number, averageDPR: number, effectiveAB: number) : string
{
    var defCRIdx = getDefensiveCRIdx(averageHp, effectiveAC);
    var offCRIdx = getOffensiveCRIdx(averageDPR, effectiveAB);

    if (defCRIdx >= 4 && offCRIdx >= 4)
    {
        var averageIdx = Math.round((defCRIdx + offCRIdx) / 2);
        return Data.CRs[averageIdx];
    }

    // lolmaths
    var defCR = defCRIdx == 0 ? 0 :
                defCRIdx >= 4 ? (defCRIdx - 3) :
                (1 << defCRIdx) / 16;
    var offCR = offCRIdx == 0 ? 0 :
                offCRIdx >= 4 ? (offCRIdx - 3) :
                (1 << offCRIdx) / 16;
    var ave = (offCR + defCR) / 2;

    if (ave >= 1)
        return Math.round(ave).toString();

    ave *= 16;
    switch (ave) // blech, manual shit...
    {
        case 0:
            return Data.CRs[0];
        case 1: // 1/16
        case 2: // 2/16, 1/8
            return Data.CRs[1];
        case 3: // 3/16
        case 4: // 1/4
        case 5: // 5/16
            return Data.CRs[2];
        case 6: // 3/8
        case 7: // 7/16
        case 8: // 1/2
        case 9: // 9/16
        case 10: // 5/8
        case 11: // 11/16
            return Data.CRs[3];

        default: // >= 3/4
            return Data.CRs[4];
    }
}

function getCRIdxRangeForProficiency(proficiencyBonus: number): Data.Range
{
    var range = Data.ProficiencyCRRanges.find(r => r.proficiency == proficiencyBonus);
    return range;
}

export function getCRRangeForProficiency(proficiencyBonus: number): any
{
    var idxRange = getCRIdxRangeForProficiency(proficiencyBonus);
    return { Low: Data.CRs[idxRange.low], High: Data.CRs[idxRange.high] };
}
