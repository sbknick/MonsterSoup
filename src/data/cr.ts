
/* IMPORTANT NOTE: ALL CRs are actually INDICES on the CRs array.
This allows us to Increment or Decrement CR by "1", so that 1 goes down to 1/2,
1/8 goes up to 1/4, etc... */

export interface Range
{
    low: number;
    high: number;
}

// all CR indices are 3 higher than the CR they represent,
// (as soon as the index is > 3, at least)
export const CRs: string[] =
[
    "0", "1/8", "1/4", "1/2", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
    "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
    "21", "22", "23", "24", "25", "26", "27", "28", "29", "30",
];

//#region Proficiency CR

interface ProficiencyCRRange extends Range
{
    proficiency: number;
}

export const ProficiencyCRRanges: ProficiencyCRRange[] =
[
    { proficiency: 2, low: 0, high: 7 },
    { proficiency: 3, low: 8, high: 11 },
    { proficiency: 4, low: 12, high: 15 },
    { proficiency: 5, low: 16, high: 19 },
    { proficiency: 6, low: 20, high: 23 },
    { proficiency: 7, low: 24, high: 27 },
    { proficiency: 8, low: 28, high: 31 },
    { proficiency: 9, low: 32, high: 33 },
];

//#endregion

//#region HP CR

interface HPCRRange extends Range
{
    CR: number;
}

export const HPCRRanges: HPCRRange[] =
[
    { low: 1, high: 6, CR: 0 },
    { low: 7, high: 35, CR: 1 },
    { low: 36, high: 49, CR: 2 },
    { low: 50, high: 70, CR: 3 },
    { low: 71, high: 85, CR: 4 },
    { low: 86, high: 100, CR: 5 },
    { low: 101, high: 115, CR: 6 },
    { low: 116, high: 130, CR: 7 },
    { low: 131, high: 145, CR: 8 },
    { low: 146, high: 160, CR: 9 },
    { low: 161, high: 175, CR: 10 },
    { low: 176, high: 190, CR: 11 },
    { low: 191, high: 205, CR: 12 },
    { low: 206, high: 220, CR: 13 },
    { low: 221, high: 235, CR: 14 },
    { low: 236, high: 250, CR: 15 },
    { low: 251, high: 265, CR: 16 },
    { low: 266, high: 280, CR: 17 },
    { low: 281, high: 295, CR: 18 },
    { low: 296, high: 310, CR: 19 },
    { low: 311, high: 325, CR: 20 },
    { low: 326, high: 340, CR: 21 },
    { low: 341, high: 355, CR: 22 },
    { low: 356, high: 400, CR: 23 },
    { low: 401, high: 445, CR: 24 },
    { low: 446, high: 490, CR: 25 },
    { low: 491, high: 535, CR: 26 },
    { low: 536, high: 580, CR: 27 },
    { low: 581, high: 625, CR: 28 },
    { low: 626, high: 670, CR: 29 },
    { low: 671, high: 715, CR: 30 },
    { low: 716, high: 760, CR: 31 },
    { low: 761, high: 805, CR: 32 },
    { low: 806, high: 850, CR: 33 },
];

//#endregion

//#region AC CR

interface ACCRRange extends Range
{
    AC: number;
}

export const ACCRRanges: ACCRRange[] =
[
    { AC: 0, low: 0, high: 0 },
    { AC: 13, low: 0, high: 6 },
    { AC: 14, low: 7, high: 7 },
    { AC: 15, low: 8, high: 10 },
    { AC: 16, low: 11, high: 12 },
    { AC: 17, low: 13, high: 15 },
    { AC: 18, low: 16, high: 19 },
    { AC: 19, low: 20, high: 33 },
];

//#endregion

//#region DPR CR

interface DPRCRRange extends Range
{
    CR: number;
}

export const DPRCRRanges: DPRCRRange[] =
[
    { low: 0, high: 1, CR: 0 },
    { low: 2, high: 3, CR: 1 / 8 },
    { low: 4, high: 5, CR: 1 / 4 },
    { low: 6, high: 8, CR: 1 / 2 },
    { low: 9, high: 14, CR: 1 },
    { low: 15, high: 20, CR: 2 },
    { low: 21, high: 26, CR: 3 },
    { low: 27, high: 32, CR: 4 },
    { low: 33, high: 38, CR: 5 },
    { low: 39, high: 44, CR: 6 },
    { low: 45, high: 50, CR: 7 },
    { low: 51, high: 56, CR: 8 },
    { low: 57, high: 62, CR: 9 },
    { low: 63, high: 68, CR: 10 },
    { low: 69, high: 74, CR: 11 },
    { low: 75, high: 80, CR: 12 },
    { low: 81, high: 86, CR: 13 },
    { low: 87, high: 92, CR: 14 },
    { low: 93, high: 98, CR: 15 },
    { low: 99, high: 104, CR: 16 },
    { low: 105, high: 110, CR: 17 },
    { low: 111, high: 116, CR: 18 },
    { low: 117, high: 122, CR: 19 },
    { low: 123, high: 140, CR: 20 },
    { low: 141, high: 158, CR: 21 },
    { low: 159, high: 176, CR: 22 },
    { low: 177, high: 194, CR: 23 },
    { low: 195, high: 212, CR: 24 },
    { low: 213, high: 230, CR: 25 },
    { low: 231, high: 248, CR: 26 },
    { low: 249, high: 266, CR: 27 },
    { low: 267, high: 284, CR: 28 },
    { low: 285, high: 302, CR: 29 },
    { low: 303, high: 320, CR: 30 },
];

//#endregion

//#region AB CR

interface ABCRRange extends Range
{
    AB: number;
}

export const ABCRRanges: ABCRRange[] =
[
    { AB: 0, low: 0, high: 0 },
    { AB: 3, low: 0, high: 5 },
    { AB: 4, low: 6, high: 6 },
    { AB: 5, low: 7, high: 7 },
    { AB: 6, low: 8, high: 10 },
    { AB: 7, low: 11, high: 13 },
    { AB: 8, low: 14, high: 18 },
    { AB: 9, low: 19, high: 19 },
    { AB: 10, low: 20, high: 23 },
    { AB: 11, low: 24, high: 26 },
    { AB: 12, low: 27, high: 29 },
    { AB: 13, low: 30, high: 32 },
    { AB: 14, low: 33, high: 33 },
];

//#endregion

//#region DC CR

interface DCCRRange extends Range
{
    DC: number;
}

export const DCCRRanges: DCCRRange[] =
[
    { DC: 0, low: 0, high: 0 },
    { DC: 13, low: 0, high: 6 },
    { DC: 14, low: 7, high: 7 },
    { DC: 15, low: 8, high: 10 },
    { DC: 16, low: 11, high: 13 },
    { DC: 17, low: 14, high: 15 },
    { DC: 18, low: 16, high: 19 },
    { DC: 19, low: 20, high: 23 },
    { DC: 20, low: 24, high: 26 },
    { DC: 21, low: 27, high: 29 },
    { DC: 22, low: 30, high: 32 },
    { DC: 23, low: 33, high: 33 },
];

//#endregion
