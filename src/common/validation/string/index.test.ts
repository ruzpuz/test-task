import { isString, isNonEmptyString } from './index';
import assert from 'assert';
import mocha from "mocha";

const strings = {
  invalid: [ null, undefined, NaN, 1.2, 13 ],
  valid: [ '', '123', 'test string' ],
  validEmpty: ''
};


function validStrings() :void {
  strings.valid.forEach(item => assert(isString(item)));
}
function invalidStrings() :void {
  strings.invalid.forEach(item =>  {
    assert(!isString(item))
  });
}
function validEmpty() :void {
  assert(isString(strings.validEmpty));
}
function nonEmptyMaxLength(): void {
  assert(!isNonEmptyString('', 128))
  assert(!isNonEmptyString('aaaaaa', 2))
}
export default () :mocha.Suite  => describe('Testing services for validation of strings', () :void => {

  it('Valid strings', validStrings);
  it('Invalid strings', invalidStrings);
  it('Empty string', validEmpty);
  it('Max length', nonEmptyMaxLength);

});
