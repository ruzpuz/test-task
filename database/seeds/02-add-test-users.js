const keccak = require('keccak');

exports.seed = async function(knex) {
  const sql =  `
      WITH inserted_user AS (
        INSERT INTO
          "public"."user" (email, first_name, last_name)
        VALUES
          (?, ?, ?)
        RETURNING id
      ),
      inserted_security AS (
        INSERT INTO 
          "public"."security" (user_id, security, confirmation_token, confirmed, disabled)
        SELECT id, ?, ?, ?, ? FROM inserted_user
      )
     INSERT INTO
      "public"."users_roles" (user_id, role_id)
      SELECT (SELECT id FROM inserted_user), (SELECT id FROM "public"."role" WHERE name = 'user');`;


  await knex.raw(sql, [
    'test4@test.com',
    'Test 4',
    'Test 4',
    keccak('keccak512').update('password').digest('hex'),
    keccak('keccak512').update(`User registered at ${(new Date()).toISOString()}. Random ${Math.random()}`).digest('hex'),
    true,
    true
  ]);
  return knex.raw(sql, [
    'test5@test.com',
    'Test 5',
    'Test 5',
    keccak('keccak512').update('password').digest('hex'),
    keccak('keccak512').update(`User registered at ${(new Date()).toISOString()}. Random ${Math.random()}`).digest('hex'),
    false,
    false
  ]);
};
