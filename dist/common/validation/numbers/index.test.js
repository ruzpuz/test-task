"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const assert_1 = __importDefault(require("assert"));
const integers = {
    valid: [0, 1, -1, 999999, '-1', '1'],
    invalid: [1.2, 'dasfa', '', '1.2', null, undefined, NaN],
    validPositive: [1, 999999, '1'],
    validPositiveOrZero: [1, 999999, '1', 0],
    validNegative: [-1, -9999999, '-2']
};
const floats = {
    valid: [0, 1, -1, 999999, '-1', '1', 1.2, -0.1, '9.1'],
    invalid: ['dasfa', '', null, undefined, NaN]
};
function validIntegers() {
    integers.valid.forEach(item => assert_1.default(index_1.isInteger(item)));
}
function validPositiveOrZeroIntegers() {
    integers.validPositiveOrZero.forEach(item => assert_1.default(index_1.isPositiveOrZeroInteger(item)));
}
function invalidIntegers() {
    integers.invalid.forEach(item => assert_1.default(!index_1.isInteger(item)));
}
function validPositiveIntegers() {
    integers.validPositive.forEach(item => assert_1.default(index_1.isPositiveInteger(item)));
}
function invalidPositiveIntegers() {
    integers.invalid.forEach(item => assert_1.default(!index_1.isInteger(item)));
    integers.invalid.concat(integers.validNegative).forEach(item => assert_1.default(!index_1.isPositiveInteger(item)));
}
function validFloat() {
    floats.valid.forEach(item => assert_1.default(index_1.isFloat(item)));
}
function invalidFloats() {
    floats.invalid.forEach(item => assert_1.default(!index_1.isFloat(item)));
}
exports.default = () => describe('Testing services for validation of numbers', () => {
    it('Valid integers', validIntegers);
    it('Valid positive or zero integers', validPositiveOrZeroIntegers);
    it('Invalid integers', invalidIntegers);
    it('Valid positive integers', validPositiveIntegers);
    it('Invalid positive integers', invalidPositiveIntegers);
    it('Valid float', validFloat);
    it('Invalid float', invalidFloats);
});
//# sourceMappingURL=index.test.js.map