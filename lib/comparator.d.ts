import { LanguageRange, LanguageTag } from ".";
/**
 *  E.x. Cascade for zh-Hant-CN-x-private1-private2
 *  1. zh-Hant-CN-x-private1-private2
 *  2. zh-Hant-CN-x-private1
 *  3. zh-Hant-CN
 *  4. zh-Hant
 *  5. zh
 */
export declare const buildCascadeForBasicRange: (basicRange: LanguageRange) => LanguageRange[];
export declare type RangeStrictMatchesTag = (basicRange: LanguageRange, tag: LanguageTag) => boolean;
export declare const basicRangeStrictMatchesTag: RangeStrictMatchesTag;
/**
 * A range contains a tag if the tag is a subset of the range.
 *
 * Note that conceptually this is the opposite of string subsets.
 *
 * For example, the tag en-US is a subset of the range en
 */
export declare type RangeContainsTag = (basicRange: LanguageRange, tag: LanguageTag) => boolean;
export declare const basicRangeContainsTag: RangeContainsTag;
export declare const extendedRangeContainsTag: RangeContainsTag;
