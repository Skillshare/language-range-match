//2.1
export const isValidBasicRange = (basicRange) => {
    return !!(basicRange) && /^(\*|([a-zA-Z]{1,8}(-[a-zA-Z0-9]{1,8})*))$/.test(basicRange);
};
//2.2
export const isValidExtendedRange = (extendedRange) => {
    return !!(extendedRange) && /^([a-zA-Z]{1,8}|\*)(-([a-zA-Z0-9]{1,8}|\*))*$/.test(extendedRange);
};
