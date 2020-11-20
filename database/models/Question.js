"use strict";
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define(
    "Question",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: DataTypes.STRING,
      detail: DataTypes.STRING,
      userId: DataTypes.STRING,
      lecture: DataTypes.INTEGER,
    },
    {
      freezeTableName: true,
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: false
    }
  );
  Question.associate = function (models) {
    // associations can be defined here
    Question.belongsToMany(models.User, { through: 'User_Question' });
  };
  return Question;
};
