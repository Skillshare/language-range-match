"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicLookup = exports.extendedFilter = exports.basicFilter = void 0;
const comparator_1 = require("./comparator");
const validators_1 = require("./validators");
__exportStar(require("./model"), exports);
const removeDupes = (matches) => {
    return [...new Set(matches)];
};
const generateFilter = (matchFn) => {
    return (supportedTags, languageRanges) => {
        if (!languageRanges)
            return [];
        const allMatches = languageRanges.map(range => {
            return supportedTags.filter(tag => matchFn(range, tag));
        }).reduce((prev, curr) => {
            return prev.concat(curr);
        }, []);
        return removeDupes(allMatches);
    };
};
exports.basicFilter = generateFilter(comparator_1.basicRangeContainsTag);
exports.extendedFilter = generateFilter(comparator_1.extendedRangeContainsTag);
const basicLookup = (supportedTags, languageRanges) => {
    if (!languageRanges)
        return undefined;
    //Early exit makes more sense here, so use vanilla for loop
    for (let range of languageRanges) {
        if (!range || !(0, validators_1.isValidBasicRange)(range) || range === WILDCARD)
            continue;
        let cascadingRanges = (0, comparator_1.buildCascadeForBasicRange)(range);
        for (let cascadingRange of cascadingRanges) {
            let matchedTag = supportedTags.find(tag => (0, comparator_1.basicRangeStrictMatchesTag)(cascadingRange, tag));
            if (matchedTag)
                return matchedTag;
        }
    }
    return undefined;
};
exports.basicLookup = basicLookup;
const WILDCARD = "*";
