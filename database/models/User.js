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
    },
    {
      freezeTableName: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: false,
    }
  );
  User.associate = function (models) {
    // associations can be defined here
    User.belongsToMany(models.Course, { through: 'User_Course' });
    User.belongsToMany(models.Question, { through: 'User_Question' });
    User.belongsToMany(models.Keyword, { through: 'User_Keyword' });
    User.belongsToMany(models.Answer, { through: 'User_Answer'});
  };
  return User;
};
