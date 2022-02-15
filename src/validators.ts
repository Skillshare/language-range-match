import { LanguageRange } from './model';

//2.1
export const isValidBasicRange = (basicRange: LanguageRange): boolean => {
    return !!basicRange && /^(\*|([a-zA-Z]{1,8}(-[a-zA-Z0-9]{1,8})*))$/.test(basicRange);
};

//2.2
export const isValidExtendedRange = (extendedRange: LanguageRange): boolean => {
    return !!extendedRange && /^([a-zA-Z]{1,8}|\*)(-([a-zA-Z0-9]{1,8}|\*))*$/.test(extendedRange);
};
