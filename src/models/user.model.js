import { DataTypes } from "sequelize";
import { EndFields, StartFields } from "../constant/constant.js";
import sequelize from "../config/database.config.js";

const Users = sequelize.define(
  "Users",
  {
    ...StartFields,
    name: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    mobile: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    profilePicture: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    ...EndFields,
  },
  {
    tableName: "users",
    timestamps: true,
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
    paranoid: true,
    underscored: true,
  }
);

console.log(await Users.sync({ alter: true }));

export default Users;
