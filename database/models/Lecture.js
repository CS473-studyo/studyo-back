"use strict";
module.exports = (sequelize, DataTypes) => {
  const Lecture = sequelize.define(
    "Lecture",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      course: DataTypes.STRING,
      number: DataTypes.STRING,
      salt: DataTypes.STRING,
    },
    {
      freezeTableName: true,
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: false
    }
  );
  Lecture.associate = function (models) {
    // associations can be defined here
  };
  return Lecture;
};
