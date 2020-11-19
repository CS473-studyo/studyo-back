"use strict";
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define(
    "Answer",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      question: DataTypes.STRING,
      user: DataTypes.STRING,
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
  Answer.associate = function (models) {
    // associations can be defined here
  };
  return Answer;
};
