
exports.up = function(knex) {
  const sql = `
      CREATE TABLE
      "public"."like" (
        "who" UUID NOT NULL DEFAULT uuid_generate_v4(),
        "whom" UUID NOT NULL DEFAULT uuid_generate_v4(),
        PRIMARY KEY ("who", "whom"),
        CONSTRAINT "l_who_fk" FOREIGN KEY ("who") REFERENCES "public"."user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT "l_whom_fk" FOREIGN KEY ("whom") REFERENCES "public"."user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION

      );
  `
  return knex.raw(sql);
};

exports.down = function(knex) {
  const sql = `
    DROP TABLE IF EXISTS "public"."like" CASCADE;`;

  return knex.raw(sql);
};
