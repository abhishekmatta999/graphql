import { Sequelize } from "sequelize";

// const sequelize = new Sequelize("postgres://postgres:hrhk@localhost:5432/movies");

const sequelize = new Sequelize('movies', 'postgres', 'hrhk', {
    host: 'localhost',
    dialect: 'postgres'
  });

const connect = () => {
    try {
        sequelize.authenticate().then(() => {
            console.log("Postgres connection has been established successfully.");
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

export { sequelize, connect };