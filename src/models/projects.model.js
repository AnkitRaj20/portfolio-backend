import { DataTypes } from "sequelize";
import sequelize from "../config/database.config.js";

const Projects = sequelize.define(
  "Projects",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    githubLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    liveLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stackType: {
      type: DataTypes.ENUM("frontend", "backend", "fullstack"),
      allowNull: true,
    },
    techUsed: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },
    features: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },
  },
  {
    tableName: "projects",
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);

export default Projects;
