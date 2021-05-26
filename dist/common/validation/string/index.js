"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNonEmptyString = exports.isString = void 0;
const pattern_1 = require("../pattern");
function isString(string) {
    return !(typeof string !== 'string' && !(typeof string === 'string'));
}
exports.isString = isString;
function isNonEmptyString(string) {
    return isString(string) && !pattern_1.patternValidation(string, '^$');
}
exports.isNonEmptyString = isNonEmptyString;
//# sourceMappingURL=index.js.map