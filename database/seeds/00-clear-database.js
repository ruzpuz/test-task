exports.seed = function(knex) {
  const sql = `
   do
     $$
      declare
        l_stmt text;
      begin 
        select 'truncate ' || string_agg(format('%I.%I', schemaname, tablename), ',')
        into l_stmt 
        from pg_tables
        where schemaname in ('public') and 
        tablename not in ('knex_migrations', 'knex_migrations_lock');
        execute l_stmt;
      end;
      $$
  `;

  return knex.raw(sql);
};
