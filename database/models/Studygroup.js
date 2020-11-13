"use strict";
module.exports = (sequelize, DataTypes) => {
  const Studygroup = sequelize.define(
    "Studygroup",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      course: DataTypes.STRING,
      creator: DataTypes.STRING,
      salt: DataTypes.STRING,
    },
    {
      freezeTableName: true,
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: false
    }
  );
  Studygroup.associate = function (models) {
    // associations can be defined here
  };
  return Studygroup;
};
