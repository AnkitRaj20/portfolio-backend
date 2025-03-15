import { DataTypes } from "sequelize";
import sequelize from "../config/database.config.js";

export const StartFields = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
};

export const EndFields = {
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  updatedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
};