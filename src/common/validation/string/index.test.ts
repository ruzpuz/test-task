import { isString, isNonEmptyString } from './index';
import assert from 'assert';

const strings = {
  invalid: [ null, undefined, NaN, 1.2, 13 ],
  valid: [ '', '123', 'test string' ],
  validEmpty: ''
};


function validStrings() :void {
  strings.valid.forEach(item => assert(isString(item)));
}
function invalidStrings() :void {
  strings.invalid.forEach(item => assert(!isString(item)));
}
function validEmpty() :void {
  assert(isString(strings.validEmpty));
  assert(!isNonEmptyString(strings.validEmpty));
}

export default () => describe('Testing services for validation of strings', () :void => {

  it('Valid strings', validStrings);
  it('Invalid strings', invalidStrings);
  it('Empty string', validEmpty);

});