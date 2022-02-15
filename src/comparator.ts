import { LanguageRange, LanguageTag } from ".";

const WILDCARD = "*";

/**
 *  E.x. Cascade for zh-Hant-CN-x-private1-private2
 *  1. zh-Hant-CN-x-private1-private2
 *  2. zh-Hant-CN-x-private1
 *  3. zh-Hant-CN
 *  4. zh-Hant
 *  5. zh
 */
 export const buildCascadeForBasicRange = (basicRange: LanguageRange): LanguageRange[] => {
    let subTags = getSubTags(basicRange);
    if (subTags.length === 1) return [basicRange];
    subTags.pop();
    while (subTags[subTags.length-1].length === 1) subTags.pop();
    return [basicRange, ...buildCascadeForBasicRange(subTags.join("-"))];
}

export type RangeStrictMatchesTag = (basicRange: LanguageRange, tag: LanguageTag)=> boolean;

export const basicRangeStrictMatchesTag: RangeStrictMatchesTag = (basicRange: LanguageRange, tag: LanguageTag): boolean => {
    if (basicRange === WILDCARD) return true;
    let downShiftedRange = basicRange.toLowerCase();
    let downShiftedTag = tag.toLowerCase();
    return downShiftedRange === downShiftedTag;
}

/**
 * A range contains a tag if the tag is a subset of the range. 
 * 
 * Note that conceptually this is the opposite of string subsets.
 * 
 * For example, the tag en-US is a subset of the range en
 */
export type RangeContainsTag = (basicRange: LanguageRange, tag: LanguageTag)=> boolean;

export const basicRangeContainsTag: RangeContainsTag = (basicRange: LanguageRange, tag: LanguageTag): boolean => {
    if (basicRange === WILDCARD) return true;
    let downShiftedRange = basicRange.toLowerCase();
    let downShiftedTag = tag.toLowerCase();
    if (downShiftedRange === downShiftedTag) return true;
    return downShiftedTag.startsWith(downShiftedRange) && 
        downShiftedTag.length > downShiftedRange.length &&
        //Easiest way to check the next character is -.
        downShiftedTag[downShiftedRange.length] === '-';
}

export const extendedRangeContainsTag: RangeContainsTag = (extendedRange: LanguageRange, tag: LanguageTag): boolean => {
    if(extendedRange === WILDCARD) return true;
    let downShiftedRange = extendedRange.toLowerCase();
    let downShiftedTag = tag.toLowerCase();
    if (downShiftedRange === downShiftedTag) return true;
    let rangeSubTags = getSubTags(downShiftedRange);
    let tagSubTags = getSubTags(downShiftedTag);
    let valid = true;
    let rangeIdx = 0; let tagIdx = 0;
    //3.3.2.4
    while(rangeIdx < rangeSubTags.length && valid) {
        let rangeSubTag = rangeSubTags[rangeIdx];
        let tagSubTag =  tagSubTags[tagIdx];
        //3.3.2.2
        if (rangeIdx === 0) {
            if (areSubTagsEqual(rangeSubTag, tagSubTag)) {
                rangeIdx++; tagIdx++; continue;
            }
            else {
                valid = false; break;
            }
        }
        
        //3.3.2.3
        //3.3.2.3.A
        if (rangeSubTag === WILDCARD) {
            rangeIdx++; continue;
        }
        //3.3.2.3.B
        if (!tagSubTag || tagIdx >= tagSubTags.length) {
            valid = false; break;
        }
        //3.3.2.3.C
        if (areSubTagsEqual(rangeSubTag, tagSubTag)) {
            rangeIdx++; tagIdx++; continue;
        }
        //3.3.2.3.D
        if (tagSubTag.length === 1) {
            valid = false; break;
        }
        //3.3.2.3.E
        tagIdx++; continue;
    }
    return valid;
}

const areSubTagsEqual = (rangeSubTag: LanguageTag, tagSubTag: LanguageTag) => {
    if (!rangeSubTag || !tagSubTag) return false;
    return rangeSubTag === WILDCARD ||
        rangeSubTag.toLowerCase() === tagSubTag.toLowerCase();
}

const getSubTags = (tag: string): string[] => {
    return tag.split("-");
}