import { Sequelize } from "sequelize";
import * as dotenv from 'dotenv';
import path from 'path';

// env path
const envPath = path.resolve(__dirname, '..', '.env');

// initialise dotenv
dotenv.config({ path: envPath });

const sequelize = new Sequelize(process.env.DB_NAME as string, process.env.USER_NAME as string, process.env.DB_PASSWORD as string, {
    host: 'localhost',
    dialect: 'postgres'
});

const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log("Postgres connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

export { sequelize, connect };