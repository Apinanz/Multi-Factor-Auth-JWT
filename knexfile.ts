import * as DotEnv from "dotenv";

DotEnv.config();

const knexConfig = module.exports = {
    client: process.env.DATABASE__DRIVER,
    migration: {
        extension: "ts"
    },
    connection: {
        host: process.env.DATABASE__HOST,
        database: process.env.DATABASE__DATABASE,
        port: process.env.DATABASE__PORT,
        user: process.env.DATABASE__USER,
        password: process.env.DATABASE__PASSWORD
    },
    migrations: {
        directory: "./migrations/"
    },
};

export default knexConfig;