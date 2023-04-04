import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db";
import Movies from "./movies";
import Users from "./users";

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
            allowNull: false,
            references: {
              model: Movies,
              key: "id",
            },
        },

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: Users,
              key: "id",
            },
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
                min: 1,
                max: 5
            }
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [8, 100]
            }
        },
    },
    { sequelize, modelName: "reviews" }
);

// Associate the Reviews model with the Users model
Reviews.belongsTo(Users, { foreignKey: "userId" });

// Associate the Reviews model with the Movies model
Reviews.belongsTo(Movies, { foreignKey: "movieId" });