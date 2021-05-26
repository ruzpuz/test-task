"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUUID = exports.isUUID = void 0;
const uuid_1 = require("uuid");
const pattern_1 = require("../pattern");
const string_1 = require("../string");
const UUIDPattern = '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$';
function isUUID(string) {
    return (string_1.isNonEmptyString(string) && pattern_1.patternValidation(string, UUIDPattern));
}
exports.isUUID = isUUID;
function generateUUID() {
    return uuid_1.v4();
}
exports.generateUUID = generateUUID;
//# sourceMappingURL=index.js.map