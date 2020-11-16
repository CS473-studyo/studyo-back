"use strict";
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    "Course",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      prof: DataTypes.STRING,
      code: DataTypes.STRING,
    },
    {
      freezeTableName: true,
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: false
    }
  );
  Course.associate = function (models) {
    // associations can be defined here
    Course.belongsToMany(models.User, { through: 'User_Course' });
    models.Course.hasMany(models.Lecture);
  };
  return Course;
};
