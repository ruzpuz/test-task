import dotenv from 'dotenv';
dotenv.config();

void Promise.all([
  import('common/validation/email/index.test'),
  import('common/validation/numbers/index.test'),
  import('common/validation/string/index.test'),
  import('common/validation/uuid/index.test'),
  import('security/security.test'),
  import('signup/signup.test')
]).then(
  (tests) =>
    tests.forEach(({ default: test }) => test())
);