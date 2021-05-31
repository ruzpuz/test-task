exports.up = function(knex) {
  const sql = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
                        
    CREATE TABLE
      "public"."role" (
        "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
        "name" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
        PRIMARY KEY ("id")
      );
            
    CREATE TABLE
      "public"."user" (
        "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
        "email" varchar(128) COLLATE "pg_catalog"."default" NOT NULL,
        "first_name" varchar(128) COLLATE "pg_catalog"."default",
        "last_name" varchar(128) COLLATE "pg_catalog"."default",
        "created_at" timestamp DEFAULT now(), 
        "updated_at" timestamp DEFAULT now(),
        "deleted_at" timestamp, 
        PRIMARY KEY("id"),
        CONSTRAINT "user_email" UNIQUE ("email")
      );
        
    CREATE UNIQUE INDEX
      "user.email"
    ON
      "public"."user"
    USING btree (
      "email"
    );
    CREATE TABLE
      "public"."users_roles" (
        "user_id" UUID NOT NULL,
        "role_id" UUID NOT NULL,
        PRIMARY KEY ("user_id", "role_id"),
        CONSTRAINT "ur_role_fk" FOREIGN KEY ("role_id") REFERENCES "public"."role" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT "ur_user_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
      );
    `;
  return knex.raw(sql);
};

exports.down = function(knex) {
  const sql = `
    DROP TABLE IF EXISTS "public"."users_roles" CASCADE; 
    DROP TABLE IF EXISTS "public"."role" CASCADE; 
    DROP TABLE IF EXISTS "public"."user" CASCADE;`;

  return knex.raw(sql);
};