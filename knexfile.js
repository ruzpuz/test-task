import dotenv from 'dotenv';
dotenv.config();

const configuration = {
  client: 'pg',
  connection: {
    host : process.env.DB_HOST,
    port : process.env.DB_PORT,
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
}


export default {
  development: configuration,
  testing: configuration,
  staging: configuration,
  production: configuration,
};