import { DataTypes } from "sequelize";
import sequelize from "../config/database.config.js";
import { EndFields, StartFields } from "../constant/constant.js";

const About = sequelize.define(
  "About",
  {
    ...StartFields,
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    userId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: "Users",
      //   key: "id",
      // },
      // onUpdate: "CASCADE",
      // onDelete: "CASCADE",
    },
    ...EndFields
  },
  {
    tableName: "about",
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);

// console.log(await About.sync({ alter: true }));

export default About;
