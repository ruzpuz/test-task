"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const assert_1 = __importDefault(require("assert"));
const emails = {
    valid: [
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
function validEmails() {
    emails.valid.forEach(item => assert_1.default(index_1.isValidEmail(item)));
}
function validStrangeEmails() {
    emails.strange.forEach(item => assert_1.default(index_1.isValidEmail(item)));
}
function invalidEmails() {
    emails.invalid.forEach(item => assert_1.default(!index_1.isValidEmail(item)));
}
exports.default = () => describe('Testing services for validation of emails', () => {
    it('Valid emails', validEmails);
    it('Valid but strange emails', validStrangeEmails);
    it('Invalid emails', invalidEmails);
});
//# sourceMappingURL=index.test.js.map