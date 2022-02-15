"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidExtendedRange = exports.isValidBasicRange = void 0;
//2.1
const isValidBasicRange = (basicRange) => {
    return !!(basicRange) && /^(\*|([a-zA-Z]{1,8}(-[a-zA-Z0-9]{1,8})*))$/.test(basicRange);
};
exports.isValidBasicRange = isValidBasicRange;
//2.2
const isValidExtendedRange = (extendedRange) => {
    return !!(extendedRange) && /^([a-zA-Z]{1,8}|\*)(-([a-zA-Z0-9]{1,8}|\*))*$/.test(extendedRange);
};
exports.isValidExtendedRange = isValidExtendedRange;
