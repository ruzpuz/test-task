"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValid = void 0;
const email_1 = require("common/validation/email");
const string_1 = require("common/validation/string");
function isValid({ email, firstName, lastName, password }) {
    return (email_1.isValidEmail(email) &&
        string_1.isNonEmptyString(lastName) &&
        string_1.isNonEmptyString(firstName) &&
        string_1.isNonEmptyString(password));
}
exports.isValid = isValid;
//# sourceMappingURL=signup.controller.js.map