"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patternValidation = void 0;
function patternValidation(text, pattern) {
    return (new RegExp(pattern).test(text));
}
exports.patternValidation = patternValidation;
//# sourceMappingURL=index.js.map