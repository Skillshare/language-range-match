import {
    basicRangeContainsTag,
    basicRangeStrictMatchesTag,
    buildCascadeForRange,
    extendedRangeContainsTag,
    extendedRangeStrictMatchesTag,
    RangeTagComparator,
} from './comparator';
import { LanguagePriorityRanges, Match, SupportedTags } from './model';
import { isValidBasicRange, isValidExtendedRange, RangeValidator } from './validators';

export * from './model';

export type Filter = (supportedTags: SupportedTags, languageRanges: LanguagePriorityRanges) => Match[];

export type Lookup = (supportedTags: SupportedTags, languageRanges: LanguagePriorityRanges) => Match | undefined;

const removeDupes = (matches: Match[]): Match[] => {
    return [...new Set(matches)];
};

const generateFilter = (matchFn: RangeTagComparator) => {
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

export const generateLookup = (rangeValidator: RangeValidator, rangeTagComparator: RangeTagComparator): Lookup => {
    return (supportedTags: SupportedTags, languageRanges: LanguagePriorityRanges): Match | undefined => {
        if (!languageRanges) {
            return undefined;
        }
        //Early exit makes more sense here, so use vanilla for loop
        for (let range of languageRanges) {
            if (!range || !rangeValidator(range) || range === WILDCARD) {
                continue;
            }
            const cascadingRanges = buildCascadeForRange(range);
            for (let cascadingRange of cascadingRanges) {
                if (cascadingRange === WILDCARD) {
                    continue;
                }
                const strictMatchingTag = supportedTags.find((tag) => rangeTagComparator(cascadingRange, tag));
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
};

export const basicLookup: Lookup = generateLookup(isValidBasicRange, basicRangeStrictMatchesTag);

export const extendedLookup: Lookup = generateLookup(isValidExtendedRange, extendedRangeStrictMatchesTag);

const WILDCARD = '*';
