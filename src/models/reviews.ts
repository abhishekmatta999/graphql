import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db";
// const sequelize = new Sequelize("sqlite::memory:");

export default class Reviews extends Model {}
Reviews.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        movieId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    { sequelize, modelName: "reviews" }
);