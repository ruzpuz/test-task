"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const assert_1 = __importDefault(require("assert"));
const strings = {
    invalid: [null, undefined, NaN, 1.2, 13],
    valid: ['', '123', 'test string'],
    validEmpty: ''
};
function validStrings() {
    strings.valid.forEach(item => assert_1.default(index_1.isString(item)));
}
function invalidStrings() {
    strings.invalid.forEach(item => assert_1.default(!index_1.isString(item)));
}
function validEmpty() {
    assert_1.default(index_1.isString(strings.validEmpty));
    assert_1.default(!index_1.isNonEmptyString(strings.validEmpty));
}
exports.default = () => describe('Testing services for validation of strings', () => {
    it('Valid strings', validStrings);
    it('Invalid strings', invalidStrings);
    it('Empty string', validEmpty);
});
//# sourceMappingURL=index.test.js.map