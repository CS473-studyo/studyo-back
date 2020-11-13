"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      salt: DataTypes.STRING,
    },
    {
      freezeTableName: true,
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: false
    }
  );
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
