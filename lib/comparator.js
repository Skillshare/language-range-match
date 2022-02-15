"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendedRangeContainsTag = exports.basicRangeContainsTag = exports.basicRangeStrictMatchesTag = exports.buildCascadeForBasicRange = void 0;
const WILDCARD = "*";
/**
 *  E.x. Cascade for zh-Hant-CN-x-private1-private2
 *  1. zh-Hant-CN-x-private1-private2
 *  2. zh-Hant-CN-x-private1
 *  3. zh-Hant-CN
 *  4. zh-Hant
 *  5. zh
 */
const buildCascadeForBasicRange = (basicRange) => {
    let subTags = getSubTags(basicRange);
    if (subTags.length === 1)
        return [basicRange];
    subTags.pop();
    while (subTags[subTags.length - 1].length === 1)
        subTags.pop();
    return [basicRange, ...(0, exports.buildCascadeForBasicRange)(subTags.join("-"))];
};
exports.buildCascadeForBasicRange = buildCascadeForBasicRange;
const basicRangeStrictMatchesTag = (basicRange, tag) => {
    if (basicRange === WILDCARD)
        return true;
    let downShiftedRange = basicRange.toLowerCase();
    let downShiftedTag = tag.toLowerCase();
    return downShiftedRange === downShiftedTag;
};
exports.basicRangeStrictMatchesTag = basicRangeStrictMatchesTag;
const basicRangeContainsTag = (basicRange, tag) => {
    if (basicRange === WILDCARD)
        return true;
    let downShiftedRange = basicRange.toLowerCase();
    let downShiftedTag = tag.toLowerCase();
    if (downShiftedRange === downShiftedTag)
        return true;
    return downShiftedTag.startsWith(downShiftedRange) &&
        downShiftedTag.length > downShiftedRange.length &&
        //Easiest way to check the next character is -.
        downShiftedTag[downShiftedRange.length] === '-';
};
exports.basicRangeContainsTag = basicRangeContainsTag;
const extendedRangeContainsTag = (extendedRange, tag) => {
    if (extendedRange === WILDCARD)
        return true;
    let downShiftedRange = extendedRange.toLowerCase();
    let downShiftedTag = tag.toLowerCase();
    if (downShiftedRange === downShiftedTag)
        return true;
    let rangeSubTags = getSubTags(downShiftedRange);
    let tagSubTags = getSubTags(downShiftedTag);
    let valid = true;
    let rangeIdx = 0;
    let tagIdx = 0;
    //3.3.2.4
    while (rangeIdx < rangeSubTags.length && valid) {
        let rangeSubTag = rangeSubTags[rangeIdx];
        let tagSubTag = tagSubTags[tagIdx];
        //3.3.2.2
        if (rangeIdx === 0) {
            if (areSubTagsEqual(rangeSubTag, tagSubTag)) {
                rangeIdx++;
                tagIdx++;
                continue;
            }
            else {
                valid = false;
                break;
            }
        }
        //3.3.2.3
        //3.3.2.3.A
        if (rangeSubTag === WILDCARD) {
            rangeIdx++;
            continue;
        }
        //3.3.2.3.B
        if (!tagSubTag || tagIdx >= tagSubTags.length) {
            valid = false;
            break;
        }
        //3.3.2.3.C
        if (areSubTagsEqual(rangeSubTag, tagSubTag)) {
            rangeIdx++;
            tagIdx++;
            continue;
        }
        //3.3.2.3.D
        if (tagSubTag.length === 1) {
            valid = false;
            break;
        }
        //3.3.2.3.E
        tagIdx++;
        continue;
    }
    return valid;
};
exports.extendedRangeContainsTag = extendedRangeContainsTag;
const areSubTagsEqual = (rangeSubTag, tagSubTag) => {
    if (!rangeSubTag || !tagSubTag)
        return false;
    return rangeSubTag === WILDCARD ||
        rangeSubTag.toLowerCase() === tagSubTag.toLowerCase();
};
const getSubTags = (tag) => {
    return tag.split("-");
};
