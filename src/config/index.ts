import * as dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/../../.env.' + (process.env.NODE_ENV || 'local') });

export default {
  PORT: process.env.PORT || 8080,
  DEBUG: process.env.NODE_ENV !== 'production',
  prefixPath: {
    api: process.env.API_PREFIX || '/api/v2',
    admin: process.env.ADMIN_PREFIX || '/admin',
  },
  database: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    read_host: process.env.READ_DB_HOST,
    write_host: process.env.WRITE_DB_HOST,
    operatorsAliases: false,
    dialect: 'postgres',
    mongo_host: process.env.MONGO_HOST,
    redis_host: process.env.REDIS_HOST,
    redis_password: process.env.REDIS_PASSWORD,
  },
  JWT_SECRET: process.env.JWT_SECRET ?? 'hello jwt',
};
