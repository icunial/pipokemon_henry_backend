const { DataTypes } = require("sequelize");
const db = require("../db");

const Type = db.define(
  "type",
  {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);
