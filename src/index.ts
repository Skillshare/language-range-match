import {
    basicRangeContainsTag,
    basicRangeStrictMatchesTag,
    buildCascadeForBasicRange,
    extendedRangeContainsTag,
    extendedRangeMatchesTag,
    RangeContainsTag,
} from './comparator';
import { LanguagePriorityRanges, Match, SupportedTags } from './model';
import { isValidBasicRange, isValidExtendedRange } from './validators';

export * from './model';

export type Filter = (supportedTags: SupportedTags, languageRanges: LanguagePriorityRanges) => Match[];

export type Lookup = (supportedTags: SupportedTags, languageRanges: LanguagePriorityRanges) => Match | undefined;

const removeDupes = (matches: Match[]): Match[] => {
    return [...new Set(matches)];
};

const generateFilter = (matchFn: RangeContainsTag) => {
    return (supportedTags: SupportedTags, languageRanges: LanguagePriorityRanges): Match[] => {
        if (!languageRanges) {
            return [];
        }
        const allMatches = languageRanges
            .map((range) => {
                let matchingTags = supportedTags.filter((tag) => matchFn(range, tag));
                return matchingTags.map((matchingTag) => ({
                    matchedRange: range,
                    matchingTag: matchingTag,
                }));
            })
            .reduce((prev, curr) => {
                return prev.concat(curr);
            }, []);
        return removeDupes(allMatches);
    };
};

export const basicFilter: Filter = generateFilter(basicRangeContainsTag);

export const extendedFilter: Filter = generateFilter(extendedRangeContainsTag);

export const basicLookup: Lookup = (
    supportedTags: SupportedTags,
    languageRanges: LanguagePriorityRanges,
): Match | undefined => {
    if (!languageRanges) {
        return undefined;
    }
    //Early exit makes more sense here, so use vanilla for loop
    for (let range of languageRanges) {
        if (!range || !isValidBasicRange(range) || range === WILDCARD) {
            continue;
        }
        const cascadingRanges = buildCascadeForBasicRange(range);
        for (let cascadingRange of cascadingRanges) {
            const matchingTag = supportedTags.find((tag) => basicRangeStrictMatchesTag(cascadingRange, tag));
            if (matchingTag) {
                return {
                    matchedRange: range,
                    matchingTag: matchingTag,
                };
            }
        }
    }

    return undefined;
};

export const extendedLookup: Lookup = (
    supportedTags: SupportedTags,
    languageRanges: LanguagePriorityRanges,
): Match | undefined => {
    if (!languageRanges) {
        return undefined;
    }
    //Early exit makes more sense here, so use vanilla for loop
    for (let range of languageRanges) {
        if (!range || !isValidExtendedRange(range) || range === WILDCARD) {
            continue;
        }
        const cascadingRanges = buildCascadeForBasicRange(range);
        for (let cascadingRange of cascadingRanges) {
            if (cascadingRange === WILDCARD) {
                continue;
            }
            const strictMatchingTag = supportedTags.find((tag) => extendedRangeMatchesTag(cascadingRange, tag, false));
            if (strictMatchingTag) {
                return {
                    matchedRange: range,
                    matchingTag: strictMatchingTag,
                };
            }
        }
    }

    return undefined;
};

const WILDCARD = '*';
