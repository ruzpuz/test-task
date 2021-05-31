import { isValidEmail } from './index';
import assert from 'assert';
import mocha from 'mocha';

const emails = {
  valid: [
    's@sas.com',
    'email@example.com',
    'firstname.lastname@example.com',
    'email@subdomain.example.com',
    'firstname+lastname@example.com',
    '“email”@example.com',
    '1234567890@example.com',
    'email@example-one.com',
    '_______@example.com',
    'email@example.name',
    'email@example.museum',
    'email@example.co.jp',
    'firstname-lastname@example.com'
  ],
  strange: [
    'much.“more\\ unusual”@example.com',
    'very.unusual.“@”.unusual.com@example.com',
    'very.“(),:;<>[]”.VERY.“very@\\ "very”.unusual@strange.example.com'
  ],
  invalid: [
    'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@ssssss.com',
    'plainaddress',
    '#@%^%#$@#$@#.com',
    '@example.com',
    'Joe Smith <email@example.com>',
    'email.example.com',
    'email@example@example.com',
    '    .email@example.com',
    '.email@example.com',
    'email.@example.com',
    'email..email@example.com',
    'あいうえお@example.com',
    'email@example.com (Joe Smith)',
    'email@example',
    'email@-example.com',
    'email@111.222.333.44444',
    'email@example..com',
    'Abc..123@example.com',
    1.2, 'dasfa', '', '1.2', null, undefined, NaN
  ]
};

function validEmails() :void {
  emails.valid.forEach(item => assert(isValidEmail(item)) );
}

function validStrangeEmails() :void {
  emails.strange.forEach(item => assert(isValidEmail(item)));
}

function invalidEmails() :void {
  emails.invalid.forEach(item => assert(!isValidEmail(item)));
}

export default () : mocha.Suite => describe('Testing services for validation of emails', () :void => {
  it('Valid emails', validEmails);
  it('Valid but strange emails', validStrangeEmails);
  it('Invalid emails', invalidEmails);
});
