import knex, { Knex } from 'knex';
export class Database {
    private static instance: Knex;
    public static get(): Knex {
        if(!this.instance) {
            this.instance = knex({
                client: 'pg',
                connection: {
                    host : process.env.DB_HOST,
                    port : <number> <unknown> process.env.DB_PORT,
                    user : process.env.DB_USER,
                    password : process.env.DB_PASSWORD,
                    database : 'postgres',
                    charset : "utf8"
                },
                pool: {
                    min: 0
                },
                migrations: {
                    directory: './database/migrations'
                },
                seeds: {
                    directory: './database/seeds'
                }
            });
        }
        return this.instance;
    }
}
export enum DatabaseErrors {
    FOREIGN_KEY_VIOLATION = '23503',
    DUPLICATE_KEY = '23505',
    NOT_FOUND = -1,
}