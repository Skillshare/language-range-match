import { basicRangeContainsTag, extendedRangeContainsTag, buildCascadeForBasicRange, basicRangeStrictMatchesTag } from './comparator';
import { isValidBasicRange } from './validators';
export * from './model';
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
export const basicFilter = generateFilter(basicRangeContainsTag);
export const extendedFilter = generateFilter(extendedRangeContainsTag);
export const basicLookup = (supportedTags, languageRanges) => {
    if (!languageRanges)
        return undefined;
    //Early exit makes more sense here, so use vanilla for loop
    for (let range of languageRanges) {
        if (!range || !isValidBasicRange(range) || range === WILDCARD)
            continue;
        let cascadingRanges = buildCascadeForBasicRange(range);
        for (let cascadingRange of cascadingRanges) {
            let matchedTag = supportedTags.find(tag => basicRangeStrictMatchesTag(cascadingRange, tag));
            if (matchedTag)
                return matchedTag;
        }
    }
    return undefined;
};
const WILDCARD = "*";
