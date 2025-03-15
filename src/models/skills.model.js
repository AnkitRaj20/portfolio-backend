import { DataTypes } from "sequelize";
import sequelize from "../config/database.config.js";

const Skills = sequelize.define(
  "Skills",
  {
    skillName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "skills",
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);

export default Skills;
