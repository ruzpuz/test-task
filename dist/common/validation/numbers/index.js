"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFloat = exports.isPositiveOrZeroInteger = exports.isPositiveInteger = exports.isInteger = void 0;
function parseStrictInt(variable) {
    if (/^([+-])?([0-9]+|Infinity)$/.test(variable)) {
        return Number(variable);
    }
    return NaN;
}
function parseStrictFloat(variable) {
    if (/^([+-])?([0-9]+(\.[0-9]+)?|Infinity)$/.test(variable)) {
        return Number(variable);
    }
    return NaN;
}
function isInteger(variable) {
    return !isNaN(parseStrictInt(variable));
}
exports.isInteger = isInteger;
function isPositiveInteger(variable) {
    const parsed = parseStrictInt(variable);
    return !isNaN(parsed) && parsed > 0;
}
exports.isPositiveInteger = isPositiveInteger;
function isPositiveOrZeroInteger(variable) {
    const parsed = parseStrictInt(variable);
    return !isNaN(parsed) && parsed >= 0;
}
exports.isPositiveOrZeroInteger = isPositiveOrZeroInteger;
function isFloat(variable) {
    return !isNaN(parseStrictFloat(variable));
}
exports.isFloat = isFloat;
//# sourceMappingURL=index.js.map