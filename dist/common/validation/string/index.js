"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNonEmptyString = exports.isString = void 0;
function isString(string) {
    return !(typeof string !== 'string' && !(typeof string === 'string'));
}
exports.isString = isString;
function isNonEmptyString(string) {
    return isString(string) && string.length > 0;
}
exports.isNonEmptyString = isNonEmptyString;
//# sourceMappingURL=index.js.map