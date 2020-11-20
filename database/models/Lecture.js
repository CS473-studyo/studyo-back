'use strict';
module.exports = (sequelize, DataTypes) => {
  const Lecture = sequelize.define(
    'Lecture',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      course: DataTypes.STRING,
      num: DataTypes.INTEGER,
      date: DataTypes.STRING,
      keyword: DataTypes.STRING,
    },
    {
      freezeTableName: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: false,
    }
  );
  Lecture.associate = function (models) {
    // associations can be defined here
    Lecture.belongsTo(models.Course);
  };
  return Lecture;
};
