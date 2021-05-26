import { isFloat, isInteger, isPositiveInteger, isPositiveOrZeroInteger } from './index';
import assert from 'assert';
import mocha from "mocha";
const integers = {
  valid: [ 0, 1, -1, 999999, '-1', '1' ],
  invalid: [ 1.2, 'dasfa', '', '1.2', null, undefined, NaN ],
  validPositive: [ 1, 999999, '1' ],
  validPositiveOrZero: [ 1, 999999, '1', 0 ],
  validNegative: [ -1, -9999999, '-2' ]
};
const floats = {
  valid: [ 0, 1, -1, 999999, '-1', '1', 1.2, -0.1, '9.1' ],
  invalid: [ 'dasfa', '', null, undefined, NaN ]
};

function validIntegers () :void {
  integers.valid.forEach(item => assert(isInteger(item)) );
}
function validPositiveOrZeroIntegers () :void {
  integers.validPositiveOrZero.forEach(item => assert(isPositiveOrZeroInteger(item)));
}

function invalidIntegers() :void {
  integers.invalid.forEach(item => assert(!isInteger(item)));
}

function validPositiveIntegers() :void {
  integers.validPositive.forEach(item => assert(isPositiveInteger(item)));
}

function invalidPositiveIntegers() :void {
  integers.invalid.forEach(item => assert(!isInteger(item)));
  integers.invalid.concat(integers.validNegative).forEach(item => assert(!isPositiveInteger(item)));
}

function validFloat() :void {
  floats.valid.forEach(item => assert(isFloat(item)));
}

function invalidFloats() :void {
  floats.invalid.forEach(item => assert(!isFloat(item)));
}

export default () :mocha.Suite  => describe('Testing services for validation of numbers', () :void => {
  it('Valid integers', validIntegers);
  it('Valid positive or zero integers', validPositiveOrZeroIntegers);
  it('Invalid integers', invalidIntegers);
  it('Valid positive integers', validPositiveIntegers);
  it('Invalid positive integers', invalidPositiveIntegers);
  it('Valid float', validFloat);
  it('Invalid float', invalidFloats);
});
