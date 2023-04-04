import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db";
import Users from "./users";

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
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 50]
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false,
                len: [8, 100]
            }
        },
        director: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 100]
            }
        },
        releaseDate: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true,
            },
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: Users,
              key: "id",
            },
        }
    },
    { sequelize, modelName: "movies" }
);

// Associate the Movies model with the Users model
Movies.belongsTo(Users, { foreignKey: "userId" });