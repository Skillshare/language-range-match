import { LanguagePriorityRanges, MatchingTag, SupportedTags } from './model';
export * from './model';
export declare type Filter = (supportedTags: SupportedTags, languageRanges: LanguagePriorityRanges) => MatchingTag[];
export declare type Lookup = (supportedTags: SupportedTags, languageRanges: LanguagePriorityRanges) => MatchingTag | undefined;
export declare const basicFilter: Filter;
export declare const extendedFilter: Filter;
export declare const basicLookup: Lookup;
