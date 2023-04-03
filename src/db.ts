import { Sequelize } from "sequelize";

const sequelize = new Sequelize('movies', 'postgres', 'hrhk', {
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