module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      salt: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      freezeTableName: true,
      timestamps: false,
      defaultScope: {
        attributes: { exclude: ['email', 'password', 'salt'] },
      },
    }
  );
  User.associate = function (models) {
    // associations can be defined here
    User.belongsToMany(models.Course, {
      through: 'User_Course',
      timestamps: false,
    });
    User.belongsToMany(models.Keyword, {
      through: 'User_Keyword',
      timestamps: false,
    });
    User.hasMany(models.Answer);
    User.hasMany(models.Keyword);
    User.hasMany(models.Note);
    User.hasMany(models.Question);
  };
  return User;
};
