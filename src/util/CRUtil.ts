import * as Data from "src/data/cr";
import { Range } from "src/types";

/* tslint:disable:no-bitwise */

/* IMPORTANT NOTE: ALL CRs are actually INDICES on the CRs array.
This allows us to Increment or Decrement CR by "1", so that 1 goes down to 1/2,
1/8 goes up to 1/4, etc... */

function getCRIdxForHP(average: number): number
{
    const range = Data.HPCRRanges.find(r => r.low <= average && average <= r.high);
    return range ? range.CR : 0;
}

export function getCRForHP(average: number): string
{
    const idx = getCRIdxForHP(average);
    return Data.CRs[idx];
}

function getCRIdxRangeForAC(effectiveAC: number): Range
{
    let range = Data.ACCRRanges.find(r => r.AC === effectiveAC);

    range = range || effectiveAC <= 12
                     ? Data.ACCRRanges[0]
                     : Data.ACCRRanges[7];

    return range;
}

export function getCRRangeForAC(effectiveAC: number): any
{
    const idxRange = getCRIdxRangeForAC(effectiveAC);
    return { Low: Data.CRs[idxRange.low], High: Data.CRs[idxRange.high] };
}

function getIdxForCR(cr: number | string): number
{
    let key: string;
    if (typeof cr === "string")
        key = cr;
    else
        key = cr > 0 && cr < 1
        ? (cr === 0.125 ? "1/8" : cr === 0.25 ? "1/4" : "1/2")
        : cr.toString();

    const idx = Data.CRs.indexOf(key);
    return idx;
}

function getExpectedACForCRIdx(idx: number): number
{
    const range = Data.ACCRRanges.find(r => r.low <= idx && idx <= r.high);
    return range ? range.AC : -1;
}

export function getExpectedACForCR(cr: number | string): number
{
    const idx = getIdxForCR(cr);
    return getExpectedACForCRIdx(idx);
}

function getDefensiveCRIdx(averageHp: number, effectiveAC: number): number
{
    const hpCrIdx = getCRIdxForHP(averageHp);
    const acCrIdxRange = getCRIdxRangeForAC(effectiveAC);

    if (acCrIdxRange.low <= hpCrIdx && hpCrIdx <= acCrIdxRange.high)
        return hpCrIdx;

    const crIncr = getCRAdjustmentForAC(averageHp, effectiveAC);

    const finalIdx = hpCrIdx + crIncr;
    return finalIdx;
}

export function getCRAdjustmentForAC(averageHp: number, effectiveAC: number): number
{
    const hpCrIdx = getCRIdxForHP(averageHp);
    const crAc = getExpectedACForCRIdx(hpCrIdx);
    const diff = effectiveAC - crAc;
    const crIncr = diff >= 0 ? Math.floor(diff / 2) : Math.ceil(diff / 2);
    return crIncr;
}

export function getDefensiveCR(averageHp: number, effectiveAC: number): string
{
    const finalIdx = getDefensiveCRIdx(averageHp, effectiveAC);
    return Data.CRs[finalIdx];
}

function getCRIdxForDPR(average: number): number
{
    const range = Data.DPRCRRanges.find(r => r.low <= average && average <= r.high);
    return range ? range.CR : -1;
}

export function getCRForDPR(average: number): string
{
    const idx = getCRIdxForDPR(average);
    return Data.CRs[idx];
}

function getExpectedABForCRIdx(idx: number): number
{
    const range = Data.ABCRRanges.find(r => r.low <= idx && idx <= r.high);
    return range ? range.AB : -1;
}

export function getExpectedABForCR(cr: number | string): number
{
    const idx = getIdxForCR(cr);
    return getExpectedABForCRIdx(idx);
}

function getExpectedDCForCRIdx(idx: number): number
{
    const range = Data.DCCRRanges.find(r => r.low <= idx && idx <= r.high);
    return range ? range.DC : -1;
}

export function getExpectedDCForCR(cr: number | string): number
{
    const idx = getIdxForCR(cr);
    return getExpectedDCForCRIdx(idx);
}

function getCRIdxRangeForAB(effectiveAB: number): Range
{
    let range = Data.ABCRRanges.find(r => r.AB === effectiveAB);

    range = range || effectiveAB <= 2
                     ? Data.ABCRRanges[0]
                     : Data.ABCRRanges[12];

    return range;
}

export function getCRRangeForAB(effectiveAB: number): any
{
    const idxRange = getCRIdxRangeForAB(effectiveAB);
    return { Low: Data.CRs[idxRange.low], High: Data.CRs[idxRange.high] };
}

function getOffensiveCRIdx(averageDPR: number, effectiveAB: number): number
{
    const dprCrIdx = getCRIdxForDPR(averageDPR);
    const abCrIdxRange = getCRIdxRangeForAB(effectiveAB);
    // var dcCrIdxRange = getCRIdxRangeForDC(effectiveDC);

    if (abCrIdxRange.low <= dprCrIdx && dprCrIdx <= abCrIdxRange.high)
        return dprCrIdx;

    const crAb = getExpectedABForCRIdx(dprCrIdx);
    const diff = effectiveAB - crAb;
    const crIncr = diff >= 0 ? Math.floor(diff / 2) : Math.ceil(diff / 2);

    const finalIdx = dprCrIdx + crIncr;
    return finalIdx;
}

export function getOffensiveCR(averageDPR: number, effectiveAB: number): string
{
    const finalIdx = getOffensiveCRIdx(averageDPR, effectiveAB);
    return Data.CRs[finalIdx];
}

export function getAverageCR(averageHp: number, effectiveAC: number, averageDPR: number, effectiveAB: number): string
{
    const defCRIdx = getDefensiveCRIdx(averageHp, effectiveAC);
    const offCRIdx = getOffensiveCRIdx(averageDPR, effectiveAB);

    if (defCRIdx >= 4 && offCRIdx >= 4)
    {
        const averageIdx = Math.round((defCRIdx + offCRIdx) / 2);
        return Data.CRs[averageIdx];
    }

    // lolmaths
    const defCR = defCRIdx === 0 ? 0 :
                defCRIdx >= 4 ? (defCRIdx - 3) :
                (1 << defCRIdx) / 16;
    const offCR = offCRIdx === 0 ? 0 :
                offCRIdx >= 4 ? (offCRIdx - 3) :
                (1 << offCRIdx) / 16;
    let ave = (offCR + defCR) / 2;

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

function getCRIdxRangeForProficiency(proficiencyBonus: number): Range
{
    const range = Data.ProficiencyCRRanges.find(r => r.proficiency === proficiencyBonus);
    return range || { low: -1, high: -1 };
}

export function getCRRangeForProficiency(proficiencyBonus: number): any
{
    const idxRange = getCRIdxRangeForProficiency(proficiencyBonus);
    return { Low: Data.CRs[idxRange.low], High: Data.CRs[idxRange.high] };
}
