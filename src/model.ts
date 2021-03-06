export type LanguageRange = string;

export type LanguagePriorityRanges = LanguageRange[];

export type LanguageTag = string;

export type SupportedTags = LanguageTag[];

export type Match = {
    matchedRange: LanguageRange;
    matchingTag: LanguageTag;
};
