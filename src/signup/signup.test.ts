import assert from 'assert';
import { isValid } from './signup.controller';
import { Body } from './signup.dto';
import mocha from 'mocha';

const validBody: Body = {
  email: 's@sas.com',
  firstName: 'a',
  lastName: 'a',
  password: 'a'
};
const invalidBodies = [ {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
}, {
  firstName: 'a',
  email: 'a@aa.com',
  password: 'a'
}, {
  lastName: 'a',
  email: 'a@aa.com',
  password: 'a'
}, {
  firstName: 'a',
  lastName: 'a',
  password: 'a'
}, {
  firstName: '1',
  lastName: '2',
  email: 'a@aa.com'
}, {
  firstName: 'vdizeuquskpdtykfnpqicmsaexxavhxwajuakumikfaurgdbfbfxkcnskyjgamaanedoiboxnkubstgvkzomedicchmktyhvuobzjjgptwtkuvtcpebnzdazebrullbmi',
  lastName: 'a',
  email: 'a@aa.com',
  password: 'a'
}, {
  firstName: 'a',
  lastName: 'vdizeuquskpdtykfnpqicmsaexxavhxwajuakumikfaurgdbfbfxkcnskyjgamaanedoiboxnkubstgvkzomedicchmktyhvuobzjjgptwtkuvtcpebnzdazebrullbmi',
  email: 'a@aa.com',
  password: 'a'
}, {
  firstName: 'a',
  lastName: 'a',
  email: 'dsacom',
  password: 'a'
}, { } ];

function testValidBody() {
  assert(isValid(validBody));
}

function testInvalidBodies() {
  invalidBodies.forEach(function (item) {
    assert(!isValid(<Body> item));
  });
}

export default () : mocha.Suite => describe('Testing registration service', function() {
  it('Signup service validation - valid call', testValidBody);
  it('Signup service validation - invalid call', testInvalidBodies);

});