module.exports = (sequelize, DataTypes) => {
  const User_Course = sequelize.define(
    'User_Course',
    {},
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  User_Course.associate = function (models) {
    // associations can be defined here
    User_Course.belongsTo(models.User);
    User_Course.belongsTo(models.Course);
  };
  return User_Course;
};
