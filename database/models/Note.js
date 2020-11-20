"use strict";
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define(
    "Note",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      course: DataTypes.STRING,
      lecture: DataTypes.STRING,
      page: DataTypes.STRING,
      author: DataTypes.STRING,
      content: DataTypes.STRING,
      clap: DataTypes.INTEGER,
      salt: DataTypes.STRING,
    },
    {
      freezeTableName: true,
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: false
    }
  );
  Note.associate = function (models) {
    // associations can be defined here
  };
  return Note;
};
