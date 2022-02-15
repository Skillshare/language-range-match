import {
    basicRangeContainsTag,
    basicRangeStrictMatchesTag,
    buildCascadeForBasicRange,
    extendedRangeContainsTag,
    RangeContainsTag,
} from './comparator';
import { LanguagePriorityRanges, MatchingTag, SupportedTags } from './model';
import { isValidBasicRange } from './validators';

export * from './model';

export type Filter = (supportedTags: SupportedTags, languageRanges: LanguagePriorityRanges) => MatchingTag[];

export type Lookup = (supportedTags: SupportedTags, languageRanges: LanguagePriorityRanges) => MatchingTag | undefined;

const removeDupes = (matches: MatchingTag[]): MatchingTag[] => {
    return [...new Set(matches)];
};

const generateFilter = (matchFn: RangeContainsTag) => {
    return (supportedTags: SupportedTags, languageRanges: LanguagePriorityRanges): MatchingTag[] => {
        if (!languageRanges) {
            return [];
        }
        const allMatches = languageRanges
            .map((range) => {
                return supportedTags.filter((tag) => matchFn(range, tag));
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
): MatchingTag | undefined => {
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
            const matchedTag = supportedTags.find((tag) => basicRangeStrictMatchesTag(cascadingRange, tag));
            if (matchedTag) {
                return matchedTag;
            }
        }
    }

    return undefined;
};

const WILDCARD = '*';
