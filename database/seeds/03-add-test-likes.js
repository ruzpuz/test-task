const keccak = require('keccak');

exports.seed = async function(knex) {
  const fetchUsersSQL = `
    SELECT id FROM "public"."user";
  `;
  const likeSQL = `
    INSERT INTO
      "public"."like" (who, whom)
    VALUES (?, ?) ;
  `;

  return knex.transaction(async (t) => {
    const { rows: rawResult } = await t.raw(fetchUsersSQL);
    const ids = rawResult.map(result => result.id)
    for(let i = 0; i < ids.length; i += 1) {
      for(let j = i+1; j < ids.length; j+= 1) {
        await t.raw(likeSQL, [ ids[i], ids[j]])
      }
    }
    console.log(ids)
  })
};
