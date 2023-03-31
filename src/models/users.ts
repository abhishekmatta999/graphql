import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db";
// const sequelize = new Sequelize("sqlite::memory:");

export default class Users extends Model {}
Users.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    { sequelize, modelName: "users" }
);