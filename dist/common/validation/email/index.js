"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidEmail = void 0;
const pattern_1 = require("../pattern");
const string_1 = require("../string");
const emailRegex = '^([A-Za-z0-9._%+-]|"|”|“|\\\\| |“.*”){0,64}([A-Za-z0-9_%+-]|"|”|“|\\\\| |“.*”)@[A-Za-z0-9][A-Za-z0-9.-]*\\.[A-Za-z]{2,}$';
function isValidEmail(email) {
    if (!string_1.isNonEmptyString(email)) {
        return false;
    }
    return pattern_1.patternValidation(email, emailRegex) &&
        !pattern_1.patternValidation(email, '^[\\s\\.]+.*$') &&
        !pattern_1.patternValidation(email, '^.*\\.\\..*$');
}
exports.isValidEmail = isValidEmail;
//# sourceMappingURL=index.js.map