exports.seed = function(knex) {
  const sql = `
   INSERT INTO
      "public"."role"(name) 
    VALUES ('administrator'), ('user');
  `;

  return knex.raw(sql);
};
