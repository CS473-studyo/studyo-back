module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    'Course',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      professor: DataTypes.STRING,
      code: DataTypes.STRING,
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  Course.associate = function (models) {
    // associations can be defined here
    Course.belongsToMany(models.User, {
      through: 'User_Course',
      timestamps: false,
    });
    Course.hasMany(models.Lecture);
  };
  return Course;
};
