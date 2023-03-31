import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db";
// const sequelize = new Sequelize("sqlite::memory:");

export default class Movies extends Model {}
Movies.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        director: {
            type: DataTypes.STRING,
            allowNull: false
        },
        releaseDate: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    { sequelize, modelName: "movies" }
);