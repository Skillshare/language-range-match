import { LanguageRange } from './model';

export type RangeValidator = (range: LanguageRange) => boolean;

//2.1
export const isValidBasicRange: RangeValidator = (basicRange: LanguageRange): boolean => {
    return !!basicRange && /^(\*|([a-zA-Z]{1,8}(-[a-zA-Z0-9]{1,8})*))$/.test(basicRange);
};

//2.2
export const isValidExtendedRange: RangeValidator = (extendedRange: LanguageRange): boolean => {
    return !!extendedRange && /^([a-zA-Z]{1,8}|\*)(-([a-zA-Z0-9]{1,8}|\*))*$/.test(extendedRange);
};
