"use strict";
module.exports = (sequelize, DataTypes) => {
  const Keyword = sequelize.define(
    "Keyword",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user: DataTypes.STRING,
      course: DataTypes.STRING,
      lecture: DataTypes.STRING,
      content: DataTypes.STRING,
      salt: DataTypes.STRING,
    },
    {
      freezeTableName: true,
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: false
    }
  );
  Keyword.associate = function (models) {
    // associations can be defined here
    Keyword.belongsToMany(models.User, { through: 'User_Keyword' })
  };
  return Keyword;
};
